<template>
  <div class="product-preview">
    <template v-if="image">
      <img class="product-preview__image" :src="image" :alt="alt" />
    </template>
  </div>
</template>

<script>
export default {
  name: "ProductPreview",
  props: {
    image: String,
    alt: String
  }
};
</script>

<style lang="less" scoped>
.product-preview {
  width: 100vw;
  height: 100vw;
  background: @color-light;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
