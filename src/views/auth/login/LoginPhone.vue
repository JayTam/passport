<template>
  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.PhoneNumber')" prop="fullPhone" :rules="phoneFindRules">
      <template #label-right>
        <te-button type="primary" plain size="mini" :tab-index="-1" :to="{ name: 'LoginAccount' }" replace>
          {{ $t("Auth.LoginWithUserIDorEmail") }}
        </te-button>
      </template>
      <div>
        <te-phone-input v-model:phone="form.phone" v-model:code="form.phoneAreaCode" />
      </div>
    </te-form-item>

    <captcha-form-item
      :label="$t('Auth.VerificationCode')"
      v-model="form.code"
      prop="code"
      account-prop="fullPhone"
      :type="CAPTCHA_TYPE.TEXT"
      :purpose="CAPTCHA_PURPOSE.LOGIN"
    >
      <template #label-right>
        <te-button type="primary" plain size="mini" :tab-index="-1" :to="{ name: 'ForgetPassword' }">
          {{ $t("Auth.ForgotPassword") }}
        </te-button>
      </template>
    </captcha-form-item>

    <te-form-item>
      <te-button type="warning" block dark :loading="loading" @click="handleSubmit">{{
        $t("Auth.Login")
      }}</te-button>
    </te-form-item>

    <div class="tips">
      <p class="tips__text">{{ $t("Auth.NotaMember") }}</p>
      <te-button type="primary" plain size="mini" :to="{ name: 'SignUpPhone' }" replace>
        {{ $t("Auth.SignUpNow") }}
      </te-button>
    </div>
  </te-form>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeButton from "../../../components/Button";
import TePhoneInput from "../../../components/Form/PhoneInput";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "LoginPhone",
  components: { CaptchaFormItem, TePhoneInput, TeButton, TeForm, TeFormItem },
  setup() {
    const formRef = ref(null);
    const store = useStore();
    const state = reactive({
      form: {
        phone: "",
        phoneAreaCode: "+62",
        fullPhone: computed(() => state.form.phoneAreaCode + state.form.phone),
        code: "",
      },
      loading: false,
    });

    const handleSubmit = async () => {
      try {
        state.loading = true;
        await formRef.value.validate();
        await store.dispatch("auth/loginPhone", {
          phone: state.form.fullPhone,
          code: state.form.code,
        });
      } catch (e) {
        toastPassportAxiosError(e);
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      ...useValidate(),
      formRef,
      handleSubmit,
      CAPTCHA_PURPOSE,
      CAPTCHA_TYPE,
    };
  },
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
