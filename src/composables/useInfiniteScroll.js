import { onMounted, onUnmounted } from "vue";

/**
 * 无限滚动
 * @param request
 * @param options
 */
export default function useInfiniteScroll(request, options) {
  const innerOptions = options ?? { distance: 50, immediate: true };
  const partScrollEl = document.querySelector(".te-infinite-scroll");
  const targetElement = partScrollEl ?? window;

  function handleScroll() {
    let offsetY, availableOffsetY;
    if (partScrollEl) {
      // 网页被卷去的高
      offsetY = partScrollEl.scrollTop;
      // 网页可被卷去的高 =  网页正文全文高 - 网页可见区域高
      availableOffsetY = partScrollEl.scrollHeight - document.body.clientHeight;
    } else {
      // 网页被卷去的高
      offsetY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 网页可被卷去的高 =  网页正文全文高 - 网页可见区域高
      availableOffsetY =
        document.body.scrollHeight - document.body.clientHeight;
    }
    // 到网页底部的距离
    const toBottomDistance = availableOffsetY - offsetY;
    if (toBottomDistance <= innerOptions.distance) {
      request();
    }
  }

  onMounted(() => {
    targetElement.addEventListener("scroll", handleScroll);
    if (innerOptions.immediate) {
      request();
    }
  });

  onUnmounted(() => {
    targetElement.removeEventListener("scroll", handleScroll);
  });
}
