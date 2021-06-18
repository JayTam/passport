<template>
  <div class="account">
    <te-header :title="$t('UserCenter.Account')" background="#fff" border />
    <van-cell-group :border="false">
      <van-cell
        :title="$t('UserCenter.Profiles')"
        :to="{ name: 'Profiles' }"
        is-link
        :border="false"
      />
      <van-cell
        :title="$t('UserCenter.MyWallet')"
        :to="{ name: 'Wallet' }"
        is-link
        :border="false"
      />
      <van-cell
        :title="$t('UserCenter.AccountSecurity')"
        :to="{ name: 'AccountSecurity' }"
        is-link
        :border="false"
      />
    </van-cell-group>

    <van-cell-group title=" " :border="false">
      <van-cell :title="$t('UserCenter.HelpFeedback')" is-link :border="false" />
      <van-cell :title="$t('UserCenter.About')" is-link :border="false" />
    </van-cell-group>

    <van-cell-group title=" " :border="false">
      <te-button type="danger" @click="logoutAccount.show = true" square block>
        {{ $t("UserCenter.LogOut") }}
      </te-button>
    </van-cell-group>

    <van-action-sheet
      v-model:show="logoutAccount.show"
      :actions="logoutAccount.actions"
      :description="$t('UserCenter.Is_LogOut')"
      close-on-click-action
    />
  </div>
</template>
<script>
import { toastPassportAxiosError } from "@/utils";
import TeButton from "@/components/Button";
import { DANGER_COLOR } from "@/constants";

export default {
  name: "Account",
  components: { TeButton },
  data() {
    return {
      logoutAccount: {
        show: false,
        actions: [
          {
            name: this.$t("UserCenter.LogOut"),
            color: DANGER_COLOR,
            callback: this.onLogout,
          },
        ],
      },
    };
  },
  methods: {
    goPage(name) {
      this.$router.push({ name: name });
    },
    async onLogout() {
      try {
        await this.$store.dispatch("auth/logout", { withCallApi: true });
      } catch (error) {
        toastPassportAxiosError(error);
      }
    },
  },
};
</script>
<style scoped lang="less">
.account {
  background-color: @color-background;
  height: 100vh;
}
</style>
