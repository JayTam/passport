/**
 * 与业务逻辑相关的工具函数，但是又不足以分一个类别
 */

import { shortUrl } from "@/apis";

/**
 * 根据新誉值计算当前用户等级
 * @param {number} reputation 新誉值
 * @param {Array} list 等级列表
 * @returns {{max: number,min: number, level: number} | {}}
 */
export function calcUserLevel(reputation, list) {
  if (!Array.isArray(list) || list.length === 0) return {};
  let level = list.find(item => item.min <= reputation && reputation <= item.max);
  // 超出等级范围
  if (!level) level = list[list.length - 1];

  return {
    max: level.max,
    min: level.min,
    level: level.identify,
  };
}

/**
 * 生成组队链接
 * @param activityId 活动ID
 * @param teamId 队伍ID
 * @returns {Promise<*>}
 */
export async function generateTeamUpUrl(activityId, teamId) {
  const response = await shortUrl(
    `${location.origin}/team_up/${activityId}/join/${teamId}`,
    "组队邀请"
  );
  return response.data.data.shorturl;
}

// 判断设备类型,pc还是移动端,pc端则返回一个bool值true
export function isPC() {
  //是否为PC端
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  console.warn(flag ? "这个设备是PC(提示)" : "这个设备是移动(提示)");
  return flag;
}
/**
 * 给parent frame发送消息
 * @param {string} action 消息类型
 * @param {Object} payload 消息负载
 * @param {string} targetOrigin
 */
export function postMessage(action, payload, targetOrigin = "*") {
  window.parent.postMessage(
    {
      name: "passport",
      action: action,
      payload: payload,
    },
    targetOrigin
  );
}
