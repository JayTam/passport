<template>
  <div class="assets">
    <te-header :title="$t('UserCenter.Assets')" background="#ffffff" />

    <van-tabs
      v-model:active="tabIndex"
      background="transparent"
      color="#ffe256"
    >
      <van-tab name="coupon" :title="$t('UserCenter.Coupons')">
        <div class="assets__container clearfix">
          <template v-if="loading">
            <te-loading size="30" dark style="margin-top: 20px;" />
          </template>
          <template v-else-if="couponList.length === 0">
            <!--      空状态      -->
          </template>
          <template v-else>
            <van-cell
              v-for="coupon in couponList"
              :key="coupon.id"
              class="assets__item"
              center
              :title="coupon.coupon_pool.name"
              :label="coupon.coupon_pool.expired_at"
              clickable
              :to="{ name: 'CouponInfo', params: { id: coupon.id } }"
              :border="false"
            >
              <template #extra>
                <p class="color-grey">{{ coupon.coupon_pool.desc }}</p>
                <van-icon
                  class="color-grey"
                  name="arrow"
                  style="margin-left: 10px"
                />
              </template>
            </van-cell>
          </template>
        </div>
      </van-tab>

      <van-tab name="product" :title="$t('UserCenter.Products')">
        <div class="assets__container clearfix">
          <template v-if="loading">
            <te-loading size="30" dark style="margin-top: 20px;" />
          </template>
          <template v-else-if="productList.length === 0">
            <!--      空状态      -->
          </template>
          <template v-else>
            <van-cell
              v-for="product in productList"
              :key="product.id"
              class="assets__item"
              center
              :title="product.mall_commodities.title"
              :label="product.expired_at"
              clickable
              :to="{ name: 'ProductInfo', params: { id: product.id } }"
              :border="false"
            >
              <template #extra>
                <p class="color-grey">{{ product.mall_commodities.desc }}</p>
                <van-icon
                  class="color-grey"
                  name="arrow"
                  style="margin-left: 10px"
                />
              </template>
            </van-cell>
          </template>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { reactive, toRefs, watch, watchEffect } from "vue";
import { getCoupons, getCommodities } from "@/apis/user";
import { formatTime } from "@/utils";
import TeLoading from "@/components/Loading";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  name: "Assets",
  components: { TeLoading },
  setup() {
    const route = useRoute();
    const state = reactive({
      tabIndex: route.hash.replace("#", ""),
      showIndicators: false,
      couponList: [],
      productList: [],
      loading: false
    });
    const getCouponList = async function() {
      try {
        state.loading = true;
        const response = await getCoupons();
        state.couponList = response.data.data.map(item => {
          item.expired_at = formatTime(item.expired_at);
          return item;
        });
      } finally {
        state.loading = false;
      }
    };
    const getCommoditiesList = async function() {
      try {
        state.loading = true;
        const response = await getCommodities();
        state.productList = response.data.data.map(item => {
          item.expired_at = formatTime(item.expired_at);
          return item;
        });
      } finally {
        state.loading = false;
      }
    };

    /**
     * 更新地址栏的hash值
     */
    watchEffect(() => router.replace({ hash: "#" + state.tabIndex }));

    watch(
      () => state.tabIndex,
      val => {
        if (val === "coupon") {
          getCouponList();
        } else {
          getCommoditiesList();
        }
      },
      {
        immediate: true
      }
    );

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style scoped lang="less">
.assets {
  background: @color-background;

  &__container {
    width: 100%;
    box-sizing: border-box;
  }

  &__item {
    border-radius: 12px;
    margin: 0 8px 10px 8px;
    width: calc(100% - 16px);
  }
}

.color-grey {
  color: @color-info;
}
</style>
