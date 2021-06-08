<template>
  <te-header :title="$t('Integral.Offers')" background="#fff" />
  <div class="offers">
    <div class="title">
      {{ $t("Integral.DailyCheckIn") }}
    </div>
    <daily-check-in />
    <div class="title">
      {{ $t("Integral.EventOffers") }}
    </div>
    <event-offer></event-offer>
    <div class="title">
      {{ $t("Integral.OffersForNewMembers") }}
    </div>
    <integral-task :tasks="tasks" />
  </div>
</template>
<script>
import DailyCheckIn from "./components/DailyCheckIn";
import EventOffer from "./components/EventOffer";
import IntegralTask from "./components/IntegralTask";
import { reactive, toRefs } from "vue";
import { getNewMemberTasks } from "@/apis";
import { useI18n } from "vue-i18n";

export default {
  name: "Offers",
  components: {
    DailyCheckIn,
    EventOffer,
    IntegralTask
  },
  setup() {
    const { t } = useI18n();
    const state = reactive({
      tasks: [
        {
          id: "avatar",
          name: t("Integral.Image"),
          integral: 0,
          isDone: true,
          to: {
            name: "Profiles"
          },
          todoName: t("Integral.Edit")
        },
        {
          id: "phone",
          name: t("Integral.Phone"),
          integral: 0,
          isDone: true,
          to: {
            name: "Profiles"
          },
          todoName: t("Integral.Edit")
        },
        {
          id: "email",
          name: t("Integral.Email"),
          integral: 0,
          isDone: true,
          to: {
            name: "Profiles"
          },
          todoName: t("Integral.Edit")
        },
        {
          id: "gender",
          name: t("Integral.Gender"),
          integral: 0,
          isDone: true,
          to: {
            name: "Profiles"
          },
          todoName: t("Integral.Edit")
        },
        {
          id: "birthday",
          name: t("Integral.Birth"),
          integral: 0,
          isDone: true,
          to: {
            name: "Profiles"
          },
          todoName: t("Integral.Edit")
        },
        {
          id: "address",
          name: t("Integral.Adderss"),
          integral: 0,
          isDone: true,
          to: {
            name: "AddressBook"
          },
          todoName: t("Integral.Edit")
        }
      ]
    });

    const fetchData = async () => {
      const newMemberTasksResponse = await getNewMemberTasks();
      const newMemberTasks = newMemberTasksResponse.data.data;
      state.tasks = state.tasks.map(task => {
        const newMemberTask = newMemberTasks.find(
          ({ name }) => name === task.id
        );
        task.integral = newMemberTask.score;
        task.isDone = newMemberTask.completed;
        return task;
      });
    };

    fetchData();
    return {
      ...toRefs(state),
      fetchData
    };
  }
};
</script>
<style scoped lang="less">
.offers {
  padding: 0 12px 20px 12px;
  min-height: 100vh;
  background: @color-background;

  .title {
    font-weight: 600;
    font-size: 14px;
    padding: 14px 0 12px 12px;
  }
}
</style>
