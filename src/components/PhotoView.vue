<template>
  <div class="PhotoView">
    <img
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-46a8e6a6f8419bc8bf02dcec85d991d2_b.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625813739&t=ab689ad083ed6a8404959db680c2b46f"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "PhotoView",
  props: {},
};
</script>

<style lang="less" scoped>
.PhotoView {
  width: 88px;
  height: 88px;
  background: #f6f6f6;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
