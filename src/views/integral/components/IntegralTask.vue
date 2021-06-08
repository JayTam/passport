<template>
  <te-card class="task">
    <template v-for="task in tasks" :key="task.id">
      <van-cell :title="task.name" label="12" center>
        <template #label>
          <span class="task__integral">{{ task.integral }}</span>
          <span class="task__unit">{{ $t("Integral.point") }}</span>
        </template>
        <template #extra>
          <te-button
            class="task__button"
            :type="task.isDone ? 'info' : 'warning'"
            size="small"
            :disabled="task.isDone"
            plain
            round
            @click="todoTask(task.to)"
          >
            {{ task.isDone ? $t("Integral.Done") : task.todoName }}
          </te-button>
        </template>
      </van-cell>
    </template>
  </te-card>
</template>
<script>
import TeCard from "@/views/components/TeCard";
import TeButton from "@/components/Button";
import { useRouter } from "vue-router";

export default {
  name: "IntegralTask",
  components: { TeButton, TeCard },
  props: {
    tasks: Array
  },
  setup() {
    const router = useRouter();
    const todoTask = to => {
      if (to.name) {
        router.push(to);
      }
    };

    return {
      todoTask
    };
  }
};
</script>
<style scoped lang="less">
.task {
  padding: 0;

  &__integral {
    font-size: 14px;
    font-weight: bold;
    color: #735400;
  }

  &__unit {
    margin-left: 5px;
    color: #735400;
  }

  &__button {
    width: 70px;
  }
}
</style>
