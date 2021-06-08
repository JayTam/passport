import request from "./requests/passportRequest";
import store from "@/store/index";

/**
 * 获取地址信息
 * @param code 地区代码
 * @returns {AxiosPromise}
 */
export function getAddressList(code) {
  return request({
    method: "GET",
    url: `/district`,
    params: {
      parent_code: code,
      size: 10000,
      sort_field: "area_code"
    }
  });
}

/**
 * 获取用户地址信息
 */
export function getUserAddressInfo() {
  return request({
    method: "GET",
    url: `/account/${store.state.user.uid}/shippingAddresses`
  });
}

/**
 * 获取单条用户地址
 */
export function getSingleUserAddressInfo(addressId) {
  return request({
    method: "GET",
    url: `/account/${store.state.user.uid}/shippingAddress`,
    params: {
      id: addressId
    }
  });
}

/**
 * 获取单条用户地址
 * @param data 分页信息等
 */
export function updateSingleUserAddressInfo(data) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/shippingAddress?id=${data.id}`,
    data
  });
}

/**
 * 创建用户地址信息
 * @param data 地址信息等
 */
export function createUserAddressInfo(data) {
  return request({
    method: "POST",
    url: `/account/${store.state.user.uid}/shippingAddress`,
    data: {
      ...data
    }
  });
}
