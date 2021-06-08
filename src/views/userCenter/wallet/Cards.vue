<template>
  <div class="cards">
    <te-header
      :title="$t('UserCenter.MembershipCards')"
      background="#fff"
      border
    />
    <div class="card-list">
      <div class="card__item">
        <div class="item-left">
          <img class="item-left__img" :src="avatar" />
          <div class="left-info">
            <div class="left-info__name">
              {{ name || "Wook" }}
            </div>
            <div class="left-info__level">
              {{ level ? "lv." + level : "lv.1" }}
            </div>
          </div>
        </div>
        <div class="item-right">
          <span class="item-right__point">{{ integral }}</span>
          <span class="item-right__unit">{{ $t("UserCenter.points") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cards",
  computed: {
    ...mapGetters("user", ["level", "integral", "avatar", "name"])
  }
};
</script>

<style scoped lang="less">
.cards {
  background: @color-background;

  .card__item {
    box-sizing: border-box;
    width: 94vw;
    margin: 25px auto;
    padding: 12px;
    height: 88px;
    display: flex;
    justify-content: space-between;
    border-radius: 12px;
    background: linear-gradient(140.55deg, #edde5d -31.46%, #f09819 135.93%);

    .item-left {
      display: flex;
      align-items: center;

      .item-left__img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .left-info {
        padding-left: 10px;
        vertical-align: middle;
        color: #735400;

        &__name {
          padding-bottom: 2px;
          font-size: 16px;
          font-weight: 600;
        }

        &__level {
          padding: 4px 0;
          text-align: center;
          font-size: 0.1em;
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.4);
        }
      }
    }

    .item-right {
      vertical-align: middle;
      color: #735400;
      display: flex;
      align-items: center;

      &__point {
        padding-right: 6px;
        font-size: 22px;
        font-weight: 600;
      }

      &__unit {
        font-size: 12px;
      }
    }
  }
}
</style>
