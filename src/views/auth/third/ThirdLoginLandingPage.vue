<template>
  <div class="third-landing-page">
    <h1>{{ $t("Auth.LoginSuccess") }}</h1>
    <p>{{ $t("Auth.redirecting") }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { thirdBehaviorPersistence, toastPassportAxiosError } from "@/utils";
import { LOGIN_BEHAVIOR } from "@/constants";

export default {
  name: "ThirdLoginLandingPage",
  setup() {
    const store = useStore();
    // 第三方登陆行为
    const behavior = thirdBehaviorPersistence.get();

    const init = async () => {
      try {
        if (behavior === LOGIN_BEHAVIOR.LOGIN) {
          await store.dispatch("auth/loginThird");
          window.opener.location.reload();
          window.close();
        } else if (behavior === LOGIN_BEHAVIOR.BIND) {
          await store.dispatch("auth/bindThird");
        }
      } catch (e) {
        toastPassportAxiosError(e);
      }
    };

    init();
  },
};
</script>

<style lang="less" scoped>
.third-landing-page {
  text-align: center;
  margin: 50px 0;

  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>
