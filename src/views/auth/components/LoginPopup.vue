<template>
  <van-popup
    class="login-popup"
    v-model:show="popupShow"
    position="bottom"
    :style="{ height: '400px' }"
    round
    closeable
  >
    <h1 class="login-popup__title">
      {{ isLogin ? $t("Auth.Login") : $t("Auth.SignUp") }}
    </h1>
    <div class="login-popup__container">
      <te-button
        class="login-popup__button"
        type="warning"
        icon="personal"
        plain
        block
        @click="toLogin"
      >
        {{ isLogin ? $t("Auth.PhoneEmailLogIn") : $t("Auth.PhoneEmailSignUp") }}
      </te-button>
      <te-button
        class="login-popup__button"
        type="primary"
        icon="facebook"
        plain
        block
        @click="toThirdUrl(LOGIN_THIRD_TYPE.FACEBOOK)"
      >
        {{ isLogin ? $t("Auth.LogInFacebook") : $t("Auth.FacebookSignUp") }}
      </te-button>
      <te-button
        class="login-popup__button"
        icon="google"
        color="#000"
        plain
        block
        @click="toThirdUrl(LOGIN_THIRD_TYPE.GOOGLE)"
      >
        {{ isLogin ? $t("Auth.LogInGoogle") : $t("Auth.GoogleSignUp") }}
      </te-button>

      <te-button
        class="login-popup__button"
        icon="twitter"
        color="#000"
        plain
        block
        @click="toThirdUrl(LOGIN_THIRD_TYPE.TWITTER)"
      >
        {{ isLogin ? $t("Auth.LogInTwitter") : $t("Auth.TwitterSignUp") }}
      </te-button>
    </div>
    <div class="login-popup__tips">
      <span>{{ isLogin ? $t("Auth.NotaMember") : $t("Auth.AlreadyAMember") }}</span>
      <te-button
        type="primary" plain
        size="mini"
        @click="$emit('update:type', isLogin ? 'signup' : 'login')"
      >
        {{ isLogin ? $t("Auth.SignUp") : $t("Auth.Login") }}
      </te-button>
    </div>
  </van-popup>
</template>

<script>
import { computed } from "vue";
import { redirectToThird } from "@/utils";
import { LOGIN_BEHAVIOR, LOGIN_THIRD_TYPE } from "@/constants";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "LoginPopup",
  props: {
    show: Boolean,
    type: {
      type: String,
      default: "login",
      validator(val) {
        return ["login", "signup"].includes(val);
      },
    },
  },
  emits: ["update:show", "update:type"],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const popupShow = computed({
      get() {
        return props.show;
      },
      set(val) {
        emit("update:show", val);
      },
    });

    const isLogin = computed(() => props.type === "login");
    const toThirdUrl = type => redirectToThird(type, LOGIN_BEHAVIOR.LOGIN);
    const toLogin = async () => {
      const routeName = isLogin.value ? "LoginAccount" : "SignUpPhone";
      const isHomeRoute = route.name === "Home";
      if (isHomeRoute) {
        await router.push({ name: routeName });
      } else {
        await router.push({
          name: routeName,
          query: { redirect_uri: encodeURIComponent(window.location.href) },
        });
      }
    };

    return {
      popupShow,
      toThirdUrl,
      toLogin,
      isLogin,
      LOGIN_THIRD_TYPE,
    };
  },
};
</script>

<style lang="less" scoped>
.login-popup {
  &__title {
    height: 48px;
    font-size: 18px;
    line-height: 48px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid @color-background;
  }

  &__container {
    padding: 18px 24px;
  }

  &__row {
    display: flex;
  }

  &__button {
    margin-bottom: 18px;
    /deep/ .te-button__icon {
      position: absolute;
      left: 20px;
    }
  }

  &__tips {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: #bfbfbf;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
