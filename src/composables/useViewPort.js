import { getCurrentInstance, onMounted, onUnmounted } from "vue";
import { addUnit } from "@/utils";

/**
 * @typedef Viewport 视口方向
 * @type {Object}
 * @property {number} width 宽度
 * @property {number} height 高度
 * @property {number} minHeight 最低高度
 * @property {number} minWidth 最低宽度
 */

/**
 * 设置元素大小为视口大小
 * @param {HTMLElement} el 元素节点
 * @param {Viewport} viewport 视口方向
 */
function setElementViewport(el, viewport) {
  const {
    width = false,
    height = false,
    minHeight = false,
    minWidth = false
  } = viewport;
  const viewportHeight = addUnit(document.body.clientHeight);
  const viewportWidth = addUnit(document.body.clientWidth);
  if (width) el.style.width = viewportWidth;
  if (height) el.style.height = viewportHeight;
  if (minHeight) el.style.minHeight = viewportHeight;
  if (minWidth) el.style.minWidth = viewportWidth;
}

/**
 * 组件渲染的生命周期中，元素大小为视口大小
 * @param {Viewport} viewport 视口方向
 */
export function useViewport(viewport) {
  const vm = getCurrentInstance();
  let handleChangeViewport;
  onMounted(() => {
    const el = vm.proxy.$el;
    handleChangeViewport = () => setElementViewport(el, viewport);
    handleChangeViewport();
    window.addEventListener("resize", handleChangeViewport);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleChangeViewport);
  });
}
