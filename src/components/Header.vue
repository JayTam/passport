<template>
  <div class="header" :style="headerStyles" :mode="mode">
    <div class="header--left">
      <slot name="left">
        <div class="header__back" @click="onRouteBack">
          <svg-icon
            :name="mode === 'white' ? 'back-white' : 'back'"
            size="18"
          />
        </div>
      </slot>
    </div>
    <div class="header--center">
      <p class="header__title" :class="{ white: mode === 'white' }">
        {{ title }}
      </p>
    </div>
    <div class="header--right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "TeHeader",
  components: { SvgIcon },
  props: {
    title: String,
    background: {
      type: String,
      default: "transparent"
    },
    fixed: Boolean,
    mode: {
      type: String,
      default: "black"
    },
    border: Boolean,
    borderColor: {
      type: String,
      default: "#f8f8f8"
    },
    to: Object,
    url: String
  },
  setup(props) {
    const router = useRouter();

    const headerStyles = computed(() => ({
      background: props.background,
      position: props.fixed ? "fixed" : "relative",
      borderBottom: props.border ? `1px solid ${props.borderColor}` : null
    }));

    const onRouteBack = () => {
      if (props.to) {
        router.push(props.to);
        return;
      }
      if (props.url) {
        window.location.href = props.url;
        return;
      }
      router.back();
    };

    return { onRouteBack, headerStyles };
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 999;

  .header--left {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }

  .header--center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .header--right {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
  }

  .header__back {
    width: 20px;
    height: 44px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .header__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.444444px;

    &.white {
      color: #fff;
    }
  }
}
</style>
