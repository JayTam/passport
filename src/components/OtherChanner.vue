<template>
  <div class="other_channer">
    <div class="Facebook">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-facebook"></use>
      </svg>
      {{ current.text1 }}
    </div>
    <div class="Google">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-google"></use>
      </svg>
      {{ current.text2 }}
    </div>
    <div class="separation">
      <span>OR</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "OtherChanner",
  props: { type: String },
  data() {
    return {
      Login: {
        text1: "Log in with Facebook",
        text2: "Log in with Google",
      },
      signUp: {
        text1: "Continue with Facebook",
        text2: "Continue with Google",
      },
      resetPassword: {
        text1: "Phone verfication",
        text2: "Email verfication",
      },
      current: {},
    };
  },

  mounted() {
    this.current = this[this.type];
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.other_channer {
  margin: 0 auto;
  width: 80%;
  .Facebook,
  .Google {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 8px;
    outline: none;
    border: none;
    cursor: pointer;
    position: relative;
    .icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      vertical-align: middle;
      border-radius: 4px;
      width: 20px;
      height: 20px;
    }
  }
  .Facebook {
    .icon {
      background: white;
    }
    background: #4267b2;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    color: white;
  }
  .Google {
    margin-top: 14px;
    background: #ffffff;
    border: 0.5px solid #c4c4c4;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    color: #222222;
  }
  .separation {
    text-align: center;
    margin: 36px 0;
    position: relative;
    span {
      color: #c4c4c4;
      font-weight: bold;
      font-size: 9px;
    }
    &::before {
      content: "";
      width: 43%;
      height: 1px;
      background-color: #c4c4c4;
      opacity: 0.5;
      position: absolute;
      top: 9px;
      left: 0px;
    }
    &::after {
      content: "";
      width: 43%;
      height: 1px;
      background-color: #c4c4c4;
      opacity: 0.5;
      position: absolute;
      top: 9px;
      right: 0px;
    }
  }
}
</style>
