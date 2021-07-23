<template>
  <p class="title">sign up</p>

  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.Email')" prop="email" :rules="emailSignUpRule">
      <template #label-right>
        <te-button type="primary" plain size="mini" :to="{ name: 'SignUpPhone' }" replace>
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

    <!-- 原有的 -->
    <!-- <div class="tips" style="margin-bottom: 14px;">
      <p class="tips__text">{{ $t("Auth.ByClick") }}</p>
      <te-button type="primary" plain size="mini" :to="{ name: 'UserAgreement' }">
        {{ $t("Auth.TermsOfService") }}
      </te-button>
      <te-button type="primary" plain size="mini" :to="{ name: 'Privacy' }">
        {{ $t("Auth.PrivacyPolicy") }}
      </te-button>
    </div> -->

    <te-form-item>
      <te-button type="warning" block dark :loading="submitLoading" @click="handleSubmit">{{
        $t("Auth.CreateAccount")
      }}</te-button>
    </te-form-item>

    <div class="tips" style="margin-bottom: 14px; font-size: 12px;color: #999999;">
      By continuing,you agree to Ziel’s
      <te-button
        type="primary" plain
        size="mini"
        :to="{ name: 'UserAgreement' }"
        style="height: 14px; color: black; border: none;"
      >
        {{ $t("Auth.TermsOfService") }}
      </te-button>
      and confirm that you have read Ziel’s
      <te-button
        type="primary" plain
        size="mini"
        :to="{ name: 'Privacy' }"
        style="height: 14px; color: black; border: none;"
      >
        {{ $t("Auth.PrivacyPolicy") }} </te-button
      >.
    </div>

    <div class="tips">
      <p class="tips__text">{{ $t("Auth.AlreadyAMember") }}</p>
      <te-button type="danger" plain size="mini" :to="{ name: 'LoginAccount' }" replace>
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
  name: "PcSignUpEmail",
  components: {
    CaptchaFormItem,
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
  },
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
  flex-wrap: wrap;

  &__text {
    font-size: 12px;
    // line-height: 24px;
    color: @color-info;
  }
}
</style>
