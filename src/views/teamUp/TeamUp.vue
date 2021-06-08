<template>
  <div v-if="!loading" class="team-up">
    <div class="team-up__bg" :style="backgroundStyles"></div>
    <div class="team-up__wrapper">
      <p class="team-up__title">{{ title }}</p>

      <te-button
        class="team-up__rule"
        type="warning"
        color="rgba(255, 255, 255, 0.2)"
        @click="onOpenRuleDialog"
      >
        {{ $t("TeamUp.Rules") }}
      </te-button>

      <invite-cont-down :time-stamp="teamUpEndTime" />

      <invite-team-item
        v-for="team in teamList"
        :key="team.id"
        v-bind="team"
        @refresh="fetchData(false)"
      />

      <invite-award
        :award-list="awardList"
        :complete-teams="completedTeamUpTimes"
        :is-end="isActivityEnd"
        @refresh="fetchData(false)"
      />

      <invite-create-button
        class="team-up__initiate"
        :times="remainingTeamUpTimes"
        :loading="createTeamLoading"
        :is-end="isActivityEnd"
        @click="onCreateTeam"
      />
    </div>
  </div>
  <login-popup v-model:show="showLoginPopup" v-model:type="loginPopupType" />
</template>

<script>
import InviteTeamItem from "@/views/teamUp/components/InviteTeamItem";
import InviteAward from "@/views/teamUp/components/InviteAward";
import InviteContDown from "@/views/teamUp/components/InviteContDown";
import { computed, onMounted, reactive, toRefs } from "vue";
import InviteCreateButton from "@/views/teamUp/components/InviteCreateButton";
import TeButton from "@/components/Button";
import { createActiveTeamUp, getSingleTeamUp, joinTeamUp } from "@/apis";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import LoginPopup from "@/views/auth/components/LoginPopup";
import { Dialog } from "vant";
import router from "@/router";
import { alertBrandCenterAxiosError } from "@/utils";
import { useI18n } from "vue-i18n";

