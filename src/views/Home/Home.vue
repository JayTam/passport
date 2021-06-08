<template>
  <div class="home">
    <div
      class="home__cover"
      :style="{ background: `url(${tenant.brand})` }"
    ></div>

    <router-link :to="{ name: 'Account' }">
      <div class="home__menu">
        <svg-icon
          v-show="isLogin"
          name="detail"
          size="18"
          :to="{ name: 'Account' }"
        />
      </div>
    </router-link>

    <div class="home__profile">
      <div class="home__profile--row">
        <van-image
          class="home__profile-avatar"
          :src="tenant.logo"
          alt="avatar"
          fit="cover"
          round
        />
        <span class="home__profile-name">{{ tenant.name }}</span>
      </div>
      <div class="home__profile-description">{{ tenant.description }}</div>
    </div>
  </div>

  <van-tabs
    v-model:active="activeTab"
    animated
    border
    sticky
    swipeable
    color="#ffe256"
    line-width="25"
    background="#fff"
  >
    <van-tab name="product">
      <template #title>
        <svg-icon
          :name="activeTab === 'product' ? 'product-select' : 'product'"
          size="20"
        ></svg-icon>
      </template>
      <product-list />
    </van-tab>
    <van-tab name="member">
      <template #title>
        <svg-icon
          :name="activeTab === 'member' ? 'crown-select' : 'crown'"
          size="22"
        ></svg-icon>
      </template>
      <user-login v-if="isLogin" />
      <user-un-login
        v-else
        v-model:show="loginPopup.show"
        @click="onLoginRegisterClick"
      />
    </van-tab>
  </van-tabs>
  <login-popup v-model:show="loginPopup.show" v-model:type="loginPopup.type" />
</template>

<script>
import ProductList from "./components/ProductList.vue";
import UserUnLogin from "./components/UserUnLogin";
import UserLogin from "./components/UserLogin";
import LoginPopup from "@/views/auth/components/LoginPopup";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductList,
    UserUnLogin,
    UserLogin,
    LoginPopup
  },
  name: "Home",
  data() {
    return {
      brand: "brand",
      activeTab: "member",
      // 登陆/注册提示框
      loginPopup: {
        show: false,
        type: "signup"
      },
      // 租户信息
      tenement: {
        name: "",
        logo: "",
        description: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["isLogin", "avatar", "name"]),
    tenant() {
      return this.$store.state.tenant;
    }
  },
  mounted() {
    this.loginPopup.show = !this.isLogin;
  },
  methods: {
    onLoginRegisterClick(type) {
      this.loginPopup.type = type;
    }
  }
};
</script>

<style scoped lang="less">
.home {
  position: relative;
  height: 224px;
  background: #f6f6f6;

  &__cover {
    height: 142px;
    width: 100%;
    background: no-repeat;
    background-size: cover;
  }

  &__menu {
    position: absolute;
    top: 14px;
    right: 38px;
  }

  &__profile {
    position: absolute;
    top: 84px;
    left: 20px;

    &--row {
      display: flex;
    }

    &-avatar {
      height: 77px;
      width: 77px;
    }

    &-name {
      display: inline-block;
      line-height: 77px;
      margin-left: 10px;
      font-weight: normal;
      font-size: 22px;
      color: #ffffff;
    }

    &-description {
      margin-top: 14px;
      font-size: 14px;
    }
  }
}
</style>
