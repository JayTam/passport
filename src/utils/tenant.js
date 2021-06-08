/**
 * 根据二级域名前缀，获取租户名
 */
export function resolveTenantName() {
  const tenantName = window.location.host.split(/[.|:]/)[0];
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test" ||
    tenantName === "localhost"
  ) {
    // 测试租户名
    return process.env.VUE_APP_TEST_TENANT_NAME;
  } else if (process.env.NODE_ENV === "production" && !tenantName) {
    // 默认租户名
    return process.env.VUE_APP_DEFAULT_TENANT_NAME;
  } else {
    // URL中截取的租户名
    return tenantName;
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
