import parsePhoneNumberFromString from "libphonenumber-js/mobile";

// 邮箱
export const EMAIL_REG = /^[a-z0-9A-Z]+[-|a-z0-9A-Z._]*@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/;
// 手机号码，类正则表达式
export const PHONE_REG_LIKE = {
  test(value) {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber) {
      return phoneNumber.isValid();
    }
    return false;
  },
};
// 密码
export const PASSWORD_REG = /^(?![0-9]+$)(?![_]+$)(?![a-zA-Z]+$)[A-Za-z_0-9]{8,16}$/;
// 用户名
export const NAME_REG = /^[\w]{4,20}$/;
// 昵称
export const NICKNAME_REG = /^[.]{4,20}$/;
// 验证码
export const CAPTCHA_REG = /^[0-9]{6}$/;
// 个性签名
export const SIGNATURE_REG = /^.{0,30}$/;
