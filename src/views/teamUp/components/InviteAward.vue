<template>
  <div class="invite-award">
    <p
      class="invite-award__title"
      :style="{ marginBottom: awardList.length > 0 ? '20px' : 0 }"
      v-html="$t('TeamUp.TeamUpCompleted', { msg: completeTeams })"
    ></p>
    <!-- Completed <span class="invite-award__complete-teams">{{ completeTeams }}</span> Teams -->
    <!-- v-html="$t('TeamUp.TeamUpCompleted', { msg: completeTeams })" -->

    <template v-for="award in awardList" :key="award.id">
      <div class="invite-award__item clearfix">
        <div class="invite-award__condition">
          {{ $t("TeamUp.TeamUpTimes", { num: award.times }) }}
        </div>
        <div class="invite-award__award-wrapper">
          <div>
            <van-row type="flex" align="center">
              <template v-if="award.isIntegral">
                <svg-icon name="checked" size="28" style="padding: 8px" />
              </template>
              <template v-else>
                <van-image
                  height="44"
                  width="44"
                  radius="4"
                  :src="award.image"
                  alt="award"
                />
              </template>
              <div class="invite-award__name">{{ award.name }}</div>
            </van-row>
            <van-row>
              <div class="invite-award__stock">
                {{ $t("TeamUp.copiesLeft", { num: award.stock }) }}
              </div>
            </van-row>
          </div>
          <div>
            <template v-if="completeTeams >= award.times">
              <te-button
                class="invite-award__button"
                color="linear-gradient(270deg, #FFE259 0%, #FAF102 100%)"
                type="warning"
                size="small"
                round
                dark
                :disabled="isDisabledButton(award.status, award.type)"
                :loading="award.loading"
                @click="onClick(award)"
              >
                {{ $t(buttonText(award.status, award.type)) }}
              </te-button>
            </template>
            <template v-else>
              <div class="invite-award__not-complete">
                {{
                  $t("TeamUp.teamsLeft", { num: award.times - completeTeams })
                }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { receiveAward } from "@/apis";
import { alertBrandCenterAxiosError } from "@/utils";
import { useRouter } from "vue-router";
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";

export default {
  name: "InviteAward",
  props: {
    // 组队完成次数
    completeTeams: { type: Number, default: 0 },
    // 奖励列表
    awardList: { type: Array, required: true },
    // 活动结束
    isEnd: Boolean
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { t } = useI18n();
    const onClick = async award => {
      const { awardId: id, status, type } = award;
      const isReceived = status === 2;
      const isExpired = status === 4;

      if (isExpired) return;
      if (isReceived) {
        switch (type) {
          case "coupon":
            return router.push({ name: "Assets", hash: "#coupon" });
          case "integral":
            return;
          case "entity":
            return router.push({ name: "Assets", hash: "#product" });
        }
      } else {
        try {
          award.loading = true;
          await receiveAward(id);
          emit("refresh");
          Dialog.alert({
            message: t("TeamUp.SuccessfullyReceivedAward")
          });
        } catch (e) {
          award.loading = false;
          alertBrandCenterAxiosError(e);
        }
      }
    };

    const isDisabledButton = (status, type) => {
      const isReceived = status === 2;
      const isExpired = status === 4;
      if (isExpired) return true;
      switch (type) {
        case "coupon":
          return false;
        case "integral":
          return isReceived;
        case "entity":
          return false;
      }
    };

    const buttonText = (status, type) => {
      const isReceived = status === 2;
      if (!isReceived) return "TeamUp.GET";
      switch (type) {
        case "coupon":
          return "TeamUp.ViewAward";
        case "integral":
          return "TeamUp.Received";
        case "entity":
          return "TeamUp.ViewAward";
      }
    };

    return {
      onClick,
      isDisabledButton,
      buttonText
    };
  }
};
</script>

<style lang="less" scoped>
.invite-award {
  background: @color-light;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.04);

  &__item {
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__complete-teams {
    color: @color-danger;
  }

  &__condition {
    font-size: 12px;
    line-height: 44px;
    width: 80px;
    // padding-top: 10px;
  }

  &__name {
    margin-left: 12px;
    font-size: 14px;
    line-height: 19px;
  }

  &__stock {
    font-size: 12px;
    line-height: 18px;
    color: @color-info;
  }

  &__award-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &__button {
    margin-top: 8px;
    height: 28px;
    min-width: 68px;
    font-weight: normal;
  }

  &__not-complete {
    line-height: 44px;
    font-size: 14px;
    color: @color-info;
  }

  &__title {
    //margin: 0 0 20px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.7px;
    color: #0e1117;
  }
}
</style>
