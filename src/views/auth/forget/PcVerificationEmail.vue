<template>
  <p class="title">reset password</p>
  <te-form :model="form" ref="formRef">
    <te-form-item
      :label="$t('Auth.Email')"
      prop="email"
      :rules="emailFindRules"
    >
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
      :purpose="CAPTCHA_PURPOSE.MODIFY_ACCOUNT_PWD"
    ></captcha-form-item>

    <te-form-item>
      <te-button
        type="warning"
        block
        dark
        :loading="submitLoading"
        @click="handleSubmit"
        >{{ $t("Auth.Next") }}</te-button
      >
    </te-form-item>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { toastPassportAxiosError } from "@/utils";
import { useValidate } from "@/composables/useValidate";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "VerificationEmail",
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
          name: "ResetPassword",
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
.title {
  font-size: 28px;
  font-family: Roboto-Medium, Roboto;
  font-weight: 500;
  color: #333333;
  line-height: 33px;
  width: 100%;
  text-align: center;
}
form {
  width: 80%;
  margin: 0 auto;
  margin-top: 60px;
}
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
