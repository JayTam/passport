import {
  captchaValidateRulesCurrying,
  registerValidatorGenerator,
  validatorGenerator
} from "@/utils";
import { CAPTCHA_REG, EMAIL_REG, PASSWORD_REG, PHONE_REG_LIKE } from "@/utils";
import { useI18n } from "vue-i18n";
export function useValidate() {
  const { t } = useI18n();

  const requiredRule = { required: true, message: t("UseValidate.required") };
  return {
    // 规则生成器
    captchaRulesGenerator: captchaValidateRulesCurrying(
      t("UseValidate.wrongVerificationCode"),
      [
        requiredRule,
        { pattern: CAPTCHA_REG, message: t("UseValidate.mustBe6Numbers") }
      ]
    ),
    // 以下是直接可用的规则
    accountRules: [requiredRule],
    passwordRules: [
      requiredRule,
      { min: 8, max: 16, message: t("UseValidate.mustBeBetween8And16") },
      { pattern: PASSWORD_REG, message: t("UseValidate.twoTypes") }
    ],
    phoneRules: [
      requiredRule,
      {
        validator: validatorGenerator(
          PHONE_REG_LIKE,
          t("UseValidate.invalidPhone")
        )
      }
    ],
    // 手机号注册
    phoneSignUpRules: [
      requiredRule,
      {
        validator: validatorGenerator(
          PHONE_REG_LIKE,
          t("UseValidate.invalidPhone")
        )
      },
      {
        validator: registerValidatorGenerator(
          t("UseValidate.phoneAlreadyRegistered"),
          true
        )
      }
    ],
    // 用手机号找回密码
    phoneFindRules: [
      requiredRule,
      {
        validator: validatorGenerator(
          PHONE_REG_LIKE,
          t("UseValidate.invalidPhone")
        )
      },
      {
        validator: registerValidatorGenerator(
          t("UseValidate.phoneUnregistered"),
          false
        )
      }
    ],
    emailRules: [
      requiredRule,
      { pattern: EMAIL_REG, message: t("UseValidate.invalidEmail") }
    ],
    emailSignUpRule: [
      requiredRule,
      { pattern: EMAIL_REG, message: t("UseValidate.invalidEmail") },
      {
        validator: registerValidatorGenerator(
          t("UseValidate.emailAreadyRegistered"),
          true
        )
      }
    ],
    emailFindRules: [
      requiredRule,
      { pattern: EMAIL_REG, message: t("UseValidate.invalidEmail") },
      {
        validator: registerValidatorGenerator(
          t("UseValidate.emailUnregistered"),
          false
        )
      }
    ]
  };
}
