<template>
  <div class="login-layout">
    <div class="logo"></div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useViewport } from "@/composables/useViewPort";
import { useI18n } from "vue-i18n";

export default {
  name: "LoginLayout",
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    useViewport({ minHeight: true });
    return {
      route: router.currentRoute,
      t,
    };
  },
};
</script>

<style lang="less" scoped>
.login-layout {
  background-color: white;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: #fff url("../assets/imgs/ZIEL HOMEmax.png") no-repeat center
    center;
  background-size: 100%;
  > .logo {
    width: 141px;
    height: 20px;
    background: #fff url("../assets/imgs/ZIEL HOMElogo.png") no-repeat center
      center;
    background-size: 100%;
    margin-top: 20px;
    margin-left: 141px;
  }
  .content {
    width: 455px;
    height: 615px;
    background: #ffffff;
    box-shadow: 0px 3px 12px 0px rgba(153, 153, 153, 0.1);
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 114px;
    margin-bottom: 249px;
    overflow: hidden;
  }
}
</style>
