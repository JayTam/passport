<template>
  <te-header :title="pageTitle" background="#fff" border>
    <template #right>
      <svg-icon name="doubt" size="20"></svg-icon>
    </template>
  </te-header>
  <div class="history">
    <div class="content">
      <van-cell
        :title="item.body"
        :label="item.created_at"
        center
        v-for="(item, index) in list"
        :key="index"
      >
        <template #extra>
          <p class="history__num">
            <span v-if="item.type === 1">+</span><span v-else>-</span
            >{{ item.amount }}
          </p>
        </template>
      </van-cell>
      <div
        v-show="loading"
        style="position: relative; height: 50px;width: 100%;"
      >
        <te-loading color="#000"></te-loading>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, toRefs } from "vue";
import { getIntegralHistory } from "@/apis/user";
import { formatTime } from "@/utils";
import TeLoading from "@/components/Loading";
import useInfiniteScroll from "@/composables/useInfiniteScroll";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

export default {
  name: "ReputationHistory",
  components: { TeLoading },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const state = reactive({
      list: [],
      loading: false,
      listQuery: {
        page: 1,
        page_size: 15,
        total: 0,
        type: route.name === "IntegralHistory" ? undefined : 1
      },
      pageTitle: computed(() =>
        route.name === "IntegralHistory"
          ? t("UserCenter.IntegralHistory")
          : t("UserCenter.REP_History")
      )
    });
    const isLoadCompleted = computed(() => {
      if (state.list.length === 0) return false;
      return state.list.length >= state.listQuery.total;
    });

    const getHistory = async function() {
      if (state.loading) return;
      if (!isLoadCompleted.value) {
        state.loading = true;
        const res = await getIntegralHistory(state.listQuery);
        const data = res.data.data;
        state.listQuery.total = data.total;
        data.data.forEach(item => {
          item.created_at = formatTime(item.created_at, "yyyy-MM--dd");
        });
        state.list = [...state.list, ...data.data];
        state.listQuery.page += 1;
        state.loading = false;
      }
    };
    useInfiniteScroll(getHistory);
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style scoped lang="less">
.history {
  min-height: 100vh;
  background: @color-background;

  &__num {
    font-weight: bold;
  }
}
</style>
