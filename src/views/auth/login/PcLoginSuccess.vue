<template>
  <Desc type="Login"></Desc>
  <div class="logobg"></div>
  <te-button type="warning" block dark class="btn">
    登录成功
  </te-button>
  <div class="over"></div>
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
import Desc from "../../../components/desc";
import OtherChanner from "../../../components/OtherChanner";

export default {
  name: "PcLoginAccount",
  components: {
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
    Desc,
    OtherChanner,
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
      Desc,
      OtherChanner,
    };
  },
};
</script>

<style lang="less" scoped>
form {
  width: 80%;
  margin: 0 auto;
}
.btn {
  width: 80%;
  margin: 0 auto !important;
}
.logobg {
  width: 100%;
  height: 71px;
  background: url("../../../assets/imgs/ZIEL HOMEmin.png") center center
    no-repeat;
  background-size: 100%;
  margin-bottom: 16px;
}
.over {
  width: 100%;
  height: 100px;
}
</style>
