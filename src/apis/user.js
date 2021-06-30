import request from "./requests/passportRequest";
import requestSns from "./requests/brandCenterRequest";
import { getSingleUserAddressInfo } from "@/apis/address";
import store from "@/store";

export function fetchUserInfo() {
  return request({
    method: "GET",
    url: "/account",
  });
}

/**
 * 获取账户的手机号码
 * @returns {AxiosPromise}
 */
export function fetchPhoneInfo() {
  return request({
    method: "GET",
    url: `/account/${store.state.user.uid}/sphone`,
  });
}

/**
 * 获取账户的邮箱
 * @returns {AxiosPromise}
 */
export function fetchEmailInfo() {
  return request({
    method: "GET",
    url: `/account/${store.state.user.uid}/semail`,
  });
}

export function fetchThirdLoginInfo() {
  return request({
    method: "GET",
    url: `/account/${store.state.user.uid}/third`,
  });
}

/**
 * 获取租户信息
 */
export function getTenementInfo() {
  return request({
    method: "GET",
    url: `/tenant_name/${store.state.tenant.name}`,
  });
}

/**
 * 上传头像
 * @param file 头像文件
 */
export function uploadUserAvatar(file) {
  return request({
    method: "POST",
    url: `multiupload?type=AVATAR`,
    data: file,
  });
}

/**
 * 更新头像
 * @param user 用户信息
 */
export function updateUserAvatar(user) {
  return request({
    method: "PUT",
    url: `/account/${store.state.user.uid}/avatar`,
    data: {
      ...user,
    },
  });
}

/**
 * 更新用户信息
 * @param data 用户信息
 */
export function updateUserInfo(data, uid) {
  return request({
    method: "PUT",
    url: `/account/${uid ? uid : store.state.user.uid}/update`,
    data: {
      ...data,
    },
  });
}

/**
 * 查询用户积分
 */
export function getIntegral() {
  return requestSns({
    method: "GET",
    url: "/shutong/user/currency",
  });
}

/**
 * 查询用户积分历史记录
 */
export function getIntegralHistory(params) {
  return requestSns({
    method: "GET",
    url: "/shutong/user/currency/orders",
    params,
  });
}

/**
 * 查询用户优惠券
 */
export function getCoupons() {
  return requestSns({
    method: "GET",
    url: "/shutong/user-coupons",
  });
}

/**
 * 查询用户可兑换的物品(优惠卷和实体物品)列表
 */
export function getExchangeable(params) {
  return requestSns({
    method: "GET",
    url: "/shutong/exchangeable",
    params: {
      ...params,
    },
  });
}

/**
 * 查询用户可兑换的优惠券列表
 */
export function getCouponsPools(params) {
  return requestSns({
    method: "GET",
    url: "/shutong/coupon-pools",
    params: {
      ...params,
    },
  });
}

/**
 * 查询用户可兑换的实体物品列表
 */
export function getEntities(params) {
  return requestSns({
    method: "GET",
    url: "/shutong/entities",
    params: {
      ...params,
    },
  });
}

/**
 * 查询用户可兑换的优惠券详情
 */
export function getCouponsPoolDetail(id) {
  return requestSns({
    method: "GET",
    url: `/shutong/coupon-pools/${id}`,
  });
}

/**
 * 查询用户可兑换的商品详情
 */
export function getEntitiesDetail(id) {
  return requestSns({
    method: "GET",
    url: `/shutong/entities/${id}`,
  });
}

/**
 * 查询用户已获得奖品列表
 */
export function getCommodities() {
  return requestSns({
    method: "GET",
    url: "/shutong/user-commodities",
  });
}

/**
 * 查询用户已获得奖品详情
 */
export function getCommodityDetail(id) {
  return requestSns({
    method: "GET",
    url: `/shutong/award-records/${id}`,
  });
}

/**
 * 绑定已获得奖品的收获地址
 * @param id 奖品记录id
 * @param address_id
 * @returns {AxiosPromise}
 */
export async function bindAddress(id, address_id) {
  const data = await getSingleUserAddressInfo(address_id);
  return requestSns({
    method: "PATCH",
    url: `/shutong/award-records/${id}/address`,
    data: {
      address: data.data,
    },
  });
}

/**
 * 兑换优惠券
 */
export function exchangeCoupon(ruleId) {
  return requestSns({
    method: "PUT",
    url: `/shutong/exchangeable/${ruleId}`,
  });
}

/**
 *获取用户会员等级
 */
export function getUserLevel() {
  return requestSns({
    method: "GET",
    url: "/shutong/user-level-config",
  });
}
