<template>
  <button
    :class="buttonClass"
    :style="buttonStyles"
    :type="nativeButton"
    :disabled="disabled"
    :tabindex="tabIndex"
    @click="handleClick"
  >
    <template v-if="loading">
      <te-loading :dark="dark" />
    </template>
    <template v-else>
      <svg-icon v-if="icon" class="te-button__icon" :name="icon" size="none" />
      <span class="te-button__text">
        <slot></slot>
      </span>
    </template>
  </button>
</template>

<script>
import TeLoading from "../components/Loading";
import { computed } from "vue";
import { useRoute } from "@/components/composables/useRoute";
import { addUnit } from "@/utils";
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "TeButton",
  components: { SvgIcon, TeLoading },
  props: {
    block: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    icon: String,
    color: String,
    type: {
      type: String,
      default: "default",
      validator: val => {
        return [
          "primary",
          "warning",
          "danger",
          "success",
          "default",
          "info",
          "text"
        ].includes(val);
      }
    },
    size: { type: String, default: "normal" },
    width: [String, Number],
    height: [String, Number],
    nativeButton: {
      type: String,
      default: "button",
      validator: val => {
        return ["button", "submit", "reset"].includes(val);
      }
    },
    tabIndex: Number,
    to: Object,
    url: String,
    replace: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const buttonClass = computed(() => [
      {
        "te-button": true,
        "te-button--block": props.block,
        "te-button--plain": props.plain,
        "te-button--round": props.round,
        "te-button--square": props.square,
        "te-button--dark": props.dark,
        "te-button--disabled": props.disabled,
        "te-button--loading": props.loading
      },
      "te-button--" + props.type,
      "te-button--" + props.size
    ]);

    const buttonStyles = computed(() => {
      // 是否渐变色
      const isLinearGradient = /linear-gradient/.test(props.color);

      const styles = {
        width: addUnit(props.width),
        height: addUnit(props.height),
        color: isLinearGradient
          ? undefined
          : props.plain
          ? props.color
          : undefined,
        background: props.plain ? undefined : props.color,
        borderColor: props.color
      };
      if (isLinearGradient) {
        styles.border = "none";
      }

      return styles;
    });

    const route = useRoute();

    const handleClick = event => {
      if (props.loading) {
        event.preventDefault();
      }
      if (props.loading || props.disabled) return;
      emit("click", event);
      route();
    };
    return {
      buttonClass,
      buttonStyles,
      handleClick
    };
  }
};
</script>

<style lang="less" scoped>
.te-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 44px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  user-select: none;
  white-space: nowrap;

  &__icon {
    position: relative;
    display: inline-block;
    font-size: 1.2em;
    line-height: inherit;
    & + .te-button__text {
      margin-left: 6px;
    }
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    opacity: 0;
    content: "";
  }

  &:active::before {
    opacity: 0.1;
  }

  &--disabled,
  &--loading {
    &::before {
      display: none;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--default {
    color: @color-text;
    background-color: @color-light;
    border: 2px solid #ebedf0;
  }

  &--primary {
    color: @color-light;
    background-color: @color-primary;
    border: 2px solid @color-primary;
  }

  &--success {
    color: @color-light;
    background-color: @color-success;
    border: 2px solid @color-success;
  }

  &--danger {
    color: @color-light;
    background-color: @color-danger;
    border: 2px solid @color-danger;
  }

  &--warning {
    color: @color-light;
    background-color: @color-warning;
    border: 2px solid @color-warning;
  }

  &--info {
    color: @color-light;
    background-color: @color-info;
    border: 2px solid @color-info;
  }

  &--text {
    color: @color-primary;
    background-color: transparent;
    border: 2px solid transparent;
  }

  &--plain {
    background-color: @color-light;

    &.te-button {
      &--primary {
        color: @color-primary;
      }

      &--success {
        color: @color-success;
      }

      &--danger {
        color: @color-danger;
      }

      &--warning {
        color: @color-warning;
      }

      &--info {
        color: @color-info;
      }
    }
  }

  &--dark {
    .te-button__text {
      color: @color-text;
    }
  }

  &--round {
    border-radius: 999px;
  }

  &--square {
    border-radius: 0;
  }

  &--large {
    width: 100%;
    height: 60px;
    font-size: 22px;
  }

  &--normal {
    height: 48px;
    padding: 0 15px;
    font-size: 16px;
  }

  &--small {
    height: 32px;
    padding: 0 8px;
    font-size: 14px;
  }

  &--mini {
    height: 24px;
    padding: 0 4px;
    font-size: 12px;
  }

  &--block {
    display: block;
    width: 100%;
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
}

.te-button__content {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
</style>
