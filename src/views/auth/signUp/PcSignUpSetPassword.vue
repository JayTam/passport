<template>
  <p class="title">sign up</p>

  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.Password')" prop="password" :rules="passwordRules">
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
      <te-button type="warning" block dark :loading="loading" @click="handleSubmit">{{
        $t("Auth.CompleteAccount")
      }}</te-button>
    </te-form-item>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useValidate } from "@/composables/useValidate";
import { Toast } from "vant";
import { signUpEmail, signUpPhone } from "@/apis/auth";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import { useStore } from "vuex";

export default {
  name: "PcSignUpSetPassword",
  components: {
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
  },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const router = useRouter();
    const store = useStore();

    /**
     *  如果地址栏没携带 [phone code] 或者 [email code] 参数，不符合注册流程，重定向到注册页面
     */
    const { phone, email, code } = router.currentRoute.value.query;
    if ((!email && !phone) || (email && phone) || !code) {
      router
        .push({ name: "SignUpPhone" })
        .then(() => Toast.fail("Registration error, please re-register"));
    }
    // 手机号注册，还是邮箱注册
    const flowType = email ? "email" : "phone";

    const state = reactive({
      form: {
        phone,
        email,
        code,
        password: "",
        rePassword: "",
      },
    });

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await formRef.value.validate();
        const { phone, password, code } = state.form;
        let response;
        if (flowType === "phone") {
          response = await signUpPhone(phone, password, code);
        } else {
          response = await signUpEmail(email, password, code);
        }
        console.log(response.data);
        await store.commit("user/SET_USER_ID", response.data.claim.uid);
        // await store.commit("auth/SET_PASSPORT_TOKEN", response.data.token);
        // window.localStorage.setItem("myToken", JSON.stringify(response.data));
        await store.dispatch("auth/signSuccess", response.data);
        router.push({
          name: "editProfile",
        });
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
      handleSubmit,
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
