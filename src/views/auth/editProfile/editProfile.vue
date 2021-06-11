<template>
  <Desc type="Login"></Desc>
  <photo-view></photo-view>

  <te-form :model="form" ref="formRef">
    <!-- 用户名 -->
    <te-form-item
      label="Create username"
      prop="username"
      :rules="userNameRules"
    >
      <te-input v-model="form.username"></te-input>
      <p class="account_tip">You can always change this later.</p>
    </te-form-item>

    <!-- 生日 -->
    <te-form-item label="When’s your birthday?" class="birthday">
      <div class="birthday_box">
        <te-form-item prop="Month" :rules="accountRules">
          <my-select
            type="Month"
            width="60px"
            @seleChange="handleMonth"
          ></my-select>
        </te-form-item>
        <te-form-item prop="Day" :rules="accountRules">
          <my-select
            type="Day"
            width="60px"
            @seleChange="handleDay"
          ></my-select>
        </te-form-item>
        <te-form-item prop="Year" :rules="accountRules">
          <my-select
            type="Year"
            width="60px"
            @seleChange="handleYear"
          ></my-select>
        </te-form-item>
      </div>
    </te-form-item>

    <!-- 性别 -->
    <te-form-item label="Gender" prop="gender" :rules="accountRules">
      <my-select type="Gender" @seleChange="handleGender"></my-select>
    </te-form-item>

    <te-form-item>
      <te-button
        type="warning"
        block
        dark
        :loading="loading"
        @click="handleSubmit"
        >Next</te-button
      >
    </te-form-item>

    <div class="tips">
      <te-button type="text" size="mini" :to="{ name: 'SignUpPhone' }" replace
        >Skip</te-button
      >
    </div>
  </te-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useValidate } from "@/composables/useValidate";
import { toastPassportAxiosError } from "@/utils";
import { updateUserInfo } from "@/apis/user";
import { useStore } from "vuex";
import TeFormItem from "../../../components/Form/FormItem";
import TeForm from "../../../components/Form/Form";
import TeInput from "../../../components/Form/Input";
import TeButton from "../../../components/Button";
import PhotoView from "../../../components/PhotoView";
import Desc from "../../../components/desc";
import MySelect from "../../../components/MySelect";
import { Toast } from "vant";

export default {
  name: "editProfile",
  components: {
    TeButton,
    TeForm,
    TeFormItem,
    TeInput,
    PhotoView,
    Desc,
    MySelect,
  },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const store = useStore();
    const state = reactive({
      form: {
        username: "",
        birthday: "",
        gender: "",
        Month: "",
        Day: "",
        Year: "",
      },
    });

    const handleMonth = async (arg) => {
      state.form.Month = arg;
    };
    const handleDay = async (arg) => {
      state.form.Day = arg;
    };
    const handleYear = async (arg) => {
      state.form.Year = arg;
    };
    const handleGender = async (arg) => {
      state.form.gender = arg;
    };

    const handleSubmit = async () => {
      let obj = {};
      obj.username = state.form.username;
      obj.gender = state.form.gender;
      obj.birthday =
        state.form.Year + "-" + state.form.Month + "-" + state.form.Day;
      try {
        loading.value = true;
        await formRef.value.validate();
        await updateUserInfo(obj);
        await Toast.success("success");
        // await store.dispatch("auth/loginAccount", state.form);
      } catch (error) {
        toastPassportAxiosError(error);
      } finally {
        loading.value = false;
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
      PhotoView,
      Desc,
      MySelect,
    };
  },
};
</script>

<style lang="less" scoped>
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
</style>
