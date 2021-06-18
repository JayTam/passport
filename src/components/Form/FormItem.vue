<template>
  <div class="te-form-item" :class="formItemClass">
    <div class="te-form-item__label">
      <div class="te-form-item__label--left">
        <slot name="label">{{ label }}</slot>
      </div>
      <div class="te-form-item__label--right">
        <slot name="label-right"></slot>
      </div>
    </div>
    <div class="te-form-item__content">
      <slot></slot>
    </div>
    <div class="te-form-item__error-message">
      {{ validateMessage }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted, provide, reactive, ref, toRefs } from "vue";
import AsyncValidator from "async-validator";
import { inject } from "vue";
import { FORM_KEY, FORM_ITEM_KEY, formEvents } from "./token";
// import mitt from "mitt";

export default {
  name: "TeFormItem",
  props: {
    label: String,
    placeholder: String,
    prop: String,
    // modelValue: [String, Number],
    rules: { type: Array, default: () => [] },
  },
  // emits: ["update:modelValue"],
  setup(props) {
    const form = inject(FORM_KEY);
    // const formItemMitt = mitt();
    const validateMessage = ref("");
    const validateState = ref("");

    const formItemValue = computed(() => {
      const model = form.model.value;
      const prop = props.prop;
      return model[prop];
    });

    function validate() {
      return new Promise((resolve, reject) => {
        const rules = props.rules;
        if (!rules || rules.length === 0) {
          resolve();
          return;
        }
        const descriptor = {};
        descriptor[props.prop] = rules;
        const validator = new AsyncValidator(descriptor);
        const model = {};
        model[props.prop] = formItemValue.value;
        validator
          .validate(model)
          .then(() => {
            validateState.value = "success";
            validateMessage.value = "";
            resolve();
          })
          .catch(({ errors, fields }) => {
            validateState.value = "error";
            validateMessage.value = errors[0].message;
            reject({
              errors,
              fields,
            });
          });
      });
    }

    const formItem = reactive({
      ...toRefs(props),
      validate,
    });

    provide(FORM_ITEM_KEY, formItem);

    onMounted(() => {
      if (props.prop) {
        form.formMitt.emit(formEvents.addField, formItem);
      }
    });

    const formItemClass = computed(() => {
      return {
        "is-error": validateState.value === "error",
      };
    });

    return {
      validateState,
      validateMessage,
      formItemClass,
    };
  },
};
</script>

<style lang="less">
.te-form-item {
  position: relative;
  padding-bottom: 14px;

  &__label {
    font-size: 14px;
    line-height: 34px;
    font-weight: bold;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  &__error-message {
    min-height: 16px;
    overflow: hidden;
    bottom: 0;
    margin-top: 6px;
    font-size: 12px;
    line-height: 16px;
    color: @color-danger;
  }
}

.te-form-item.is-error {
  .te-form-item__label {
    &--left {
      color: @color-danger;
      animation: shake-horizontal-animation 0.2s ease 0s;
    }
  }
}
</style>
