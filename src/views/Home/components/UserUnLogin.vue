<template>
  <div class="user-un-login">
    <div class="upper">
      <p class="upper__title">
        {{ $t("Home.JoinUs", { name: $store.state.tenant.name }) }}
      </p>
      <p class="upper__sub-title">{{ $t("Home.StartANewJourney") }}</p>
    </div>
    <div class="content">
      <div class="content__item">
        <div class="content__item-left vip">
          <svg-icon name="vip" size="25"></svg-icon>
        </div>
        <div class="content__item-right">
          {{ $t("Home.GetCoupon", { Amount: "$20" }) }}
        </div>
      </div>
      <div class="content__item">
        <div class="content__item-left">
          <svg-icon name="gift" size="16"></svg-icon>
        </div>
        <div class="content__item-right">{{ $t("Home.RedeemRewards") }}</div>
      </div>
      <div class="content__item">
        <div class="content__item-left">
          <svg-icon name="rewards" size="16"></svg-icon>
        </div>
        <div class="content__item-right">{{ $t("Home.InviteFriends") }}</div>
      </div>
    </div>
    <div class="login">
      <te-button type="warning" dark round block @click="onClick('signup')">{{
        $t("Home.JoinNow")
      }}</te-button>
      <div class="login__tip">
        <span>{{ $t("Home.AlreadyAMember") }}</span>
        <te-button type="text" size="mini" @click="onClick('login')">{{
          $t("Home.LogIn")
        }}</te-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-un-login",
  props: {
    show: Boolean
  },
  emits: ["update:show", "click"],
  methods: {
    onClick(type) {
      this.$emit("update:show", true);
      this.$emit("click", type);
    }
  }
};
</script>
<style lang="less" scoped>
.user-un-login {
  .upper {
    margin: 12px 20px 0;
    padding-top: 14px;
    padding-left: 18px;
    padding-bottom: 10px;
    background: linear-gradient(140.55deg, #edde5d -31.46%, #f09819 135.93%);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1645);
    border-radius: 12px 12px 0 0;
    color: #735400;

    .upper__title {
      line-height: 25px;
      font-size: 18px;
      font-weight: 600;
    }

    .upper__sub-title {
      line-height: 19px;
      font-size: 14px;
      font-weight: normal;
    }
  }

  .content {
    padding: 18px 38px;

    &__item {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      height: 36px;

      &-left {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        background: #ffe256;

        &.vip {
          line-height: 40px;
        }
      }

      &-right {
        padding-left: 22px;
        line-height: 18px;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  .login {
    width: 100%;
    margin: 20px 0;
    padding: 0 46px;
    box-sizing: border-box;

    &__tip {
      padding-top: 12px;
      margin: 0 auto;
      width: 100%;
      text-align: center;
      color: #bfbfbf;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
