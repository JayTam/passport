<template>
  <te-form :model="form" ref="formRef">
    <te-form-item
      :label="$t('Auth.Email')"
      prop="email"
      :rules="emailSignUpRule"
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
      :purpose="CAPTCHA_PURPOSE.CHECK"
    ></captcha-form-item>

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
import { reactive, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import { useValidate } from "@/composables/useValidate";
import CaptchaFormItem from "@/views/auth/components/CaptchaFormItem";
import { CAPTCHA_PURPOSE, CAPTCHA_TYPE } from "@/constants";
import { Toast } from "vant";
import { changebindemail } from "@/apis/auth";

export default {
  name: "ChangeMailDone",
  components: { CaptchaFormItem, TeButton, TeForm, TeFormItem, TeInput },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const formRef = ref(null);
    const state = reactive({
      form: {
        email: "",
        code: "",
        old_code: route.query.code
      },
      submitLoading: false
    });

    /**
     * 校验短信验证码正确性，然后跳转到设置密码页
     */
    const handleSubmit = async () => {
      try {
        state.submitLoading = true;
        await formRef.value.validate();
        const { email, code, old_code } = state.form;
        await changebindemail(email, code, old_code);
        Toast.success("换绑邮箱成功");
        await router.path({ name: "AccountSecurity" });
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
