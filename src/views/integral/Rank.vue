<template>
  <div class="rank">
    <te-header title="Ranking" background="#ffffff" />
    <div class="content">
      <div class="content-item content-item--user">
        <div class="item-left">
          <span class="item-left__rank">
            <svg-icon name="r-first" size="30"></svg-icon>
          </span>
          <img class="item-left__pic" src="@/assets/imgs/user-portrait.png" />
          <span class="item-left__name">
            Roobot
          </span>
        </div>
        <div class="item-right">
          <div class="item-right__point">
            99
          </div>
          <div class="item-right__unit">
            points
          </div>
        </div>
      </div>
      <div class="content-item" v-for="(rank, index) in rankList" :key="index">
        <div class="item-left">
          <span class="item-left__rank" v-html="rank.rank"> </span>
          <img class="item-left__pic" :src="rank.pic" />
          <span class="item-left__name">
            {{ rank.userName }}
          </span>
        </div>
        <div class="item-right">
          <div class="item-right__point">
            {{ rank.point }}
          </div>
          <div class="item-right__unit">
            points
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rank",
  data() {
    return {
      rankList: [
        {
          rankId: 99,
          rank: '<svg-icon name="r-first" size="20"></svg-icon>',
          pic: require("@/assets/imgs/user-portrait.png"),
          point: "9999",
          userName: "Alan"
        },
        {
          rankId: 99,
          rank: '<svg-icon name="r-second" size="20"></svg-icon>',
          pic: require("@/assets/imgs/user-portrait.png"),
          point: "99999",
          userName: "Alan"
        },
        {
          rankId: 99,
          rank: '<svg-icon name="r-third" size="20"></svg-icon>',
          pic: require("@/assets/imgs/user-portrait.png"),
          point: "9999",
          userName: "Alan"
        },
        {
          rankId: 99,
          rank: 4,
          pic: require("@/assets/imgs/user-portrait.png"),
          point: "9999",
          userName: "Alan"
        },
        {
          rankId: 99,
          rank: 5,
          pic: require("@/assets/imgs/user-portrait.png"),
          point: "999",
          userName: "Alan"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
.rank {
  background: @color-background;
  .content-item {
    display: flex;
    padding: 0 12px 0 18px;
    justify-content: space-between;
    margin: 8px auto;
    box-sizing: border-box;
    width: 96vw;
    height: 68px;
    background: @color-light;
    border-radius: 12px;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.04);
    .item-left {
      display: flex;
      align-items: center;
      &__pic {
        width: 48px;
        height: 48px;
        margin: 0 10px;
        border-radius: 50%;
      }
      &__name {
        font-size: 400;
      }
    }
    .item-right {
      display: flex;
      align-items: center;
      color: #735400;
      &__point {
        margin-right: 6px;
        font-size: 22px;
      }
      &__unit {
        font-size: 12px;
      }
    }
  }
  .content-item--user {
    height: 98px;
    background: linear-gradient(270deg, #ffe259 0%, #faf102 100%);
  }
}
</style>
