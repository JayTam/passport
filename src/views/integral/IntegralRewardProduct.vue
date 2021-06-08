<template>
  <te-header fixed />
  <div class="product">
    <product-preview :image="product.image" />

    <div class="product__content clearfix">
      <te-card
        class="product__item"
        :title="product.name"
        :description="product.description"
      />
      <template v-if="product.requirement">
        <te-card
          class="product__item"
          title="Requirement"
          :description="product.requirement"
        />
      </template>
      <te-card
        class="product__item"
        :title="$t('Integral.PeriodOfValidity')"
        :description="product.periodOfValidity"
      />
      <template v-if="product.rule">
        <te-card
          class="product__item"
          :title="$t('Integral.Rules')"
          :description="product.rule"
        />
      </template>
    </div>

    <integral-submit-bar
      :integral="product.integral"
      :loading="exchangeCouponLoading"
      @submit="onExchangeCoupons"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { getEntitiesDetail, exchangeCoupon } from "@/apis/user";
import { toastBrandCenterAxiosError } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { mapGetters, useStore } from "vuex";
import { Dialog } from "vant";
import TeCard from "@/views/components/TeCard";
import IntegralSubmitBar from "@/views/integral/components/IntegralSubmitBar";
import ProductPreview from "@/views/integral/components/ProductPreview";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "IntegralRewardProduct",
  components: { ProductPreview, IntegralSubmitBar, TeCard },
  computed: {
    ...mapGetters("user", ["level", "integral"])
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const { t } = useI18n();
    const state = reactive({
      product: {
        image: "",
        // 商品名
        name: "",
        // 商品描述信息
        description: "",
        // 兑换要求
        requirement: "",
        // 有效期
        periodOfValidity: "",
        // 兑换所要积分
        integral: 1,
        // 兑换规则描述
        rule: "",
        // 实物兑换规则ID
        ruleId: ""
      },
      // 积分兑换操作的loading状态
      exchangeCouponLoading: false
    });

    const fetchData = async function() {
      const response = await getEntitiesDetail(route.params.id);
      const data = response.data.data;
      state.product.image = data.photos[0]?.image;
      state.product.name = data.title;
      state.product.description = data.description;
      state.product.requirement = data.consume_conditions.level
        ? `level ${data.consume_conditions.level}`
        : null;
      state.product.periodOfValidity = data.deadline
        ? `Valid for ${data.deadline} days after redemption`
        : "long term effective";
      state.product.rule = data.text_rules;
      state.product.ruleId = data.rule_id;
      state.product.integral = data.score;
    };

    const onExchangeCoupons = async function() {
      if (state.exchangeCouponLoading) return;
      try {
        state.exchangeCouponLoading = true;
        await exchangeCoupon(state.product.ruleId);
        await store.dispatch("user/getIntegralInfo");
        Dialog.confirm({
          message: t("Integral.exchangeIsSuccessfulAssets", {
            name: state.product.name
          })
        })
          .then(() => {
            router.push({ name: "Assets", hash: "#product" });
          })
          .catch();
      } catch (e) {
        toastBrandCenterAxiosError(e);
      } finally {
        state.exchangeCouponLoading = false;
      }
    };

    fetchData();
    return {
      ...toRefs(state),
      onExchangeCoupons
    };
  }
});
</script>

<style scoped lang="less">
.product {
  background: @color-background;
  min-height: 100vh;

  &__content {
    width: 100%;
    padding: 0 3%;
    box-sizing: border-box;
  }

  &__item {
    margin-bottom: 15px;

    &:nth-child(1) {
      margin-top: -15px;
      position: relative;
      z-index: 2;
    }

    &:nth-last-child(1) {
      margin-bottom: 75px;
    }
  }
}
</style>
