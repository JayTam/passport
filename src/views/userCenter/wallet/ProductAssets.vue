<template>
  <te-header fixed />
  <div class="product-assets">
    <product-preview :image="product.image" />
    <div class="product-assets__content clearfix">
      <te-card
        class="product-assets__item"
        :title="product.name"
        :description="product.description"
      />
      <te-card
        class="product-assets__item"
        :title="$t('UserCenter.Stated')"
        :description="product.state"
      />
      <te-card
        class="product-assets__item"
        :title="$t('UserCenter.PeriodOfValidity')"
        :description="product.periodOfValidity"
      />
      <te-card
        class="product-assets__item"
        :title="$t('UserCenter.Rules')"
        :description="product.rule"
      />
    </div>

    <te-button
      v-if="isBindAddress"
      class="product-assets__button"
      size="large"
      type="default"
      @click="goPickAddress"
      square
    >
      {{ $t("UserCenter.ShippingInformation") }}
    </te-button>

    <te-button
      v-else-if="product.state !== 'Expired'"
      class="product-assets__button"
      size="large"
      type="danger"
      @click="goPickAddress"
      square
    >
      {{ $t("UserCenter.AddShippingAddress") }}
    </te-button>
  </div>

  <van-popup
    v-model:show="shipping.show"
    style="height: 40%"
    position="bottom"
    round
    closeable
  >
    <div class="shipping">
      <div class="shipping__title">
        {{ $t("UserCenter.ShippingInformation") }}
      </div>
      <div class="shipping__sub-title">{{ $t("UserCenter.Address") }}</div>
      <div class="shipping__sub-description">
        {{ shipping.address }}<br />
        {{ shipping.name }} {{ shipping.phone }}
      </div>
      <template v-if="shipping.carrier && shipping.TNID">
        <div class="shipping__sub-title">
          {{ $t("UserCenter.ShippingInformation") }}
        </div>
        <div class="shipping__sub-description">
          Carrier: {{ shipping.carrier }}<br />
          TIND: {{ shipping.TNID }}
        </div>
      </template>
      <te-button
        class="shipping__submit"
        type="warning"
        size="small"
        dark
        block
        @click="shipping.show = false"
      >
        OK
      </te-button>
    </div>
  </van-popup>
</template>
<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
import { bindAddress, getCommodityDetail } from "@/apis/user";
import { useRoute, useRouter } from "vue-router";
import { mapGetters } from "vuex";
import { Toast } from "vant";
import TeButton from "@/components/Button";
import { parseAreas } from "@/views/userCenter/components/area";
import ProductPreview from "../../integral/components/ProductPreview";
import TeCard from "@/views/components/TeCard";

export default defineComponent({
  name: "ProductAssets",
  components: { TeCard, ProductPreview, TeButton },
  computed: {
    ...mapGetters("user", ["level", "integral"])
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const addressId = route.query.address_id;
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
        ruleId: "",
        // 状态
        state: "",
        // 过期时间,
        expired: ""
      },
      // 是否已经绑定收货地址
      isBindAddress: computed(() => !!state.shipping.address),
      // 物流信息
      shipping: {
        // popup 是否显示
        show: false,
        // 物流公司
        carrier: "",
        // 运单号
        TNID: "",
        // 收货人姓名
        name: "",
        // 收货人手机号
        phone: "",
        // 收货人地址
        address: ""
      }
    });

    const stringifyAddress = async ({ country, province, city, address }) => {
      const areas = `${country}/${province}/${city}`;
      const { selectedOptions } = await parseAreas(areas);
      return selectedOptions
        .reverse()
        .map(({ text }) => text)
        .reduce((text1, text2) => `${text1},${text2}`, address);
    };

    const fetchData = async function() {
      const response = await getCommodityDetail(id);
      const data = response.data.data;
      // 商品信息
      state.product.image = data.commodity.photos[0]?.image;
      state.product.name = data.commodity.title;
      state.product.description = data.commodity.description;
      state.product.periodOfValidity = "Effective until " + data.expired_at;
      state.product.rule = data.commodity.text_rules;
      state.product.ruleId = data.rule_id;
      state.product.state = data.state;
      // 物流信息
      state.isBindAddress = !!data.address_id;
      state.rule = data.rule;
      state.shipping.name = data.address?.consignee;
      state.shipping.phone = data.address?.telephone;
      state.shipping.carrier = data.express_info?.carrier;
      state.shipping.TNID = data.express_info?.TNID;
      if (data.address) {
        state.shipping.address = await stringifyAddress(data.address);
      }
      // 绑定收货地址
      if (!state.isBindAddress && addressId) {
        await bindAddress(id, addressId);
        Toast.success("收货地址绑定成功");
        await fetchData();
      }
    };

    const goPickAddress = function() {
      if (state.isBindAddress) {
        state.shipping.show = true;
      } else {
        router.push({
          name: "PickAddress",
          params: { productId: id },
          query: { redirect_route_path: `/product_info/${id}` }
        });
      }
    };

    fetchData();
    return {
      ...toRefs(state),
      goPickAddress
    };
  }
});
</script>

<style scoped lang="less">
.product-assets {
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

  &__button {
    position: fixed;
    bottom: 0;
    font-size: 18px;
  }
}
.shipping {
  position: relative;
  padding: 0 20px;
  height: 100%;

  &__title {
    font-size: 18px;
    height: 50px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
  }

  &__sub-title {
    font-size: 16px;
    line-height: 32px;
    font-weight: bold;
  }

  &__sub-description {
    padding: 0 0 0 10px;
    font-size: 14px;
    line-height: 24px;
  }

  &__submit {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
  }
}
</style>
