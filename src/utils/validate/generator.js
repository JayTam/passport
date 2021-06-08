import { hasRegistered } from "@/apis/auth";
import { checkCaptcha } from "@/apis/captcha";

/**
 * validator 自定义校验规则生成器
 * @param  {RegExp | {test:Function}} reg
 * @param {string} message
 */
export function validatorGenerator(reg, message) {
  return (rule, value, callback) => {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(message));
    }
  };
}

/**
 * 生成可检查注册状态的的规则
 * @param {string} message 第一个是reg校验错误提示，第二个是已经注册错误提示
 * @param {boolean} registered true检查已注册, false检查未注册
 */
export function registerValidatorGenerator(message, registered = true) {
  return (rule, value, callback) => {
    hasRegistered(value)
      .then(({ data }) => {
        if (data.is_register === registered) {
          callback(new Error(message));
        } else {
          callback();
        }
      })
      .catch(() => {
        callback(new Error(message));
      });
  };
}

export function captchaValidatorGenerator(message, account, type, purpose) {
  return (rule, value, callback) => {
    checkCaptcha(account, value, type, purpose)
      .then(() => {
        callback();
      })
      .catch(() => {
        callback(new Error(message));
      });
  };
}

/**
 * 验证码校验规则柯里化
 * @param {Object[]} rules AsyncValidator 校验规则
 * @param message 验证码错误提示消息
 * @returns {function(*=, *=, *=): *[]}
 */
export function captchaValidateRulesCurrying(message, rules) {
  return (account, type, purpose) => {
    const validator = (rule, value, callback) => {
      checkCaptcha(account, value, type, purpose)
        .then(() => {
          callback();
        })
        .catch(() => {
          callback(new Error(message));
        });
    };
    return [...rules, { validator }];
  };
}
