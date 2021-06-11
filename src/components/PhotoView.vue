<template>
  <div class="PhotoView">
    <img
      src="https://static.neituixiaowangzi.com/company/2017/11-30/102008861919415194.jpg"
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
