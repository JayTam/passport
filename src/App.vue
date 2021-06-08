<template>
  <router-view #="{ Component }">
    <!--   缓存页面   -->
    <keep-alive
      ><component v-if="route.meta.keepAlive" :is="Component"
    /></keep-alive>
    <!--  不缓存页面  -->
    <component v-if="!route.meta.keepAlive" :is="Component" />
  </router-view>
</template>

<script>
import { useDisableDoubleTapToZoom } from "@/composables/useDisableZoom";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    useDisableDoubleTapToZoom();
    return {
      route
    };
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  min-height: 100%;
  background: @color-background;
}
</style>
