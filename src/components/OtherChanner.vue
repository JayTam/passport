<template>
  <div class="other_channer">
    <div class="Facebook" @click="toThirdUrl(LOGIN_THIRD_TYPE.FACEBOOK)">
      <p>Facebook</p>
    </div>
    <div class="Google" @click="toThirdUrl(LOGIN_THIRD_TYPE.GOOGLE)">
      <p>Google</p>
    </div>
    <!-- <div class="separation">{{ $t("Common.thirdLogin") }}</div> -->
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
  width: 130px;
  .Facebook,
  .Google {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    p {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      font-family: Roboto;
      font-size: 12px;
      line-height: 14px;
      color: #999999;
    }
  }
  .Facebook {
    background: url("../assets/imgs/facebook@2x.png") center center no-repeat;
    background-size: 100%;
  }
  .Google {
    background: url("../assets/imgs/google@2x.png") center center no-repeat;
    background-size: 100%;
    margin-left: 50px;
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
