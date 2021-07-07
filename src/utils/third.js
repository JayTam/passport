/**
 * 第三方登录相关工具函数
 */
import { LOGIN_THIRD_TYPE, LOGIN_THIRD_URL_LIST } from "@/constants";
import { loginThirdRequestToken } from "@/apis";
import QueryString from "query-string";
import {
  subAppIdPersistence,
  tenantNamePersistence,
  thirdBehaviorPersistence,
  thirdTypePersistence,
  redirectUriPersistence,
} from "@/utils/auth";
import { resolveTenantName } from "@/utils/tenant";

/**
 * 根据第三方登陆类型，获取第三方登陆地址
 * @param type 第三方登陆类型
 * @returns {Promise<string>}
 */
export async function getThirdUrlByType(type) {
  if (type === LOGIN_THIRD_TYPE.TWITTER) {
    const { data } = await loginThirdRequestToken(LOGIN_THIRD_TYPE.TWITTER);
    const urlObj = QueryString.parseUrl(LOGIN_THIRD_URL_LIST[type]);
    urlObj.query.oauth_token = data.oauth_token;
    return QueryString.stringifyUrl(urlObj);
  } else {
    return LOGIN_THIRD_URL_LIST[type];
  }
}

/**
 * 跳转到第三方登陆，跳转之前将需要的参数存储到cookie，回跳之后再获取出来
 * @param {number} type 第三方登陆类型
 * @param {number} behavior 第三方登陆行为
 * @returns {Promise<void>}
 */
export async function redirectToThird(type, behavior) {
  const tenementName = resolveTenantName();
  tenantNamePersistence.set(tenementName);
  thirdTypePersistence.set(type);
  thirdBehaviorPersistence.set(behavior);
  // 授权登陆所需参数，将从url query取到的参数存储到cookie
  redirectUriPersistence.set(encodeURIComponent(window.location.href));
  subAppIdPersistence.set(subAppIdPersistence.get());
  window.open(await getThirdUrlByType(type));
}

/**
 * 解析第三方登陆参数
 * @returns {{code: string , verifier: string , type: string}}
 */
export function parseThirdParameters() {
  // 第三方登陆类型
  const type = thirdTypePersistence.get();
  // 第三方登陆code
  let code;
  // 仅 twitter 使用的
  let verifier;
  // 当前路由对象，非vue-router的route
  const route = QueryString.parseUrl(window.location.href);
  if (type === LOGIN_THIRD_TYPE.TWITTER) {
    code = route.query.oauth_token;
    verifier = route.query.oauth_verifier;
  } else {
    code = route.query.code;
  }
  return {
    type,
    code,
    verifier,
  };
}

/**
 * 第三方登陆，由于callback不能携带参数，第三方登陆前后状态不能保持一致
 * 由于租户名不确定，所以callback域名固定是：auth.mms.tevo.online
 * 解决方案：
 * 1. 跳转前，将状态信息（例如租户名，第三方登陆类型，第三方登陆行为，第三方登陆成功跳转地址，语言）存储到cookie中
 * 2. 第三方平台回跳到https://auth.mms.tevo.online，从cookie中取出租户名，然后重定向到登陆前的租户域名
 * 3. 从cookie中取出其他状态信息，调用第三方登录接口获取token，完成登陆
 * 4. 如果是授权登陆，走授权登陆交换token流程，完成后根据redirect_uri重定向
 * 5. 不是授权登陆，直接重定向到首页
 */
export function redirectToTenantUrl() {
  const tenantNameFromUrl = resolveTenantName();
  const tenantNameFromCookie =
    tenantNamePersistence.get() ?? process.env.VUE_APP_DEFAULT_TENANT_NAME;
  if (tenantNameFromUrl === "auth") {
    const url = window.location.href;
    window.location.href = url.replace("auth", tenantNameFromCookie);
  }
}
