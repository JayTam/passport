import request from "./requests/passportRequest";

/**
 * 活动详情接口
 * @param {string} id 活动id
 * @returns {AxiosPromise}
 */
export function campaign_detail(id) {
  return request({
    method: "GET",
    url: "https://wook.mms-api.qhbit.cn/api/v1/campaign/campaign_detail",
    params: {
      id
    }
  });
}

/**
 * 用户填写领取信息
 * @param {string} campaign_id 活动id
 * @param {string} pay_email 返现账号
 * @param {string} order_id 订单号
 * @returns {AxiosPromise}
 */
export function get_reward(campaign_id, pay_email, order_id) {
  return request({
    method: "POST",
    url: "https://wook.mms-api.qhbit.cn/api/v1/campaign/get_reward",
    params: {
      campaign_id,
      pay_email,
      order_id
    }
  });
}
