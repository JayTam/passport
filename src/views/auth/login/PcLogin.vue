<template>
  <Desc type="Login"></Desc>
  <div class="logobg"></div>
  <te-button type="warning" block dark :to="{ name: 'LoginPhone' }" class="btn">
    {{ $t("Auth.tips") }}
  </te-button>
  <div class="tips">
    <p class="tips__text">{{ $t("Auth.NotaMember") }}</p>
    <te-button type="other" size="mini" :to="{ name: 'SignUpPhone' }" replace>{{
      $t("Auth.SignUpNow")
    }}</te-button>
  </div>

  <!-- TODO 第三方登录暂时隐藏 -->
  <!-- <other-channer type="login"></other-channer> -->
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import { useStore } from "vuex";
import TeButton from "../../../components/Button";
import Desc from "../../../components/desc";
import OtherChanner from "../../../components/OtherChanner";

export default {
  name: "PcLoginAccount",
  components: {
    TeButton,
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
  // background: url("../../../assets/imgs/ZIEL HOMEmin.png") center center no-repeat;
  background-size: 100%;
  margin-bottom: 16px;
}
.tips {
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  &__text {
    font-size: 12px;
    line-height: 24px;
    color: @color-info;
  }
}
.other_channer {
  margin-top: 157px;
  margin-bottom: 28px;
}
</style>
