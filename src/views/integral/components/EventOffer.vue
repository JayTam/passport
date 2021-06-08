<template>
  <te-card class="event">
    <van-cell center>
      <template #icon>
        <div class="event__logo">
          <svg-icon name="user-icon" size="16"></svg-icon>
        </div>
      </template>
      <template #default>
        <div class="event__title">
          {{ $t("Integral.InviteFriends") }}
        </div>
      </template>
      <template #extra>
        <te-button
          class="event__button"
          type="warning"
          size="small"
          plain
          round
          @click="Myjump"
        >
          {{ $t("Integral.invite") }}
        </te-button>
      </template>
    </van-cell>
  </te-card>
</template>
<script>
import TeCard from "@/views/components/TeCard";
import TeButton from "@/components/Button";
import SvgIcon from "@/components/SvgIcon";
export default {
  name: "EventOffer",
  components: { SvgIcon, TeButton, TeCard },
  methods: {
    Myjump() {
      location.href = "https://test.mms.tevo.online/team_up/69";
    }
  }
};
</script>
<style scoped lang="less">
.event {
  padding: 0;
  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: linear-gradient(0deg, #ffe259 0%, #faf102 100%);
  }
  &__title {
    font-size: 14px;
    font-weight: 400;
  }
  &__button {
    width: 70px;
  }
}
</style>
