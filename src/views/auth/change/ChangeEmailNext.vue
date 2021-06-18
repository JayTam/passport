<template>
  <te-form :model="form" ref="formRef">
    <div class="tips" style="margin-bottom: 30px;">
      <p class="tips__text">Please enter your password</p>
      <p class="tips__text">to change your email address.</p>
    </div>

    <captcha-form-item
      v-model="form.code"
      :label="$t('Auth.VerificationCode')"
      prop="code"
      account-prop="email"
      :type="CAPTCHA_TYPE.BIND_EMAIL"
      :purpose="CAPTCHA_PURPOSE.MODIFY_ACCOUNT_EMAIL"
    ></captcha-form-item>

    <div class="void"></div>

    <te-form-item>
      <te-button type="warning" block dark :loading="submitLoading" @click="handleSubmit">{{
        $t("Auth.Next")
      }}</te-button>
    </te-form-item>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeButton from "../../../components/Button";
import { useValidate } from "@/composables/useValidate";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "ChangeMailNext",
  components: { CaptchaFormItem, TeButton, TeForm, TeFormItem },
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const state = reactive({
      form: {
        // email: store.state.user.email,
        code: "",
      },
      submitLoading: false,
      codeLoading: false,
    });

    /**
     * 校验邮箱验证码正确性，然后跳转到设置密码页
     */
    const handleSubmit = async () => {
      try {
        state.submitLoading = true;
        await formRef.value.validate();
        await router.push({
          name: "ChangeEmailDone",
          query: { code: state.form.code },
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
    font-size: 14px;
    line-height: 19px;
    color: @color-text;
  }
}
.void {
  width: 100%;
  height: 50px;
}
</style>
