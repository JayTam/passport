<template>
  <te-header fixed />
  <div class="coupon">
    <product-preview :image="coupon.image" />

    <div class="coupon__content clearfix">
      <te-card
        class="coupon__item"
        :title="coupon.name"
        :description="coupon.description"
      />
      <te-card
        v-if="coupon.requirement"
        class="coupon__item"
        title="Requirement"
        :description="coupon.requirement"
      />
      <te-card
        class="coupon__item"
        :title="$t('Integral.PeriodOfValidity')"
        :description="coupon.periodOfValidity"
      />
      <te-card
        v-if="coupon.rule"
        class="coupon__item"
        :title="$t('Integral.Rules')"
        :description="coupon.rule"
      />
    </div>

    <integral-submit-bar
      :integral="coupon.integral"
      :loading="exchangeCouponLoading"
      @submit="onExchangeCoupons"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { getCouponsPoolDetail, exchangeCoupon } from "@/apis/user";
import { toastBrandCenterAxiosError } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { mapGetters, useStore } from "vuex";
import { Dialog } from "vant";
import ProductPreview from "@/views/integral/components/ProductPreview";
import TeCard from "@/views/components/TeCard";
import IntegralSubmitBar from "@/views/integral/components/IntegralSubmitBar";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "IntegralRewardInfo",
  components: { IntegralSubmitBar, TeCard, ProductPreview },
  computed: {
    ...mapGetters("user", ["level", "integral"])
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const { t } = useI18n();
    const state = reactive({
      coupon: {
        image: "",
        // 优惠卷名
        name: "",
        // 优惠卷描述信息
        description: "",
        // 兑换要求
        requirement: "",
        // 兑换之后x天有效
        periodOfValidity: "",
        // 兑换所要积分
        integral: 0,
        // 兑换规则描述
        rule: "",
        // 优惠卷兑换规则ID
        ruleId: ""
      },
      exchangeCouponLoading: false
    });

    const fetchData = async function() {
      const response = await getCouponsPoolDetail(route.params.id);
      const data = response.data.data;
      state.coupon.image = data.logo;
      state.coupon.name = data.name;
      state.coupon.description = data.desc;
      state.coupon.requirement = data.consume_conditions.level
        ? `level ${data.consume_conditions.level}`
        : null;
      state.coupon.periodOfValidity = data.deadline
        ? `Valid for ${data.deadline} days after redemption`
        : "Long term effective";
      state.coupon.rule = data.text_rules;
      state.coupon.ruleId = data.rule_id;
      state.coupon.integral = data.score;
    };

    const onExchangeCoupons = async function() {
      if (state.exchangeCouponLoading) return;
      try {
        state.exchangeCouponLoading = true;
        await exchangeCoupon(state.coupon.ruleId);
        await store.dispatch("user/getIntegralInfo");
        Dialog.confirm({
          // message: `${state.coupon.name} exchange is successful, go to view ？ ()`
          message: t("Integral.exchangeIsSuccessful", {
            name: state.coupon.name
          })
        })
          .then(() => {
            router.push({ name: "Assets", hash: "#coupon" });
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
.coupon {
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