export default {
  name: "TeamUp",
  components: {
    LoginPopup,
    TeButton,
    InviteCreateButton,
    InviteContDown,
    InviteAward,
    InviteTeamItem
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { t } = useI18n();

    // 组队活动id
    const id = route.params.id;
    const state = reactive({
      awardList: [
        {
          id: 0,
          // 完成任务需要多少次
          times: 3,
          // 库存量
          stock: 100,
          // 展示图片
          image: "https://t7.baidu.com/it/u=1035726655,1110652804&fm=193&f=GIF",
          // 展示标题
          name: "Kindle",
          // 是否已经完成任务
          isCompleted: true,
          // 是否已经领取过奖品
          isReceived: true
        }
      ],
      // 背景
      background: "",
      // 组队列表
      teamList: [],
      // 标题
      title: "",
      // 剩余组队次数
      remainingTeamUpTimes: 0,
      // 已完成组队次数
      completedTeamUpTimes: 0,
      // 组队结束时间
      teamUpEndTime: 0,
      // 发起组队活动按钮的加载
      createTeamLoading: false,
      // 活动是否已经结束了
      isActivityEnd: computed(() => state.teamUpEndTime <= 0),
      // 页面初始化数据加载loading
      loading: false,
      // 显示登陆弹框
      showLoginPopup: false,
      // 登陆弹框类型，是登陆还是注册
      loginPopupType: "login",
      // 活动规则
      rules: []
    });

    const backgroundStyles = computed(() => {
      return {
        backgroundImage: state.background
          ? `url(${state.background})`
          : undefined
      };
    });

    const fetchData = async (withLoadingStatus = true) => {
      if (withLoadingStatus) state.loading = true;
      const response = await getSingleTeamUp(id);
      const data = response.data.data;
      state.teamUpEndTime =
        new Date(data.end_at).valueOf() - new Date().valueOf();
      state.background = data.background;
      state.title = data.name;
      state.remainingTeamUpTimes = data.remain_times;
      state.completedTeamUpTimes = data.active_team_ups_count;
      state.rules = data.rules;
      // 是否只有积分奖励
      const isOnlyIntegralAward =
        data.basic_rewards.filter(
          ({ rewardable_type }) => rewardable_type === "score"
        ).length === data.basic_rewards.length;
      // 组队
      state.teamList = data.active_team_ups?.map(
        ({ id, captain_user, received, members }) => {
          const team = {};
          team.id = id;
          team.title = data.title;
          team.avatars = [
            captain_user.avatar,
            ...members.map(({ avatar }) => avatar)
          ];
          team.status = received;
          team.isOnlyIntegralAward = isOnlyIntegralAward;
          return team;
        }
      );
      // 组队额外奖励
      state.awardList = data.rewards
        .filter(({ is_extra }) => is_extra)
        .sort(
          (award1, award2) =>
            award1.conditions.successCount - award2.conditions.successCount
        )
        .map(
          ({
            extraRemains,
            rewardable_type,
            couponPool,
            score,
            entity,
            conditions,
            id,
            award_record_id,
            received
          }) => {
            const award = {
              isIntegral: false
            };
            // 积分｜优惠卷 ｜实体商品
            switch (rewardable_type) {
              // 优惠卷
              case "coupon_pools":
                award.image = couponPool.logo;
                award.name = couponPool.name;
                award.type = "coupon";
                break;
              // 积分
              case "score":
                // award.image = couponPool.logo;
                award.isIntegral = true;
                award.name = score + " point";
                award.type = "integral";
                break;
              // 实体商品
              case "mall_commodities":
                award.image = entity?.photos?.[0]?.image;
                award.name = entity?.title;
                award.type = "entity";
            }
            award.id = id;
            // 包含领奖id和状态的奖品信息
            award.awardId = award_record_id;
            award.status = received;
            award.stock = extraRemains;
            award.times = conditions?.successCount;
            award.loading = false;
            return award;
          }
        );
      if (withLoadingStatus) state.loading = false;
    };

    const onCreateTeam = async () => {
      if (store.getters["user/isLogin"]) {
        state.createTeamLoading = true;
        await createActiveTeamUp(id);
        Dialog.alert({
          message: t("TeamUp.linkCopiedInvite")
        });
        await fetchData(false);
        state.createTeamLoading = false;
      } else {
        state.showLoginPopup = true;
      }
    };

    /**
     * 活动规则Dialog
     **/
    const onOpenRuleDialog = async () => {
      await Dialog.alert({
        title: t("TeamUp.Rules"),
        allowHtml: true,
        messageAlign: "left",
        message: `<ol style="list-style: decimal;line-height: 0.4;padding: 0 0 0 20px;">
                    ${state.rules
                      .map(
                        rule => `<li style="line-height: 22px;">${rule}</li>`
                      )
                      .reduce((x1, x2) => x1 + x2, "")}
                  </ol>`
      });
    };

    fetchData();

    /**
     * 参加组队活动相关逻辑
     */
    function useJoinTeamUp() {
      if (route.name !== "JoinTeamUp") return;
      // 整个组队活动的ID
      const id = route.params.id;
      // 单次组队的ID
      const teamId = route.params.teamId;
      if (store.getters["user/isLogin"]) {
        joinTeamUp(id, teamId)
          .then(() => {
            fetchData();
            Dialog({ message: t("TeamUp.TeamUpSuccess") });
          })
          .catch(error => {
            alertBrandCenterAxiosError(error);
          })
          .finally(() => {
            router.push({ name: "TeamUp", params: { id } });
          });
      } else {
        onMounted(() => (state.showLoginPopup = true));
      }
      return {};
    }

    return {
      fetchData,
      ...toRefs(state),
      backgroundStyles,
      onCreateTeam,
      onOpenRuleDialog,
      ...useJoinTeamUp()
    };
  }
};
</script>

<style lang="less" scoped>
.team-up {
  &__bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-image: linear-gradient(180deg, #fcc687 0%, #ff7f7f 100%),
      linear-gradient(0deg, #ffe259 0%, #faf102 100%);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__wrapper {
    position: relative;
    padding: 56px 8px;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: transparent;
    z-index: 1;
  }

  &__title {
    margin: auto;
    width: 70%;
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    line-height: 43px;
    letter-spacing: 1.61538px;
    color: @color-light;
  }

  &__rule {
    position: absolute;
    right: 0;
    margin: 0 !important;
    top: 20px;
    border: none;
    border-radius: 16px 0 0 16px;
    height: 32px;
    width: 100px;
  }

  &__initiate {
    margin: 30px auto 0 auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
