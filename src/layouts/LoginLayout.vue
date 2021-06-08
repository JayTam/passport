<template>
  <div class="login-layout clearfix">
    <te-header :title="t(route.meta.title)" />
    <div class="login-layout__card">
      <div class="login-layout__triangle"></div>
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
      t
    };
  }
};
</script>

<style lang="less" scoped>
.login-layout {
  background-color: @color-warning;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;

  &__card {
    position: relative;
    width: calc(100% - 24px);
    min-height: 100px;
    border-radius: 12px;
    padding: 50px 9px 25px 9px;
    margin: 56px auto;
    box-sizing: border-box;
    background-color: @color-light;
  }

  &__triangle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: @color-warning;
  }
}
</style>
