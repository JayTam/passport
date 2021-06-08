<template>
  <te-card class="daily-checkin">
    <div class="daily-checkin__title">
      {{ $t("Integral.Check", { consecutiveCheckinDays }) }}
    </div>

    <div class="daily-checkin__check">
      <template v-for="(checkin, index) in checkinList" :key="index">
        <integral-icon
          :active="checkin.isCheck"
          :time="checkin.checkDate"
          :integral="checkin.checkPoint"
        />
      </template>
    </div>

    <te-button
      class="daily-checkin__button"
      @click="onCheckin"
      type="warning"
      :loading="loading"
      dark
      block
      round
    >
      {{ $t("Integral.CheckIn") }}
    </te-button>

    <div class="award">
      <div class="award__item" v-for="task in checkinTasks" :key="task.id">
        <div class="award__item-left">
          <div class="award__condition">
            {{ task.totalDays }} {{ $t("Integral.days") }}
          </div>
          <integral-icon active />
          <div class="award__point">
            {{ task.point }} {{ $t("Integral.points") }}
          </div>
        </div>
        <div class="award__item-right">
          <te-button
            class="award__button"
            :class="{ 'award__button--active': task.isCompleted }"
            size="small"
            :disabled="!task.isCompleted"
            :loading="task.loading"
            @click="onGetCheckinAward(task)"
            dark
          >
            {{
              task.isCompleted
                ? $t("Integral.Get")
                : $t("Integral.Days", { day: task.resetDays })
            }}
          </te-button>
        </div>
      </div>
    </div>
  </te-card>
</template>
<script>
import TeCard from "@/views/components/TeCard";
import IntegralIcon from "@/views/integral/components/IntegralIcon";
import TeButton from "@/components/Button";
import {
  checkin,
  getCheckinAward,
  getCheckinHistory,
  getCheckinTask
} from "@/apis";
import { reactive, toRefs } from "vue";
import { toastBrandCenterAxiosError } from "@/utils";
import { Toast } from "vant";
import { useStore } from "vuex";

/**
 * @typedef checkinTask 签到任务
 * @type {Object}
 * @property {string} id 任务id
 * @property {boolean} isCompleted 是否已完成任务
 * @property {number} resetDays 还剩多少天未完成
 * @property {number} totalDays 总共需要签到天数
 * @property {number} point 完成任务积分奖励
 * @property {boolean} loading 加载状态
 */

/**
 * @typedef checkin 签到
 * @type {Object}
 * @property {string} checkDate 签到时间
 * @property {boolean} isCheck 是否已签到
 * @property {number} checkPoint 签到积分奖励
 */

export default {
  name: "DailyCheckIn",
  components: { TeButton, IntegralIcon, TeCard },
  setup() {
    const store = useStore();
    const state = reactive({
      /** @type {Array<checkin>} 签到列表 */
      checkinList: [],
      /** @type {Array<checkinTask>} 签到任务列表 */
      checkinTasks: [],
      /** @type {number} 总共签到天数 */
      checkinDays: 0,
      /** @type {number} 连续签到天数 */
      consecutiveCheckinDays: 0,
      loading: false
    });

    const fetchData = async () => {
      // 并发请求
      const checkinRequest = getCheckinHistory();
      const checkinTaskRequest = getCheckinTask();
      const checkinResponse = await checkinRequest;
      const checkinTaskResponse = await checkinTaskRequest;
      // 组装数据
      const checkinData = checkinResponse.data.data;
      state.checkinList = checkinData.signList.map(item => {
        const checkin = {};
        checkin.checkDate = item.today ? "Today" : item.date;
        checkin.isCheck = item.is_sign;
        checkin.checkPoint = item.score;
        return checkin;
      });
      state.checkinDays = checkinData.total;
      const checkinTaskData = checkinTaskResponse.data.data;
      state.consecutiveCheckinDays = checkinData.signDay;
      state.checkinTasks = checkinTaskData.rules.map(item => {
        const task = {};
        task.id = item.ad_id;
        task.isCompleted = item.completed;
        task.totalDays = item.days;
        task.resetDays = item.days - state.checkinDays;
        task.point = item.score;
        task.loading = false;
        return task;
      });
    };

    const onCheckin = async () => {
      try {
        state.loading = true;
        await checkin();
        await fetchData();
        await store.dispatch("user/getIntegralInfo");
        Toast.success("签到成功");
      } catch (e) {
        toastBrandCenterAxiosError(e);
      } finally {
        state.loading = false;
      }
    };

    const onGetCheckinAward = async task => {
      try {
        task.loading = true;
        await getCheckinAward(task.id);
      } catch (e) {
        toastBrandCenterAxiosError(e);
      } finally {
        task.loading = false;
      }
    };

    fetchData();
    return {
      ...toRefs(state),
      onCheckin,
      onGetCheckinAward
    };
  }
};
</script>
<style scoped lang="less">
.common-button--small {
  width: 68px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  border-radius: 14px;
}

.daily-checkin {
  padding: 0 12px;

  &__title {
    padding: 11px 0;
    text-align: center;
    font-size: 12px;
  }

  &__button {
    border: none;
    background: linear-gradient(270deg, #ffe259 0%, #faf102 100%);
  }

  &__check {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .award {
    padding: 30px 0;

    .award__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;

      &-left {
        display: flex;
        align-items: center;
      }
    }

    &__condition {
      font-size: 0.1em;
      width: 65px;
    }

    &__point {
      margin-left: 10px;
      font-size: 14px;
    }

    &__button {
      width: 100px;
      border: none;
      font-weight: normal;

      &--active {
        font-weight: bold;
        background: linear-gradient(270deg, #ffe259 0%, #faf102 100%);
      }
    }
  }
}
</style>
