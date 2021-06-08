<template>
  <te-form :model="form" ref="formRef">
    <te-form-item
      :label="$t('Auth.Password')"
      prop="password"
      :rules="passwordRules"
    >
      <te-input v-model="form.password" type="password" />
    </te-form-item>

    <te-form-item
      :label="$t('Auth.RepeatPassword')"
      prop="rePassword"
      :rules="passwordRules"
      style="margin-bottom: 120px"
    >
      <te-input v-model="form.rePassword" type="password" />
    </te-form-item>

    <te-form-item>
      <te-button
        type="warning"
        block
        dark
        :loading="loading"
        @click="handleSubmit"
        >{{ $t("Auth.Done") }}</te-button
      >
    </te-form-item>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import { resetPasswordEmail, resetPasswordPhone } from "@/apis/auth";
import { Toast } from "vant";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";

export default {
  name: "ResetPassword",
  components: { TeButton, TeForm, TeFormItem, TeInput },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const router = useRouter();

    /**
     *  如果地址栏没携带 [phone code] 或者 [email code] 参数，不符合注册流程，重定向到注册页面
     */
    const { phone, email, code } = router.currentRoute.value.query;
    if ((!email && !phone) || (email && phone) || !code) {
      router
        .push({ name: "ForgetPassword" })
        .then(() => Toast.fail("Reset password error, please retry"));
    }
    // 手机号注册，还是邮箱注册
    const flowType = email ? "email" : "phone";

    const state = reactive({
      form: {
        phone,
        email,
        code,
        password: "",
        rePassword: ""
      }
    });

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await formRef.value.validate();
        const { phone, email, password, code } = state.form;
        if (flowType === "phone") {
          await resetPasswordPhone(phone, password, code);
        } else {
          await resetPasswordEmail(email, password, code);
        }
        await router.push({ name: "LoginAccount" });
        Toast.success("Reset password success!");
      } catch (error) {
        toastPassportAxiosError(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      ...toRefs(state),
      ...useValidate(),
      formRef,
      loading,
      handleSubmit
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
