import { subAppIdPersistence, passportTokenPersistence, redirectUriPersistence } from "@/utils";
import store from "../store/index";
import { authorizedLogin } from "@/apis/auth";
import QueryString from "query-string";

/**
 * 路由前置守卫
 */
export function registerBeforeRoute(router) {
  router.beforeEach(async (to, from, next) => {
    const isLogged = !!passportTokenPersistence.get();
    // 登陆或注册路由
    const isLoginSignUpRoute = ["/login", "/signup", "/forget", "/auth"].includes(
      to.matched?.[0]?.path
    );
    // 登陆路由
    const isLoginRoute = ["/login", "/auth"].includes(to.matched?.[0]?.path);
    // 白名单
    const isWhiteRoute = isLoginSignUpRoute || ["Privacy", "UserAgreement"].includes(to.name);
    const subAppId = subAppIdPersistence.get();
    // 本站的redirect_uri
    const redirectUri = redirectUriPersistence.get();

    /**
     * 在登陆和注册页面之间跳转，query参数不能丢失，不然无法实现登陆后跳回
     */
    if (isLoginSignUpRoute || ["Privacy", "UserAgreement"].includes(to.name)) {
      const newTo = { ...to };
      const query = { ...to.query, ...from.query };
      newTo.query = query;
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
          if (query[key] !== to.query[key]) {
            return next(newTo);
          }
        }
      }
    }

    /**
     * 根据token是否存在去判断用户是否登陆，
     * 同时会校验token是否合法，不合法清空token，重定向到登陆页，让用户重新登陆(这段处理逻辑在axios的响应拦截器中)
     */
    if (isLogged && !store.getters["user/hasGetUserInfo"]) {
      try {
        await store.dispatch("user/getUserInfo");
      } catch (e) {
        await store.commit("auth/REMOVE_AUTH");
        next({ name: "LoginHome", query: { ...from.query, ...to.query } });
        return;
      }
    }

    /**
     * 授权登陆
     */
    if (isLogged && subAppId && redirectUri && isLoginRoute) {
      let token;
      const deviceId = store.state.auth.deviceId;
      const appId = subAppId;
      const { data } = await authorizedLogin();
      token = data.token;
      const queryStringObj = QueryString.parseUrl(redirectUri);
      queryStringObj.query.token = token;
      queryStringObj.query.device_id = deviceId;
      queryStringObj.query.app_id = appId;
      queryStringObj.query = { ...queryStringObj.query, ...to.query };
      // 移除可能存在cookie中的redirect_uri
      redirectUriPersistence.remove();
      window.location.href = QueryString.stringifyUrl(queryStringObj);
      return;
    }

    /**
     * 登录了，跳转redirect_uri地址
     */
    if (isLogged && redirectUri) {
      redirectUriPersistence.remove();
      window.location.href = decodeURIComponent(redirectUri);
      return;
    }

    /**
     * 登录了，访问登陆注册页面，跳转首页
     */
    if (isLogged && isLoginSignUpRoute) {
      return next({
        name: "LoginSuccess",
      });
    }

    /**
     * 未登录，跳转需要登录页面
     * 重定向到登录页面
     */
    if (!isLogged && !isWhiteRoute) {
      return next({
        name: "LoginAccount",
        query: {
          ...to.query,
          ...from.query,
          redirect_uri: encodeURIComponent(window.location.href),
        },
      });
    }

    next();
  });
}
