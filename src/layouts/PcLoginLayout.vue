<template>
  <div class="login-layout">
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
  width: 100%;
  box-sizing: border-box;
  padding: 70px 0 140px 0;
  .content {
    width: 350px;
    margin: 0 auto;
  }
}
</style>
