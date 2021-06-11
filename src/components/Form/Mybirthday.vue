<template>
  <div class="birthday">
    <my-select type="Month" width="60px" @seleChange="handleMonth"></my-select>
    <my-select type="Day" width="60px" @seleChange="handleDay"></my-select>
    <my-select type="Year" width="60px" @seleChange="handleYear"></my-select>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped></style>
