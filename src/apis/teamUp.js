import request from "./requests/brandCenterRequest";

/**
 * 生成短链接
 * @param url 长链接
 * @returns {AxiosPromise}
 */
export function shortUrl(url, title) {
  return request({
    method: "POST",
    url: `/shutong/short-url`,
    data: {
      url,
      title
    }
  });
}

/**
 * 获取单条组队活动
 * @param id
 * @param query
 * @returns {AxiosPromise}
 */
export function getSingleTeamUp(id) {
  return request({
    method: "GET",
    url: `/shutong/team-ups/${id}`,
    params: {
      with: "rewards,creator,rewards.entity,rewards.couponPool"
    }
  });
}

/**
 * 领取组队成功的基础奖品
 * @param id 奖品id
 * @returns {AxiosPromise}
 */
export function receiveBaseTeamUpAward(id) {
  return request({
    method: "PATCH",
    url: `/shutong/receive-awards/${id}`
  });
}

/**
 * 领取奖品
 * @param id 奖品id
 * @returns {AxiosPromise}
 */
export function receiveAward(id) {
  return request({
    method: "PATCH",
    url: `/shutong/award-logs/${id}/receive`
  });
}

/**
 * 创建新的组队
 * @returns {Promise<AxiosResponse<any>>}
 */
export function createActiveTeamUp(teamUpId) {
  return request({
    method: "POST",
    url: `/shutong/active-team-ups/${teamUpId}`
  });
}

/**
 * 加入组队
 * @param id 活动ID
 * @param teamId 组队ID
 * @returns {AxiosPromise}
 */
export function joinTeamUp(id, teamId) {
  return request({
    method: "POST",
    url: `/shutong/active-team-ups/${id}/${teamId}`
  });
}
