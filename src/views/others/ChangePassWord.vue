<template>
  <te-form :model="form" ref="formRef">
    <te-form-item label="Password" prop="old_password" :rules="passwordRules">
      <te-input v-model="form.old_password" type="password" />
    </te-form-item>

    <te-form-item label="New Password" prop="new_password" :rules="passwordRules">
      <te-input v-model="form.new_password" type="password" />
      <div class="tips">
        <p class="tips__text">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>
      </div>
    </te-form-item>

    <te-form-item
      label="Confirm Password"
      prop="repeat_password"
      :rules="passwordRules"
      style="margin-bottom: 20px"
    >
      <te-input v-model="form.repeat_password" type="password" />
    </te-form-item>

    <te-form-item>
      <te-button type="warning" block dark :loading="loading" @click="handleSubmit">Done</te-button>
    </te-form-item>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useValidate } from "@/composables/useValidate";
import { Toast } from "vant";
import { changepassword } from "@/apis/auth";
import { toastPassportAxiosError } from "@/utils";
import TeFormItem from "../../components/Form/FormItem";
import TeForm from "../../components/Form/Form";
import TeInput from "../../components/Form/Input";
import TeButton from "../../components/Button";
import { useStore } from "vuex";

export default {
  name: "ChangePassWord",
  components: { TeButton, TeForm, TeFormItem, TeInput },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      form: {
        old_password: "",
        new_password: "",
        repeat_password: "",
      },
    });

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await formRef.value.validate();
        const { old_password, new_password, repeat_password } = state.form;
        await changepassword(old_password, new_password, repeat_password);
        await store.dispatch("auth/logout", { withCallApi: false });
        await router.push("/login");
        Toast.success("修改密码成功！");
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
.tips {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  &__text {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: @color-text-disabled;
  }
}
</style>
