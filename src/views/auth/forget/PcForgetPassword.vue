<template>
  <photo-view></photo-view>
  <Desc type="resetPassword"></Desc>

  <!-- <h1 class="reset-password__title">{{ $t("Auth.ResetPassword") }}</h1>
  <p class="reset-password__description">
    {{ $t("Auth.Description") }}
  </p> -->
  <div class="content">
    <te-button
      class="reset-password__button--first"
      type="warning"
      block
      dark
      :to="{ name: 'VerificationPhone' }"
    >
      {{ $t("Auth.PhoneVerification") }}
    </te-button>
    <te-button type="warning" block dark :to="{ name: 'VerificationEmail' }">
      {{ $t("Auth.EmailVerification") }}
    </te-button>
  </div>
</template>

<script>
import TeButton from "../../../components/Button";
import PhotoView from "../../../components/PhotoView";
import Desc from "../../../components/desc";

export default {
  name: "ForgetPassword",
  components: { TeButton, PhotoView, Desc },
};
</script>

<style lang="less" scoped>
.reset-password {
  &__title {
    width: 100%;
    font-size: 22px;
    font-weight: normal;
    box-sizing: border-box;
    text-align: center;
  }

  &__description {
    width: 100%;
    padding: 10px 30px;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
  }

  &__button--first {
    margin: 100px 0 12px 0;
  }
}
.content {
  width: 80%;
  margin: 0 auto;
}
</style>
