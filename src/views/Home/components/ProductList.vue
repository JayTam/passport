<template>
  <div class="product-list">
    <div class="product" v-for="(product, index) in list" :key="index">
      <div class="product__img">
        <img
          :src="product.productImg"
          class="product__img__content"
          :alt="product.productName"
          mode="aspectFit  center"
        />
      </div>
      <div class="product__info">
        <p class="product__info__name">{{ product.productName }}</p>
        <p class="product__info__price">￥{{ product.productPrice }}</p>
      </div>
    </div>
  </div>
  <div v-show="loading" class="loading-container">
    <te-loading color="#000"></te-loading>
  </div>
  <div v-show="loadCompleted" class="loading-container">
    <p class="loading-container--completed">{{ $t("Home.LoadCompleted") }}</p>
  </div>
</template>
<script>
import { computed, reactive, toRefs } from "vue";
import TeLoading from "@/components/Loading";
import useInfiniteScroll from "@/composables/useInfiniteScroll";

export default {
  name: "product-list",
  components: { TeLoading },
  setup() {
    const product = {
      productId: 888,
      productName: "NoteBook",
      productPrice: "999",
      productImg: require("@/assets/imgs/product.png")
    };
    const state = reactive({
      loading: false,
      list: [product, product, product, product],
      loadCompleted: computed(() => state.list.length > 10)
    });

    const infiniteScrollRequest = () => {
      if (state.loading || state.loadCompleted) return;
      state.loading = true;
      setTimeout(() => {
        state.list = [...state.list, product, product];
        state.loading = false;
      }, 1000);
    };

    useInfiniteScroll(infiniteScrollRequest);

    return {
      ...toRefs(state)
    };
  }
};
</script>
<style scoped lang="less">
.product-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 2vw;
  background: @color-background;

  .product {
    width: 47vw;
    margin-top: 10px;
    text-align: left;
    background: @color-light;
    border-radius: 12px;
    padding-bottom: 20px;

    &__img {
      width: 47vw;
      height: 47vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;

      &__content {
        max-width: 100%;
        min-height: 47vw;
        border-radius: 12px;
      }
    }

    &__info {
      padding: 10px;

      &__name {
        font-size: 16px;
        font-weight: 600;
      }

      &__price {
        padding-top: 6px;
        font-size: 14px;
        font-weight: normal;
        color: #919191;
      }
    }
  }
}

.loading-container {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: @color-background;

  &--completed {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
