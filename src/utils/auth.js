import QueryString from "query-string";
import Cookies from "js-cookie";
import { isDef, isNumeric } from "@/utils";

const PAN_DOMAIN =
  process.env.NODE_ENV === "production" ? process.env.VUE_APP_PAN_DOMAIN : undefined;

class Persistence {
  constructor(key, domain) {
    this.key = key;
    this.domain = domain;
    this.sameSite = "None";
  }

  get() {
    try {
      const { query } = QueryString.parseUrl(window.location.href);
      const value = query[this.key] ?? Cookies.get(this.key, { domain: this.domain });
      // 如果可以转换成数字，且小于最大安全值，则转换成Number类型，否则使用String类型
      if (isNumeric(value) && Number.MAX_SAFE_INTEGER > Number(value)) {
        return Number(value);
      }
      return value;
    } catch (e) {
      /**
       * 如果浏览器设置阻止第三方cookie，套在iframe中的mms就访问localStore就会报如下错误
       * SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.
       */
      return null;
    }
  }

  set(val) {
    if (isDef(val)) {
      return Cookies.set(this.key, val, {
        domain: this.domain,
        sameSite: this.sameSite,
        secure: true,
      });
    }
  }

  remove() {
    return Cookies.remove(this.key, { domain: this.domain });
  }
}

// 登陆回跳地址
export const redirectUriPersistence = new Persistence("redirect_uri", PAN_DOMAIN);
// 第三方登陆类型
export const thirdTypePersistence = new Persistence("passport_third_type", PAN_DOMAIN);
// 第三方登陆行为
export const thirdBehaviorPersistence = new Persistence("passport_third_behavior", PAN_DOMAIN);
// 租户名
export const tenantNamePersistence = new Persistence("passport_tenant_name", PAN_DOMAIN);
// 子应用ID
export const subAppIdPersistence = new Persistence("passport_sub_app_id", PAN_DOMAIN);
// 设备ID
export const deviceIdPersistence = new Persistence("passport_device_id", PAN_DOMAIN);
// passport 登陆凭证
export const passportTokenPersistence = new Persistence("passport_token", PAN_DOMAIN);
