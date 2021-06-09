<template>
  <h1 class="reset-password__title">{{ $t("Auth.ResetPassword") }}</h1>
  <p class="reset-password__description">
    {{ $t("Auth.Description") }}
  </p>
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
</template>

<script>
import TeButton from "../../../components/Button";

export default {
  name: "ForgetPassword",
  components: { TeButton },
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
</style>
