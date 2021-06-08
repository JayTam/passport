<template>
  <div class="te-card">
    <p class="te-card__title">
      {{ title }}
    </p>
    <p class="te-card__description">
      {{ description }}
    </p>
    <div class="te-card__right">
      <slot name="right"></slot>
    </div>
    <slot />
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TeCard",
  props: {
    title: String,
    description: String,
    round: Boolean
  },
  setup(props) {
    const cardClass = computed(() => ({
      "te-card": true,
      "te-card__round": props.round
    }));

    return {
      cardClass
    };
  }
};
</script>

<style lang="less" scoped>
.te-card {
  position: relative;
  width: 100%;
  padding: 14px 12px;
  border-radius: 12px;
  background: @color-light;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  &__title {
    font-size: 14px;
    color: @color-text;
    font-weight: bold;
    line-height: 28px;
  }

  &__description {
    font-size: 14px;
    color: @color-info;
  }

  &__round {
    border-radius: 999px;
  }

  &__right {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
