/**
 * * 时间格式化
 * @param timeStamp
 */
import { isNumeric } from "@/utils";

/**
 * 标准化时间戳，因为JS时间戳是13位，php,java默认时间戳是10位
 * @param {string | number}  val 标准化前时间戳
 * @returns {number}  标准化后时间戳，固定13位
 */
export function normalizeTimestamp(val) {
  let timestamp;
  if (isNumeric(val)) {
    timestamp = parseInt(val);
  } else {
    timestamp = new Date(val).valueOf();
  }

  if (timestamp.toString().length === 10) {
    return timestamp * 1000;
  }
  return timestamp;
}

/**
 * 时间格式化
 * @param {number | string} timeStamp 时间戳或者时间字符串
 * @param {string} fmt 格式化后的格式
 * @returns {string|null} 格式化后的时间
 */
export function formatTime(timeStamp, fmt = "yyyy-MM-dd hh:mm:ss") {
  const date = new Date(normalizeTimestamp(timeStamp));
  if (date.toDateString() === "Invalid Date") return null;
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
