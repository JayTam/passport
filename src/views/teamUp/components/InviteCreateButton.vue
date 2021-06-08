<template>
  <div class="invite-create">
    <div class="invite-create__tips">
      <template v-if="isEnd">{{ $t("TeamUp.TheActivityIsOver") }}</template>
      <template v-else>
        {{ $t("TeamUp.teamLeftToday", { num: times }) }}</template
      >
      <div class="invite-create__triangle"></div>
    </div>

    <te-button
      class="invite-create__button"
      color="linear-gradient(0deg, #faf102, #faf102)"
      @click="$emit('click')"
      :loading="loading"
      :disabled="isEnd || times === 0"
      dark
      round
    >
      {{ $t("TeamUp.START") }}
    </te-button>

    <te-button
      class="invite-create__rewards-button"
      :to="{ name: 'Assets' }"
      round
    >
      {{ $t("TeamUp.Rewards") }}
    </te-button>
    <te-button
      class="invite-create__personal-button"
      :to="{ name: 'Home' }"
      round
    >
      {{ $t("TeamUp.Home") }}
    </te-button>
  </div>
</template>

<script>
import TeButton from "@/components/Button";
export default {
  name: "InviteCreateButton",
  components: { TeButton },
  emits: ["click"],
  props: {
    // 还能参加几次
    times: Number,
    loading: Boolean,
    // 活动是否结束
    isEnd: Boolean
  }
};
</script>

<style lang="less" scoped>
.invite-create {
  width: 100%;
  text-align: center;
  position: relative;

  &__triangle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% - 1px);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid @color-light;
    z-index: 1;
  }

  &__tips {
    position: relative;
    margin: auto;
    padding: 12px;
    width: 70%;
    line-height: 20px;
    background: @color-light;
    box-sizing: border-box;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    color: #fa5555;
  }

  &__button {
    margin-top: 20px;
    width: 80px;
    height: 80px;
    color: @color-text;
    font-weight: normal;
    text-align: center;
    margin-right: 0 !important;
  }

  &__rewards-button,
  &__personal-button {
    margin: 0 !important;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 120px;
    width: 52px;
    height: 52px;
    line-height: 16px;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    color: @color-light;
    font-weight: normal;
    white-space: normal;
  }

  &__rewards-button {
    top: 50px;
  }
}
</style>
