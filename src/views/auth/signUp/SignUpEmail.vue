<template>
  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.Email')" prop="email" :rules="emailSignUpRule">
      <template #label-right>
        <te-button type="text" size="mini" :to="{ name: 'SignUpPhone' }" replace>
          {{ $t("Auth.SignUpWithPhone") }}
        </te-button>
      </template>
      <div>
        <te-input v-model="form.email" />
      </div>
    </te-form-item>

    <captcha-form-item
      v-model="form.code"
      :label="$t('Auth.VerificationCode')"
      prop="code"
      account-prop="email"
      :type="CAPTCHA_TYPE.EMAIL"
      :purpose="CAPTCHA_PURPOSE.CHECK"
    ></captcha-form-item>

    <div class="tips" style="margin-bottom: 14px;">
      <p class="tips__text">{{ $t("Auth.ByClick") }}</p>
      <te-button type="text" size="mini" :to="{ name: 'UserAgreement' }">
        {{ $t("Auth.TermsOfService") }}
      </te-button>
      <te-button type="text" size="mini" :to="{ name: 'Privacy' }">
        {{ $t("Auth.PrivacyPolicy") }}
      </te-button>
    </div>

    <te-form-item>
      <te-button type="warning" block dark :loading="submitLoading" @click="handleSubmit">{{
        $t("Auth.CreateAccount")
      }}</te-button>
    </te-form-item>

    <div class="tips">
      <p class="tips__text">{{ $t("Auth.AlreadyAMember") }}</p>
      <te-button type="text" size="mini" :to="{ name: 'LoginAccount' }" replace>
        {{ $t("Auth.Login") }}
      </te-button>
    </div>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import { useValidate } from "@/composables/useValidate";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "SignUpEmail",
  components: { CaptchaFormItem, TeButton, TeForm, TeFormItem, TeInput },
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const state = reactive({
      form: {
        email: "",
        code: "",
      },
      submitLoading: false,
      codeLoading: false,
    });

    /**
     * 校验短信验证码正确性，然后跳转到设置密码页
     */
    const handleSubmit = async () => {
      try {
        state.submitLoading = true;
        await formRef.value.validate();
        await router.push({
          name: "SignUpSetPassword",
          query: { email: state.form.email, code: state.form.code },
        });
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
      CAPTCHA_TYPE,
    };
  },
};
</script>

<style lang="less" scoped>
.tips {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  &__text {
    font-size: 12px;
    line-height: 16px;
    color: @color-info;
  }
}
</style>
