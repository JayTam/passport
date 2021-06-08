/**
 * 禁用iOS双击放大
 * @param spaceTime
 */
export function useDisableDoubleTapToZoom(spaceTime = 300) {
  let lastTimestamp = 0;
  document.addEventListener("touchend", event => {
    const nowTimestamp = new Date().valueOf();
    if (nowTimestamp - lastTimestamp < spaceTime) {
      event.preventDefault();
    }
    lastTimestamp = nowTimestamp;
  });
}
