/**
 * 获取passport租户名，租户名用于标识环境，test为测试环境，paasport为正式和beta环境
 */
export function resolveTenantName() {
  return process.env.VUE_APP_PAASPORT_TENANT_NAME;
}

/**
 * 生成带租户名的地址
 * @param url 待生成含有租户名的
 */
export function generateTenantUrl(url) {
  const tenementName = resolveTenantName();
  return url?.replace(/{(company|tenant)}/, tenementName);
}
