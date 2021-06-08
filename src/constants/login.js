// 第三方登陆类型
// http://passport.doc.public.a.royole.club/api/%E5%85%AC%E5%85%B1%E6%B6%88%E6%81%AF%E4%BD%93/#%E7%AC%AC%E4%B8%89%E6%96%B9%E7%B1%BB%E5%9E%8B
import QueryString from "query-string";

export const LOGIN_THIRD_TYPE = {
  WECHAT: 0,
  QQ: 1,
  WEIBO: 2,
  ALIPAY: 3,
  DINGDING: 4,
  FACEBOOK: 5,
  GOOGLE: 6,
  TWITTER: 7,
  WECHAT_MINIPROGRAM: 8,
  INSTAGRAM: 9
};

export const LOGIN_BEHAVIOR = {
  OTHER: 0,
  LOGIN: 1,
  BIND: 2,
  UN_BIND: 3
};

export const LOGIN_THIRD_APP_ID_LIST = [
  null,
  null,
  null,
  null,
  null,
  process.env.VUE_APP_APP_ID_FACEBOOK,
  process.env.VUE_APP_APP_ID_GOOGLE,
  process.env.VUE_APP_APP_ID_TWITTER,
  null,
  process.env.VUE_APP_APP_ID_INSTAGRAM
];

export const LOGIN_THIRD_URL_LIST = [
  null,
  null,
  null,
  null,
  null,
  process.env.VUE_APP_THRID_LOGIN_URL_FACEBOOK,
  process.env.VUE_APP_THRID_LOGIN_URL_GOOGLE,
  process.env.VUE_APP_THRID_LOGIN_URL_TWITTER,
  null,
  process.env.VUE_APP_THRID_LOGIN_URL_INSTAGRAM
].map(url => {
  if (!url) return null;
  const urlObj = QueryString.parseUrl(url);
  urlObj.query.redirect_uri = process.env.VUE_APP_THRID_LOGIN_REDIRECT_URL;
  return QueryString.stringifyUrl(urlObj);
});
