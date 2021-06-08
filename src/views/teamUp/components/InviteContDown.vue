<template>
  <div class="invite-count-down">
    <div class="invite-count-down__wrapper">
      {{ $t("TeamUp.Deadline") }}
      <van-count-down
        class="invite-count-down__time"
        :time="timeStamp"
        format="DD:HH:mm:ss"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InviteContDown",
  props: {
    timeStamp: [String, Number]
  }
};
</script>

<style lang="less" scoped>
.invite-count-down {
  margin: 18px 0;
  display: flex;
  justify-content: center;
  &__wrapper {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 16px;
    border-radius: 2px 16px;
    color: @color-light;
  }

  &__time {
    display: inline-block;
    color: @color-light;
  }
}
</style>
