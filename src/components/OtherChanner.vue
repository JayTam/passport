<template>
  <div class="other_channer">
    <div class="Facebook" @click="toThirdUrl(LOGIN_THIRD_TYPE.FACEBOOK)"></div>
    <div class="Google" @click="toThirdUrl(LOGIN_THIRD_TYPE.GOOGLE)"></div>
    <div class="separation">使用第三方登录</div>
  </div>
</template>
<script>
import { redirectToThird } from "@/utils";
import { LOGIN_BEHAVIOR, LOGIN_THIRD_TYPE } from "@/constants";
export default {
  name: "OtherChanner",
  props: {
    type: {
      type: String,
      default: "login",
      validator(val) {
        return ["login", "signup"].includes(val);
      },
    },
  },
  data() {
    return {
      login: {
        text1: "Log in with Facebook",
        text2: "Log in with Google",
      },
      signUp: {
        text1: "Continue with Facebook",
        text2: "Continue with Google",
      },
      current: {},
      LOGIN_THIRD_TYPE: LOGIN_THIRD_TYPE,
      LOGIN_BEHAVIOR: LOGIN_BEHAVIOR,
    };
  },

  mounted() {
    this.current = this[this.type];
  },
  methods: {
    toThirdUrl(type) {
      redirectToThird(type, this.LOGIN_BEHAVIOR.LOGIN);
    },
  },
};
</script>
<style lang="less" scoped>
.other_channer {
  margin: 0 auto;
  width: 120px;
  overflow: hidden;
  .Facebook,
  .Google {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: inline-block;
  }
  .Facebook {
    background: url("../assets/imgs/facebook@2x.png") center center no-repeat;
    background-size: 100%;
  }
  .Google {
    background: url("../assets/imgs/google@2x.png") center center no-repeat;
    background-size: 100%;
    margin-left: 40px;
  }
  .separation {
    text-align: center;
    color: #c4c4c4;
    font-weight: bold;
    font-size: 9px;
    margin-top: 40px;
  }
}
</style>
