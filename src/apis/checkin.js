import requestSns from "@/apis/requests/brandCenterRequest";

/**
 *用户当天签到
 */
export function checkin() {
  return requestSns({
    method: "POST",
    url: "/shutong/sign/add"
  });
}

/**
 * 获取签到历史
 * @returns {AxiosPromise}
 */
export function getCheckinHistory() {
  return requestSns({
    method: "GET",
    url: "/shutong/sign/signView"
  });
}

/**
 * 获取公共签到任务和总共签到天数
 */
export function getCheckinTask() {
  return requestSns({
    method: "GET",
    url: "/shutong/sign/progressive"
  });
}

/**
 * 领取签到奖品
 * @param id 奖品ID号
 * @returns {AxiosPromise}
 */
export function getCheckinAward(id) {
  return requestSns({
    method: "PUT",
    url: `/shutong/sign/progressive/${id}`
  });
}

/**
 * 获取新人任务
 */
export function getNewMemberTasks() {
  return requestSns({
    method: "GET",
    url: "/shutong/profile-tasks"
  });
}
