<template>
  <div class="integral-submit-bar">
    <div class="integral-submit-bar__left">
      <slot name="left">
        <span class="integral-submit-bar__num">{{ integral }}</span>
        <span class="integral-submit-bar__unit">{{ $t(unit) }}</span>
      </slot>
    </div>
    <div class="integral-submit-bar__right">
      <te-button
        class="integral-submit-bar__button"
        type="warning"
        :loading="loading"
        round
        dark
        @click="$emit('submit')"
      >
        {{ $t("Integral.Redeem") }}
      </te-button>
    </div>
  </div>
</template>

<script>
// 积分提交
import TeButton from "@/components/Button";

export default {
  name: "IntegralSubmitBar",
  components: { TeButton },
  props: {
    integral: [String, Number],
    unit: { type: String, default: "Integral.points" },
    loading: Boolean
  },
  emits: ["submit"]
};
</script>

<style lang="less" scoped>
.integral-submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8vw;
  line-height: 65px;
  background: @color-light;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__button {
    width: 110px;
  }

  &__num {
    font-size: 22px;
    padding-right: 10px;
    color: #735400;
  }

  &__unit {
    font-size: 14px;
    color: #735400;
  }
}
</style>
