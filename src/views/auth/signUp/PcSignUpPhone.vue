<template>
  <p class="title">sign up</p>

  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.PhoneNumber')" prop="fullPhone" :rules="phoneSignUpRules">
      <template #label-right>
        <te-button type="text" size="mini" :to="{ name: 'SignUpEmail' }" replace>
          {{ $t("Auth.SignUpWithEmail") }}
        </te-button>
      </template>
      <div>
        <te-phone-input-pc v-model:phone="form.phone" v-model:code="form.phoneAreaCode" />
      </div>
    </te-form-item>

    <captcha-form-item
      v-model="form.code"
      :label="$t('Auth.VerificationCode')"
      prop="code"
      account-prop="fullPhone"
      :type="CAPTCHA_TYPE.TEXT"
      :purpose="CAPTCHA_PURPOSE.CHECK"
    ></captcha-form-item>

    <!-- <div class="tips" style="margin-bottom: 14px;">
      <p class="tips__text">{{ $t("Auth.ByClick") }}</p>
      <te-button type="text" size="mini" :to="{ name: 'UserAgreement' }">
        {{ $t("Auth.TermsOfService") }}
      </te-button>
      <te-button type="text" size="mini" :to="{ name: 'Privacy' }">
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
        type="text"
        size="mini"
        :to="{ name: 'UserAgreement' }"
        style="color: black;height: 20px;"
        >{{ $t("Auth.TermsOfService") }}</te-button
      >
      and congirm that you have read Ziel’s
      <te-button
        type="text"
        size="mini"
        :to="{ name: 'Privacy' }"
        style="color: black;height: 20px;"
        >{{ $t("Auth.PrivacyPolicy") }}.</te-button
      >If you sign up with SMS,SMS fees may apply.
    </div>

    <div class="tips">
      <p class="tips__text">{{ $t("Auth.AlreadyAMember") }}</p>
      <te-button type="text" size="mini" :to="{ name: 'LoginAccount' }" replace>
        {{ $t("Auth.Login") }}
      </te-button>
    </div>
  </te-form>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeButton from "../../../components/Button";
import TePhoneInputPc from "../../../components/Form/PhoneInputPc";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";

export default {
  name: "PcSignUpPhone",
  components: {
    CaptchaFormItem,
    TePhoneInputPc,
    TeButton,
    TeForm,
    TeFormItem,
  },
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const state = reactive({
      form: {
        phone: "",
        phoneAreaCode: "+62",
        fullPhone: computed(() => state.form.phoneAreaCode + state.form.phone),
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
          query: { phone: state.form.fullPhone, code: state.form.code },
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
      TePhoneInputPc,
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
