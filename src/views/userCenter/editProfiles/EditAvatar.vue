<template>
  <te-header :title="$t('UserCenter.EditAvatar')" background="#fff" border />
  <div class="edit-avatar">
    <van-image class="edit-avatar__image" :src="avatar" round alt="profiles" />
    <p class="edit-avatar__name">{{ name }}</p>
    <van-uploader :after-read="afterRead">
      <te-button type="warning" dark block :loading="loading">
        {{ $t("UserCenter.ChangeAvatar") }}
      </te-button>
    </van-uploader>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { updateUserAvatar, uploadUserAvatar } from "@/apis/user";
import TeButton from "@/components/Button";

export default {
  name: "EditAvatar",
  components: {
    TeButton
  },
  setup() {
    const store = useStore();
    const state = reactive({
      loading: false
    });
    const avatar = computed(() => store.getters["user/avatar"]);
    const name = computed(() => store.getters["user/name"]);
    const upload = file => {
      const formData = new FormData();
      formData.append("file", file.file, file.file.name);
      return formData;
    };
    const afterRead = async file => {
      try {
        state.loading = true;
        const response = await uploadUserAvatar(upload(file));
        const avatar = response.data.data[0];
        await updateUserAvatar({ avatar });
        store.commit("user/SET_USER_AVATAR", avatar);
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      avatar,
      name,
      afterRead
    };
  }
};
</script>

<style lang="less" scoped>
.edit-avatar {
  padding-top: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  &__name {
    margin-bottom: 50px;
    font-size: 18px;
    font-weight: bold;
    color: @color-text;
  }

  &__image {
    margin-bottom: 50px;
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
}
</style>
