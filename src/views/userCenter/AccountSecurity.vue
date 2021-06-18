<template>
  <div class="account-security">
    <te-header :title="$t('UserCenter.AccountSecurity')" background="#fff" border />

    <van-cell-group :border="false">
      <van-cell :title="$t('UserCenter.UserID')" :value="uid" :border="false" />
      <van-cell
        :title="$t('UserCenter.Phone')"
        :value="phone.value"
        :border="false"
        is-link
        clickable
        @click="phone.onClick"
      />
      <van-cell
        :title="$t('UserCenter.Email')"
        :value="email.value"
        :border="false"
        is-link
        clickable
        @click="email.onClick"
      />
      <van-cell
        :title="$t('UserCenter.ChangePassword')"
        :border="false"
        is-link
        clickable
        @click="changepassword.onClick"
      />
    </van-cell-group>

    <van-cell-group title=" " :border="false">
      <van-cell
        title="Facebook"
        :value="facebook.value"
        :border="false"
        clickable
        is-link
        @click="facebook.onClick"
      />
      <van-cell
        title="Google"
        :value="google.value"
        :border="false"
        clickable
        is-link
        @click="google.onClick"
      />
      <van-cell
        title="Twitter"
        :value="twitter.value"
        :border="false"
        clickable
        is-link
        @click="twitter.onClick"
      />
    </van-cell-group>

    <!--    <van-cell-group title=" " :border="false">-->
    <!--      <te-button type="danger" square block @click="deleteAccount.show = true">-->
    <!--        Delete Account-->
    <!--      </te-button>-->
    <!--    </van-cell-group>-->

    <van-action-sheet
      v-model:show="phone.show"
      :actions="phone.actions"
      :description="$t('UserCenter.NoPhoneNumber')"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="phone.changeShow"
      :actions="phone.changeActions"
      :description="phone.value"
      close-on-click-action
      @click="hanldChangePhone"
    />

    <van-action-sheet
      v-model:show="email.show"
      :actions="email.actions"
      :description="$t('UserCenter.NoEmailSet')"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="email.changeShow"
      :actions="email.changeActions"
      :description="email.value"
      close-on-click-action
      @click="hanldChangeEmail"
    />

    <van-action-sheet
      v-model:show="changepassword.show"
      :actions="changepassword.actions"
      :description="changepassword.value"
      close-on-click-action
      @click="hanldChangePassWord"
    />

    <van-action-sheet
      v-model:show="facebook.show"
      :actions="facebook.actions"
      :description="$t('UserCenter.FacebookHa')"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="facebook.changeShow"
      :actions="facebook.changeActions"
      :description="username"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="google.show"
      :actions="google.actions"
      :description="$t('UserCenter.GoogleHa')"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="google.changeShow"
      :actions="google.changeActions"
      :description="username"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="twitter.show"
      :actions="twitter.actions"
      :description="$t('UserCenter.TwitterHa')"
      close-on-click-action
    />

    <van-action-sheet
      v-model:show="twitter.changeShow"
      :actions="twitter.changeActions"
      :description="username"
      close-on-click-action
    />

    <!--    <van-action-sheet-->
    <!--      v-model:show="deleteAccount.show"-->
    <!--      :actions="deleteAccount.actions"-->
    <!--      description="Do you want to delete your account?"-->
    <!--      close-on-click-action-->
    <!--    />-->
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { redirectToThird } from "@/utils";
import { DANGER_COLOR, LOGIN_BEHAVIOR, LOGIN_THIRD_TYPE } from "@/constants";
import { useI18n } from "vue-i18n";

export default {
  name: "AccountSecurity",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const hanldChangeEmail = () => {
      router.push({ name: "ChangeEmailNext" });
    };
    const hanldChangePhone = () => {
      router.push({ name: "ChangePhoneNext" });
    };
    const hanldChangePassWord = () => {
      router.push({ name: "ChangePassWord" });
    };
    const state = reactive({
      uid: store.state.user.uid,
      username: store.state.user.name,
      phone: {
        value: store.state.user.phone,
        show: false,
        actions: [{ name: t("UserCenter.BindPhoneNumber"), color: DANGER_COLOR }],
        changeShow: false,
        changeActions: [{ name: t("UserCenter.ChangePhoneNumber"), color: DANGER_COLOR }],
        onClick() {
          if (state.phone.value) {
            state.phone.changeShow = true;
          } else {
            state.phone.show = true;
          }
        },
      },
      email: {
        value: store.state.user.email,
        show: false,
        actions: [{ name: t("UserCenter.BindEmail"), color: DANGER_COLOR }],
        changeShow: false,
        changeActions: [{ name: t("UserCenter.ChangeEmail"), color: DANGER_COLOR }],
        onClick() {
          if (state.email.value) {
            state.email.changeShow = true;
          } else {
            state.email.show = true;
          }
        },
      },
      changepassword: {
        value: t("UserCenter.wantChangePassword"),
        show: false,
        actions: [{ name: t("UserCenter.go"), color: DANGER_COLOR }],
        onClick() {
          state.changepassword.show = true;
        },
      },
      facebook: {
        value: store.state.auth.facebook.openId ? "Bound" : t("UserCenter.Unbound"),
        show: false,
        actions: [
          {
            name: t("UserCenter.BindFacebook"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.FACEBOOK, LOGIN_BEHAVIOR.BIND),
          },
        ],
        changeShow: false,
        changeActions: [
          {
            name: t("UserCenter.ChangeFacebook"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.FACEBOOK, LOGIN_BEHAVIOR.BIND),
          },
        ],
        onClick() {
          if (store.state.auth.facebook.openId) {
            state.facebook.changeShow = true;
          } else {
            state.facebook.show = true;
          }
        },
      },
      google: {
        value: store.state.auth.google.openId ? "Bound" : t("UserCenter.Unbound"),
        show: false,
        actions: [
          {
            name: t("UserCenter.BindGoogle"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.GOOGLE, LOGIN_BEHAVIOR.BIND),
          },
        ],
        changeShow: false,
        changeActions: [
          {
            name: t("UserCenter.ChangeGoogle"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.GOOGLE, LOGIN_BEHAVIOR.BIND),
          },
        ],
        onClick() {
          if (store.state.auth.google.openId) {
            state.google.changeShow = true;
          } else {
            state.google.show = true;
          }
        },
      },
      twitter: {
        value: store.state.auth.twitter.openId ? "Bound" : t("UserCenter.Unbound"),
        show: false,
        actions: [
          {
            name: t("UserCenter.BindTwitter"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.TWITTER, LOGIN_BEHAVIOR.BIND),
          },
        ],
        changeShow: false,
        changeActions: [
          {
            name: t("UserCenter.ChangeTwitter"),
            color: DANGER_COLOR,
            callback: () => redirectToThird(LOGIN_THIRD_TYPE.TWITTER, LOGIN_BEHAVIOR.BIND),
          },
        ],
        onClick() {
          if (store.state.auth.twitter.openId) {
            state.twitter.changeShow = true;
          } else {
            state.twitter.show = true;
          }
        },
      },
      deleteAccount: {
        show: false,
        actions: [{ name: "Remove", color: DANGER_COLOR }],
      },
    });

    return {
      ...toRefs(state),
      hanldChangeEmail,
      hanldChangePhone,
      hanldChangePassWord,
    };
  },
};
</script>
