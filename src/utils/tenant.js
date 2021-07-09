/**
 * 根据二级域名前缀，获取租户名
 */
export function resolveTenantName() {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "beta") {
    return process.env.VUE_APP_DEFAULT_TENANT_NAME;
  } else {
    return process.env.VUE_APP_TEST_TENANT_NAME;
  }
}

/**
 * 生成带租户名的地址
 * @param url 待生成含有租户名的
 */
export function generateTenantUrl(url) {
  const tenementName = resolveTenantName();
  return url?.replace(/{(company|tenant)}/, tenementName);
}
