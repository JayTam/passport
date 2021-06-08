<template>
  <div class="invite-team">
    <div class="invite-team__title">{{ title }}</div>
    <div class="invite-team__wrapper">
      <div class="invite-team--left">
        <template v-for="(avatar, index) in avatars" :key="avatar">
          <div class="invite-team__avatar-wrapper">
            <van-image
              class="invite-team__avatar"
              :src="avatar"
              alt="avatar"
              round
            />
            <svg-icon
              v-if="index === 0"
              class="invite-team__crown"
              name="master"
              size="18"
            />
          </div>
        </template>
        <!--   邀请人数未满显示     -->
        <div v-if="isUnCompleted" class="invite-team__avatar-empty"></div>
      </div>
      <div class="invite-team--right">
        <te-button
          class="invite-team__button"
          round
          @click="onClick"
          v-bind="buttonAttrs"
        >
          {{ $t(buttonText) }}
        </te-button>
      </div>
    </div>
  </div>
  <invite-popup v-model:show="showInvitePopup" :url="inviteUrl" />
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import SvgIcon from "@/components/SvgIcon";
import InvitePopup from "@/views/teamUp/components/InvitePopup";
import { alertBrandCenterAxiosError, generateTeamUpUrl } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { receiveBaseTeamUpAward } from "@/apis";
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";

export default {
  name: "InviteTeamItem",
  components: { InvitePopup, SvgIcon },
  // 邀请和领奖
  emits: ["invite", "receive", "refresh"],
  props: {
    id: [String, Number],
    // 组队头像列表
    avatars: { type: Array, default: () => ["1", "2"] },
    // 组队的标题
    title: String,
    // 奖品类型
    type: { type: String },
    // 奖品状态。0 未达标，1 待领取，2 已领取，4 已过期
    status: { type: Number },
    // 是否只有积分奖励
    isOnlyIntegralAward: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const t = useI18n();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      showInvitePopup: false,
      inviteUrl: "",
      loading: false
    });
    const id = route.params.id;
    // 奖品未达标
    const isUnCompleted = computed(() => props.status === 0);
    // 奖品是否待领取
    const isCompleted = computed(() => props.status === 1);
    // 奖品是否已领取
    const isReceived = computed(() => props.status === 2);
    // 奖品是否过期
    const isExpired = computed(() => props.status === 4);
    const buttonAttrs = computed(() => ({
      dark: true,
      color: "linear-gradient(270deg, #FFE259 0%, #FAF102 100%)",
      loading: state.loading,
      disabled:
        isExpired.value || (props.isOnlyIntegralAward && isReceived.value)
    }));
    const buttonText = computed(() => {
      if (isUnCompleted.value) return "TeamUp.InviteFriends";
      if (isCompleted.value) return "TeamUp.ReceiveAward";
      return props.isOnlyIntegralAward ? "TeamUp.Received" : "TeamUp.ViewAward";
    });

    const onClick = async () => {
      if (isReceived.value && !props.isOnlyIntegralAward) {
        return router.push({ name: "Assets" });
      } else if (isCompleted.value) {
        // 刷新数据
        try {
          state.loading = true;
          await receiveBaseTeamUpAward(props.id);
          emit("refresh");
          Dialog.alert({
            message: t("TeamUp.SuccessfullyReceivedAward")
          });
        } catch (e) {
          alertBrandCenterAxiosError(e);
        } finally {
          state.loading = false;
        }
      } else {
        // 生成邀请链接
        state.showInvitePopup = true;
        state.inviteUrl = await generateTeamUpUrl(id, props.id);
        // 生成海报图片
        emit("invite");
      }
    };
    return {
      ...toRefs(state),
      buttonAttrs,
      onClick,
      buttonText,
      isUnCompleted
    };
  }
};
</script>

<style lang="less" scoped>
.invite-team {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 22px;

  &__title {
    font-size: 14px;
    color: @color-light;
    margin-bottom: 11px;
  }

  &--left {
    display: flex;
    flex-flow: row nowrap;
    width: 60%;
    overflow-x: auto;
  }

  &__wrapper {
    display: flex;
    padding: 0 0 0 16px;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 1000px;
    height: 58px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    );
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.04);
    font-size: 0;
  }

  &__avatar-wrapper {
    position: relative;
    margin-right: 12px;
  }

  &__avatar {
    width: 44px;
    height: 44px;
  }

  &__crown {
    position: absolute;
    top: -4px;
    right: -4px;
  }

  &__avatar-empty {
    width: 44px;
    height: 44px;
    background: rgba(94, 94, 94, 0.101399);
    border: 1px dashed rgba(0, 0, 0, 0.0985031);
    box-sizing: border-box;
    border-radius: 50%;
    color: @color-info;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  &__button {
    height: 58px;
  }
}
</style>
