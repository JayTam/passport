<template>
  <p class="title">Edit your profile</p>

  <div class="PhotoView" @mouseenter="avatarChange = true" @mouseleave="avatarChange = false">
    <van-uploader :after-read="afterRead">
      <img v-if="avatar" :src="avatar" alt="avatar" />
      <img v-else src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="" />
      <div class="mask" v-if="avatarChange">change</div>
    </van-uploader>
  </div>

  <te-form :model="form" ref="formRef">
    <!-- 用户名 -->
    <te-form-item label="Create name" prop="name" :rules="userNameRules">
      <te-input v-model="form.name"></te-input>
      <p class="account_tip">You can always change this later.</p>
    </te-form-item>

    <!-- 生日 -->
    <te-form-item label="When’s your birthday?" class="birthday">
      <div class="birthday_box">
        <te-form-item prop="Month" :rules="accountRules">
          <my-select type="Month" width="60px" @seleChange="handleMonth"></my-select>
        </te-form-item>
        <te-form-item prop="Day" :rules="accountRules">
          <my-select type="Day" width="60px" @seleChange="handleDay"></my-select>
        </te-form-item>
        <te-form-item prop="Year" :rules="accountRules">
          <my-select type="Year" width="60px" @seleChange="handleYear"></my-select>
        </te-form-item>
      </div>
    </te-form-item>

    <!-- 性别 -->
    <te-form-item label="Gender" prop="gender" :rules="accountRules">
      <my-select type="Gender" @seleChange="handleGender"></my-select>
    </te-form-item>

    <te-form-item>
      <te-button type="warning" block dark :loading="loading" @click="handleSubmit">Next</te-button>
    </te-form-item>

    <div class="tips">
      <te-button type="text" size="mini" @click="handleskip" replace>Skip</te-button>
    </div>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError, postMessage } from "@/utils";
import { updateUserInfo } from "@/apis/user";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import MySelect from "../../../components/MySelect";
import { useRouter } from "vue-router";
import { updateUserAvatar, uploadUserAvatar } from "@/apis/user";

export default {
  name: "editProfile",
  components: {
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
    MySelect,
  },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const router = useRouter();
    const state = reactive({
      form: {
        name: "",
        birthday: "",
        gender: "",
        Month: "",
        Day: "",
        Year: "",
      },
      avatar: "",
      avatarChange: false,
    });

    const handleMonth = async arg => {
      if (arg < 10) {
        arg = "0" + arg;
      }
      state.form.Month = arg;
    };
    const handleDay = async arg => {
      if (arg < 10) {
        arg = "0" + arg;
      }
      state.form.Day = arg;
    };
    const handleYear = async arg => {
      state.form.Year = arg;
    };
    const handleGender = async arg => {
      state.form.gender = arg;
    };

    // 进入这个页面则代表用户注册成功,然后用户根据选择填写用户信息
    const handleSubmit = async () => {
      let obj = {};
      obj.name = state.form.name;
      obj.gender = Number(state.form.gender);
      obj.birthday = state.form.Year + "-" + state.form.Month + "-" + state.form.Day;
      try {
        loading.value = true;
        await formRef.value.validate();
        await updateUserInfo(obj);
        postMessage("profileComplete", { isSkip: false });
        await router.push({ name: "LoginSuccess" });
      } catch (error) {
        toastPassportAxiosError(error);
      } finally {
        loading.value = false;
      }
    };

    const handleskip = async () => {
      postMessage("profileComplete", { isSkip: true });
      await router.push({ name: "LoginSuccess" });
    };

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
        state.avatar = avatar;
        await updateUserAvatar({ avatar });
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      ...useValidate(),
      formRef,
      loading,
      handleSubmit,
      handleMonth,
      handleDay,
      handleYear,
      handleGender,
      MySelect,
      handleskip,
      afterRead,
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 28px;
  font-family: Roboto-Medium, Roboto;
  font-weight: 500;
  color: #333333;
  line-height: 33px;
  width: 100%;
  text-align: center;
}
form {
  width: 80%;
  margin: 0 auto;
}
.account_tip {
  font-family: Lucida Grande;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #c4c4c4;
}
.tips {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  &__text {
    font-size: 12px;
    line-height: 24px;
    color: @color-info;
  }
}
.birthday {
  &_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    .MySelect {
      display: inline-block;
    }
    .te-form-item {
      padding-bottom: 0;
    }
  }
  .te-form-item__error-message {
    display: none;
  }
}
.PhotoView {
  width: 88px;
  height: 88px;
  background: #f6f6f6;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 22px;
  position: relative;
  img {
    width: 88px;
    height: 88px;
  }
  .van-uploader {
    width: 88px;
    height: 88px;
    .van-uploader__wrapper {
      width: 88px;
      height: 88px;
      .van-uploader__input-wrapper {
        width: 88px;
        height: 88px;
      }
    }
  }
  .mask {
    width: 88px;
    height: 44px;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 44px;
    background: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
  }
}
</style>
