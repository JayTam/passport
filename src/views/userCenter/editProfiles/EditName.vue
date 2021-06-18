<template>
  <div>
    <te-header :title="$t('UserCenter.EditName')" background="#fff" border>
      <template #right>
        <te-button
          type="warning"
          dark
          size="small"
          :disabled="!active"
          :loading="isloading"
          @click="saveName"
        >
          {{ $t("UserCenter.Done") }}
        </te-button>
        <!-- <span class="done-btn" :class="{ active: active }" @click="saveName">Done</span> -->
      </template>
    </te-header>
    <van-cell-group class="name-input">
      <van-field
        v-model="name"
        placeholder="请输入用户名"
        @click-right-icon="clikClear"
        @input="changeName"
      >
        <template #right-icon>
          <svg-icon name="close" size="10"></svg-icon>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TeButton from "@/components/Button.vue";
import { toastPassportAxiosError } from "@/utils";

export default {
  name: "EditName",
  components: { TeButton },
  setup() {
    const router = useRouter();
    const store = useStore();
    let name = store.state.user.name;
    const state = reactive({
      name: name,
      active: false,
      isloading: false,
      submitFlag: true,
    });
    const clikClear = function() {
      state.name = "";
    };
    const changeName = function() {
      if (!state.active) {
        state.active = true;
      }
    };
    const saveName = async function() {
      const data = {
        id: store.state.user.uid,
        name: state.name,
      };
      if (state.submitFlag) {
        state.submitFlag = false;
        try {
          state.isloading = true;
          await store.dispatch("user/updateUserInfo", data);
          router.back();
        } catch (e) {
          toastPassportAxiosError(e);
          state.submitFlag = true;
        } finally {
          state.isloading = false;
        }
      }
    };
    return {
      ...toRefs(state),
      clikClear,
      changeName,
      saveName,
    };
  },
};
</script>

<style lang="less" scoped>
.name-input {
  background: #f7f7f7;

  .van-cell {
    background: #f7f7f7;
    padding: 15px 20px;
  }
}
</style>
