import request from "./requests/passportRequest";
import { subAppIdPersistence } from "@/utils";
import { LOGIN_BEHAVIOR, LOGIN_THIRD_APP_ID_LIST } from "@/constants";
import store from "@/store";

/**
 * 账户登陆
 * @param {string} account 账户名
 * @param {string} password 密码
 * @returns {AxiosPromise}
 */
export function loginAccount(account, password) {
  return request({
    method: "POST",
    url: "/login",
    data: {
      account,
      password,
      behavior: LOGIN_BEHAVIOR.LOGIN,
    },
  });
}

/**
 * 手机号码登陆
 * @param {string} phone 手机号
 * @param {string} code 手机验证码
 * @returns {AxiosPromise}
 */
export function loginPhone(phone, code) {
  return request({
    method: "POST",
    url: "/login/phone",
    data: {
      phone,
      code,
    },
  });
}

export function loginThirdRequestToken(type) {
  return request({
    method: "GET",
    url: "/account/third/request_token",
    params: {
      type,
      app_id: LOGIN_THIRD_APP_ID_LIST[type],
      redirect_url: process.env.VUE_APP_THRID_LOGIN_REDIRECT_URL,
    },
  });
}

/**
 * 第三方登陆第一步，用于判断是否需要绑定手机号码，若不需要检验，可以不使用
 * @param code
 * @param type
 * @returns {AxiosPromise}
 */
export function loginThirdFirstStep(code, type) {
  return request({
    method: "POST",
    url: "/login/third1",
    data: {
      code,
      type,
      app_id: LOGIN_THIRD_APP_ID_LIST[type],
    },
  });
}

/**
 * 第三方登陆第二步，这个是实际的登陆
 * @param code
 * @param type
 * @param verifier
 * @returns {AxiosPromise}
 */
export function loginThirdSecondStep(code, type, verifier) {
  return request({
    method: "POST",
    url: "/login/third2",
    data: {
      code,
      type,
      verifier,
      app_id: LOGIN_THIRD_APP_ID_LIST[type],
      behavior: LOGIN_BEHAVIOR.LOGIN,
      redirect_url: process.env.VUE_APP_THRID_LOGIN_REDIRECT_URL,
    },
  });
}

/**
 * 绑定第三方登陆
 * @param code
 * @param type
 * @param verifier
 * @returns {AxiosPromise}
 */
export function bindThirdLogin(code, type, verifier) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/third`,
    data: {
      code,
      type,
      verifier,
    },
  });
}

/**
 * 解绑第三方登陆
 * @returns {AxiosPromise}
 */
export function unbindThirdLogin(type, openId) {
  return request({
    method: "DELETE",
    url: `/account/${store.state.user.uid}/third`,
    data: {
      open_id: openId,
      type,
    },
  });
}

/**
 * 邮箱注册
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @param {string} code 邮箱验证码
 * @returns {AxiosPromise}
 */
export function signUpEmail(email, password, code) {
  return request({
    method: "POST",
    url: "/login/registe",
    data: {
      account: {
        account: email,
        password,
        repeat_password: password,
        code,
        registe_type: 0,
      },
    },
  });
}

/**
 * 手机号注册
 * @param {string} phone 手机
 * @param {string} password 密码
 * @param {string} code 手机验证码
 * @returns {AxiosPromise}
 */
export function signUpPhone(phone, password, code) {
  return request({
    method: "POST",
    url: "/login/registe",
    data: {
      account: {
        account: phone,
        phone,
        password,
        repeat_password: password,
        code,
        registe_type: 1,
      },
    },
  });
}

/**
 * 用手机验证码重设密码
 * @param phone 手机号
 * @param password 新密码
 * @param code 验证码
 * @returns {AxiosPromise}
 */
export function resetPasswordPhone(phone, password, code) {
  return request({
    method: "PUT",
    url: "/account/forgetpassword",
    data: {
      account: phone,
      new_password: password,
      repeat_password: password,
      code,
    },
  });
}

/**
 * 用邮箱验证码重设密码
 * @param email 邮箱
 * @param password 新密码
 * @param code 验证码
 * @returns {AxiosPromise}
 */
export function resetPasswordEmail(email, password, code) {
  return request({
    method: "PUT",
    url: "/account/forgetpassword",
    data: {
      account: email,
      new_password: password,
      repeat_password: password,
      code,
    },
  });
}

/**
 * 检查账户是否已经注册
 * @param account 账户
 * @returns {AxiosPromise}
 */
export function hasRegistered(account) {
  return request({
    method: "GET",
    url: "/account/registe",
    params: {
      account,
    },
  });
}

/**
 * 授权登陆
 */
export function authorizedLogin(appId) {
  appId = appId ? appId : subAppIdPersistence.get();
  let headers = {};
  if (appId) {
    headers["paasport-sub-app-id"] = appId;
  }
  return request({
    method: "GET",
    url: "/auth/token/exchange",
    headers,
  });
}

/**
 * 登出
 */
export function logout() {
  return request({
    method: "DELETE",
    url: "/logout?not_revoke_subapp=false&not_revoke_exchangeapp=false",
  });
}

/**
 * 换绑邮箱
 */
export function changebindemail(email, code, old_code) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/changebindemail`,
    data: {
      email,
      code,
      old_code,
    },
  });
}

/**
 * 换绑手机号
 */
export function changebindphone(phone, code, old_code) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/changebindphone`,
    data: {
      phone,
      code,
      old_code,
    },
  });
}

/*
*更新密码
@param captcha 验证码为可选参数（旧手机验证码，6为数字）
*/
export function changepassword(old_password, new_password, repeat_password) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/password`,
    data: {
      old_password,
      new_password,
      repeat_password,
    },
  });
}
