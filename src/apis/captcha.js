import request from "./requests/passportRequest";

/**
 * 获取验证码
 * @param account 验证码发送目标帐户
 * @param {number} type 验证码类型
 * @param {number} purpose 验证码用途
 * @returns {AxiosPromise}
 */
export function getCaptcha(account, type, purpose) {
  return request({
    method: "POST",
    url: "/captcha",
    data: {
      account,
      type,
      purpose,
    },
  });
}

/**
 * 校验验证码的是否正确
 * @param {string} account 验证码发送目标帐户
 * @param {string} code 验证码
 * @param {number} type 验证码类型
 * @param {number} purpose 验证码用途
 * @returns {AxiosPromise}
 */
export function checkCaptcha(account, code, type, purpose) {
  return request({
    method: "GET",
    url: "/captcha",
    params: {
      account,
      code,
      type,
      purpose,
    },
  });
}
