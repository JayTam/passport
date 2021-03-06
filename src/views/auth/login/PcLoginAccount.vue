<template>
  <p class="title">log in</p>
  <te-form :model="form" ref="formRef">
    <te-form-item :label="$t('Auth.UserIdEmail')" prop="account" :rules="accountRules">
      <template #label-right>
        <te-button type="text" size="mini" :tab-index="-1" :to="{ name: 'LoginPhone' }" replace>
          {{ $t("Auth.LoginPhone") }}
        </te-button>
      </template>
      <te-input v-model="form.account"></te-input>
    </te-form-item>

    <te-form-item :label="$t('Auth.Password')" prop="password" :rules="passwordRules">
      <template #label-right>
        <te-button type="text" size="mini" :tab-index="-1" :to="{ name: 'ForgetPassword' }">
          {{ $t("Auth.ForgotPassword") }}
        </te-button>
      </template>
      <te-input v-model="form.password" type="password" />
    </te-form-item>

    <te-form-item>
      <te-button type="warning" block dark :loading="loading" @click="handleSubmit">{{
        $t("Auth.Login")
      }}</te-button>
    </te-form-item>

    <div class="tips">
      <p class="tips__text">{{ $t("Auth.NotaMember") }}</p>
      <te-button type="other" size="mini" :to="{ name: 'SignUpPhone' }" replace>{{
        $t("Auth.SignUpNow")
      }}</te-button>
    </div>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import { useStore } from "vuex";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";

export default {
  name: "PcLoginAccount",
  components: {
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
  },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const store = useStore();
    const state = reactive({
      form: {
        account: "",
        password: "",
      },
    });

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await formRef.value.validate();
        await store.dispatch("auth/loginAccount", state.form);
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
  margin-top: 100px;
  &__text {
    font-size: 12px;
    line-height: 24px;
    color: @color-info;
  }
}
</style>
