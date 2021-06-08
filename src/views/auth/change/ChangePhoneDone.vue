<template>
  <te-form :model="form" ref="formRef">
    <te-form-item
      :label="$t('Auth.PhoneNumber')"
      prop="fullPhone"
      :rules="phoneFindRules"
    >
      <div>
        <te-phone-input
          v-model:phone="form.phone"
          v-model:code="form.phoneAreaCode"
        />
      </div>
    </te-form-item>

    <captcha-form-item
      :label="$t('Auth.VerificationCode')"
      v-model="form.code"
      prop="code"
      account-prop="fullPhone"
      :type="CAPTCHA_TYPE.TEXT"
      :purpose="CAPTCHA_PURPOSE.CHECK"
    >
    </captcha-form-item>

    <te-form-item>
      <te-button
        type="warning"
        block
        dark
        :loading="submitLoading"
        @click="handleSubmit"
        >{{ $t("Auth.Done") }}</te-button
      >
    </te-form-item>
  </te-form>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeButton from "../../../components/Button";
import TePhoneInput from "../../../components/Form/PhoneInput";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";
import { changebindphone } from "@/apis/auth";
import { Toast } from "vant";

export default {
  name: "ChangePhoneDone",
  components: { CaptchaFormItem, TePhoneInput, TeButton, TeForm, TeFormItem },
  setup() {
    const formRef = ref(null);
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      form: {
        phone: "",
        phoneAreaCode: "+62",
        fullPhone: computed(() => state.form.phoneAreaCode + state.form.phone),
        code: "",
        old_code: route.query.code
      },
      submitLoading: false
    });

    const handleSubmit = async () => {
      try {
        state.submitLoading = true;
        await formRef.value.validate();
        const { fullPhone, code, old_code } = state.form;
        await changebindphone(fullPhone, code, old_code);
        Toast.success("手机号换绑成功");
        await router.push({ name: "AccountSecurity" });
        // await store.dispatch("auth/loginPhone", { phone: state.form.fullPhone, code: state.form.code });
      } catch (e) {
        toastPassportAxiosError(e);
      } finally {
        state.submitLoading = false;
      }
    };

    return {
      ...toRefs(state),
      ...useValidate(),
      formRef,
      handleSubmit,
      CAPTCHA_PURPOSE,
      CAPTCHA_TYPE
    };
  }
};
</script>

<style lang="less" scoped>
.tips {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  &__text {
    font-size: 12px;
    line-height: 24px;
    color: @color-info;
  }
}
</style>
