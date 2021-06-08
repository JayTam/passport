<template>
  <div>
    <te-header :title="$t('UserCenter.EditBio')" background="#fff" border>
      <template #right>
        <te-button
          type="warning"
          dark
          size="small"
          :disabled="!active"
          :loading="loading"
          @click="saveBio"
        >
          {{ $t("UserCenter.Done") }}
        </te-button>
        <!-- <span class="done-btn" :class="{ active: active }" @click="saveBio">Done</span> -->
      </template>
    </te-header>
    <van-cell-group class="name-input">
      <van-field
        v-model="signature"
        rows="2"
        autosize
        type="textarea"
        maxlength="32"
        :placeholder="$t('UserCenter.addYourDescription')"
        show-word-limit
        @click-right-icon="signature = ''"
        @input="changeBio"
      >
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toastPassportAxiosError } from "@/utils";

export default {
  name: "EditName",
  setup() {
    const router = useRouter();
    const store = useStore();
    let signature = store.state.user.signature;
    const state = reactive({
      signature: signature,
      active: false,
      loading: false,
      submitFlag: true
    });
    const changeBio = function() {
      if (!state.active) {
        state.active = true;
      }
    };
    const saveBio = async function() {
      const data = {
        id: store.state.user.uid,
        signature: state.signature
      };
      if (state.submitFlag) {
        state.submitFlag = false;
        try {
          state.loading = true;
          await store.dispatch("user/updateUserInfo", data);
          router.back();
        } catch (e) {
          toastPassportAxiosError(e);
          state.submitFlag = true;
        } finally {
          state.loading = false;
        }
      }
    };
    return {
      ...toRefs(state),
      changeBio,
      saveBio
    };
  }
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
