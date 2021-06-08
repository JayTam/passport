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
  let level = list.find(
    item => item.min <= reputation && reputation <= item.max
  );
  // 超出等级范围
  if (!level) level = list[list.length - 1];

  return {
    max: level.max,
    min: level.min,
    level: level.identify
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
