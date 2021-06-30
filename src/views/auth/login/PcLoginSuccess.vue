<template>
  <Desc type="Login"></Desc>
  <div class="logobg"></div>
  <te-button type="warning" block dark class="btn">
    {{ $t("Auth.LoginSuccess") }}
  </te-button>
  <div class="over"></div>
</template>

<script>
import Desc from "../../../components/desc";
import TeButton from "@/components/Button";

export default {
  name: "PcLoginAccount",
  components: {
    TeButton,
    Desc,
  },
  setup() {
    return {
      Desc,
    };
  },
};
</script>

<style lang="less" scoped>
form {
  width: 80%;
  margin: 0 auto;
}
.btn {
  width: 80%;
  margin: 0 auto !important;
}
.logobg {
  width: 100%;
  height: 71px;
  background: url("../../../assets/imgs/ZIEL HOMEmin.png") center center no-repeat;
  background-size: 100%;
  margin-bottom: 16px;
}
.over {
  width: 100%;
  height: 100px;
}
</style>
