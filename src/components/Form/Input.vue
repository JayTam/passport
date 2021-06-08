<template>
  <div class="te-input" :class="inputClass">
    <template v-if="$slots['button-left']">
      <div class="te-input__button--left">
        <slot name="button-left"></slot>
      </div>
    </template>
    <div class="te-input__control">
      <input
        class="te-input__inner"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        :maxLength="maxLength"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="focus"
        @blur="blur"
      />
    </div>
    <template v-if="$slots['button-right']">
      <div class="te-input__button--right">
        <slot name="button-right"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";

export default {
  props: {
    placeholder: String,
    modelValue: String,
    disabled: { type: Boolean, default: false },
    type: {
      type: String,
      default: "text",
      validator(val) {
        return ["text", "textarea", "password", "tel"].indexOf(val) > -1;
      }
    },
    maxLength: [String, Number]
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(props, { emit }) {
    const state = reactive({
      focus: false
    });

    const focus = () => {
      state.focus = true;
      emit("focus");
    };

    const blur = () => {
      state.focus = false;
      emit("blur");
    };

    const inputClass = computed(() => {
      return {
        "is-disabled": props.disabled,
        "is-focus": state.focus
      };
    });

    return {
      ...toRefs(state),
      inputClass,
      focus,
      blur
    };
  }
};
</script>

<style lang="less">
.te-input {
  display: flex;

  &__control {
    flex-grow: 1;
    padding: 11px 20px;
    background: @input-background-color;
    border-radius: 6px;
    border: 2px solid @input-background-color;
  }

  &__inner {
    display: block;
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    color: @color-text;
    font-size: 16px;
    font-weight: bold;
    height: 22px;
    line-height: 1;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;

    &&::placeholder {
      color: @color-text-disabled;
    }
  }

  &__button--left {
    margin-right: 8px;
  }

  &__button--right {
    margin-left: 8px;
  }

  &.is-disabled {
    color: @color-text-disabled;
  }

  &.is-focus {
    .te-input__control {
      border: 2px solid @color-primary;
    }
  }
}

.te-form-item {
  &.is-error {
    .te-input__control {
      border: 2px solid @color-danger;
    }
  }
}
</style>
