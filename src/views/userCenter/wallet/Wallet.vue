<template>
  <div class="wallet">
    <te-header :title="$t('UserCenter.MyWallet')" background="#fff" border />

    <van-cell-group :border="false">
      <van-cell
        :title="$t('UserCenter.MembershipCards')"
        :to="{ name: 'Cards' }"
        is-link
        :border="false"
      >
        <template #icon>
          <svg-icon name="vip-card" size="26" style="margin-right: 20px" />
        </template>
      </van-cell>

      <van-cell
        :title="$t('UserCenter.OffersGift')"
        :to="{ name: 'Assets' }"
        is-link
        :border="false"
      >
        <template #icon>
          <svg-icon
            name="offer-gift"
            size="26"
            style="margin-right: 20px"
          ></svg-icon>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: "Wallet"
};
</script>
<style scoped lang="less">
.wallet {
  background: @color-light;
}
</style>
