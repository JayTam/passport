<template>
  <te-form-item :label="label" :prop="prop" :rules="captchaRulesGenerator(account, type, purpose)">
    <template #label-right>
      <slot name="label-right" />
    </template>
    <te-code-input
      v-model="captchaCode"
      :loading="loading"
      :disabled="disabled"
      :code-request="handleCodeRequest"
      max-length="6"
    />
  </te-form-item>
</template>

<script>
import { computed, reactive, toRefs, getCurrentInstance } from "vue";
import TeFormItem from "@/components/Form/FormItem";
import TeCodeInput from "@/components/Form/CodeInput";
import { getCaptcha } from "@/apis/captcha";
import { toastPassportAxiosError } from "@/utils";
import { useValidate } from "@/composables/useValidate";
import { findVm } from "@/utils";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "CaptchaFormItem",
  components: { TeCodeInput, TeFormItem },
  props: {
    label: String,
    prop: String,
    accountProp: String,
    type: {
      type: Number,
      required: true,
      validator(val) {
        return Object.values(CAPTCHA_TYPE).includes(val);
      },
    },
    purpose: {
      type: Number,
      required: true,
      validator(val) {
        return Object.values(CAPTCHA_PURPOSE).includes(val);
      },
    },
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
      disabled: false,
      account: undefined,
    });
    const formVm = findVm(getCurrentInstance(), "TeForm");

    const captchaCode = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        if (formVm) state.account = formVm.proxy.model[props.accountProp];
        emit("update:modelValue", val);
      },
    });

    const handleCodeRequest = async () => {
      try {
        state.loading = true;
        // 发送验证码之前先校验account字段
        if (formVm) {
          await formVm.proxy.validateField(props.accountProp);
          state.account = formVm.proxy.model[props.accountProp];
          await getCaptcha(state.account, props.type, props.purpose);
          state.disabled = false;
        } else {
          console.warn("Component [CaptchaFormItem]: should  wrapper by TeForm");
        }
      } catch (error) {
        toastPassportAxiosError(error);
        throw error;
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      ...useValidate(),
      captchaCode,
      handleCodeRequest,
    };
  },
};
</script>

<style scoped></style>
