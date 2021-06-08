<template>
  <div class="reputation">
    <te-header :title="$t('UserCenter.Reputation')" background="#fff" border>
      <template v-slot:right>
        <svg-icon name="doubt" size="20"></svg-icon>
      </template>
    </te-header>
    <div class="content">
      <div class="upper">
        <div class="upper__left">
          <span class="upper__left__point">{{ reputation }}</span>
          <span class="uuper__left__unit">{{ $t("UserCenter.REP") }}</span>
        </div>
        <div class="upper__right" @click="goToHis">
          {{ $t("UserCenter.History") }}
        </div>
      </div>
      <div class="part"></div>
      <div class="below">
        <div class="below__progress">
          <van-progress
            :show-pivot="showPivot"
            color="#569EEB"
            track-color="#F6F6F6"
            stroke-width="8"
            :percentage="reqPercentage"
          />
        </div>
        <div class="below__progress-text">
          <span class="below__progress-text__pre"> {{ reputation }} </span>/{{
            vipInfo.max
          }}
        </div>
        <div class="below__level">LV.{{ parseInt(level) + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Reputation",
  data() {
    return {
      showPivot: false
    };
  },
  computed: {
    // 声望值百分比
    reqPercentage() {
      return this.reputation > this.vipInfo.max
        ? 100
        : (this.reputation / this.vipInfo.max) * 100;
    },
    ...mapGetters("user", ["reputation", "vipInfo", "level"])
  },
  methods: {
    goToHis() {
      this.$router.push({ name: "ReputationHistory" });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  margin: 12px auto 0;
  width: 94vw;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
}

.reputation {
  background: @color-background;
  height: 100vh;

  .content {
    .box();

    .upper {
      height: 63px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .upper__left {
        &__point {
          padding-right: 6px;
          font-size: 28px;
          font-weight: 600;
        }

        &__unit {
          font-size: 16px;
          font-weight: 400;
        }
      }

      .upper__right {
        font-size: 12px;
        font-weight: 600;
        color: #000000;
        border-bottom: 1px solid #000000;
      }
    }

    .part {
      height: 1px;
      width: 90%;
      margin: 0 auto;
      border-bottom: 1px solid rgba(216, 216, 216, 0.2);
    }

    .below {
      height: 53px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-size: 12px;

      .below__progress {
        flex-grow: 1;
        padding-right: 10px;
      }

      .below__progress-text {
        &__pre {
          color: #569eeb;
        }

        padding-right: 14px;
      }
    }
  }
}
</style>
