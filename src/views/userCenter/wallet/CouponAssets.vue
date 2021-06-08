<template>
  <te-header fixed />
  <div class="coupon-assets">
    <product-preview :image="coupon.image" />
    <div class="coupon-assets__content clearfix">
      <te-card
        class="coupon-assets__item"
        :title="coupon.name"
        :description="coupon.description"
      />
      <te-card
        v-if="!isExpired"
        class="coupon-assets__item"
        :title="$t('UserCenter.code')"
        :description="coupon.code"
      >
        <template v-if="coupon.code && !isExpired" #right>
          <te-button
            size="small"
            type="warning"
            round
            plain
            v-clipboard="coupon.code"
            v-clipboard:success="onCopySuccess"
          >
            {{ $t("UserCenter.CopyCode") }}
          </te-button>
        </template>
      </te-card>
      <te-card
        class="coupon-assets__item"
        :title="$t('UserCenter.Stated')"
        :description="coupon.state"
      />
      <te-card
        class="coupon-assets__item"
        :title="$t('UserCenter.PeriodOfValidity')"
        :description="coupon.periodOfValidity"
      />
      <te-card
        v-if="coupon.rule"
        class="coupon-assets__item"
        :title="$t('UserCenter.Rules')"
        :description="coupon.rule"
      />
    </div>
    <template v-if="coupon.url && !isExpired">
      <te-button
        class="coupon-assets__use-it"
        type="danger"
        @click="openNewTab(coupon.url)"
        square
      >
        {{ $t("UserCenter.UseIt") }}
      </te-button>
    </template>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
import { getCommodityDetail } from "@/apis/user";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
import { Toast } from "vant";
import ProductPreview from "@/views/integral/components/ProductPreview";
import TeCard from "@/views/components/TeCard";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CouponAssets",
  components: { TeCard, ProductPreview },
  computed: {
    ...mapGetters("user", ["level", "integral"])
  },
  setup() {
    const router = useRouter();
    const id = router.currentRoute.value.params.id;
    const { t } = useI18n();
    const state = reactive({
      coupon: {
        image: "",
        // 优惠卷名
        name: "",
        // 优惠卷代码
        code: "",
        // 优惠卷描述信息
        description: "",
        // 优惠卷状态
        state: "",
        // 有效期
        periodOfValidity: "",
        // 优惠卷跳转链接
        url: "",
        // 优惠卷规则
        rule: ""
      },
      isExpired: computed(() => state.coupon.state === "Expired")
    });

    const fetchData = async function() {
      const response = await getCommodityDetail(id);
      const data = response.data.data;
      state.coupon.image = data.coupon_pool.logo;
      state.coupon.name = data.coupon_pool.name;
      state.coupon.description = data.coupon_pool.desc;
      state.coupon.periodOfValidity = "Effective until " + data.expired_at;
      state.coupon.rule = data.coupon_pool.rule;
      state.coupon.code = data.coupon_code;
      state.coupon.state = data.state;
      state.coupon.url = data.coupon_pool.platform_url;
    };
    fetchData();

    const openNewTab = url => {
      window.open(url);
    };

    return {
      ...toRefs(state),
      openNewTab,
      onCopySuccess() {
        Toast.success(t("UserCenter.CopySuccess"));
      }
    };
  }
});
</script>

<style scoped lang="less">
.coupon-assets {
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

  &__use-it {
    position: fixed;
    bottom: 0;
    height: 65px;
    width: 100%;
    line-height: 65px;
    color: #ffffff;
    background: #eb3f29;
  }
}
</style>
