import {
  fetchUserInfo,
  updateUserInfo,
  getIntegral,
  getUserLevel,
  fetchEmailInfo,
  fetchPhoneInfo
} from "@/apis/user";
import { Toast } from "vant";
import defaultAvatar from "@/assets/imgs/portrait.png";
import { calcUserLevel } from "@/utils";

export default {
  namespaced: true,
  state: {
    uid: null,
    area: null,
    avatar: null,
    birthday: null,
    city: null,
    country: null,
    custom_address: null,
    customer_id: null,
    gender: 0,
    name: null,
    protocols: null,
    province: null,
    royole_id: null,
    signature: null,
    street: null,
    third_info: null,
    uid_str: null,
    username: null,
    vip_info: {
      account_vip: null,
      max: 0,
      type: 0
    },
    //积分
    integral: null,
    //信誉值
    reputation: null,
    // 手机号码
    phone: null,
    // 邮箱
    email: null
  },
  getters: {
    hasGetUserInfo(state) {
      return !!state.uid;
    },
    // 对于前端页面而言，获取到用户信息才算登陆成功
    isLogin(state) {
      return !!state.uid;
    },
    level(state) {
      return state.vip_info.account_vip?.toFixed?.(0) || 1;
    },
    vipInfo(state) {
      return state.vip_info;
    },
    // 未登陆或头像为空，显示默认头像
    avatar(state) {
      return state.avatar || defaultAvatar;
    },
    name(state) {
      return state.name ?? "Wook";
    },
    integral(state) {
      return state.integral;
    },
    reputation(state) {
      return state.reputation;
    }
  },
  mutations: {
    SET_USER_INFO: (state, data) => {
      for (const key in data) {
        if (key === "vip_info") {
          state.vip_info.account_vip = data.vip_info.account_vip;
          state.vip_info.type = data.vip_info.type;
          state.vip_info.max = data.vip_info.max;
        } else {
          state[key] = data[key];
        }
      }
    },
    SET_USER_AVATAR: (state, data) => {
      state.avatar = data;
    },
    SET_USER_PHONE: (state, data) => {
      state.phone = data;
    },
    SET_USER_EMAIL: (state, data) => {
      state.email = data;
    },
    SET_INTEGRAL: (state, data) => {
      state.integral = data;
    },
    SET_REPUTATION: (state, data) => {
      state.reputation = data;
    },
    SET_LEVEL_INFO: (state, data) => {
      state.vip_info.account_vip = data.level;
      state.vip_info.max = data.max;
      state.vip_info.type = data.type;
    },
    REMOVE_USER_INFO: state => {
      for (const key in state) {
        if (key === "vip_info") {
          state.vip_info.account_vip = null;
          state.vip_info.type = 0;
          state.vip_info.max = 0;
        } else if (key === "gender") {
          state.gender = 0;
        } else {
          state[key] = null;
        }
      }
    }
  },
  actions: {
    async getUserInfo({ commit, dispatch }) {
      const userInfoResponse = await fetchUserInfo();
      const userInfo = userInfoResponse.data;
      if (userInfo) commit("SET_USER_INFO", userInfo);
      await dispatch("getIntegralInfo");
      await dispatch("getEmailInfo");
      await dispatch("getPhoneInfo");
      await dispatch("auth/getThirdLoginInfo", null, { root: true });
    },
    async getIntegralInfo({ commit }) {
      const integralRequest = getIntegral();
      const userLevelRequest = getUserLevel();
      const integralResponse = await integralRequest;
      const userLevelResponse = await userLevelRequest;
      const levelList = userLevelResponse.data.data;
      const integral = integralResponse.data.data.currency;
      const reputation = integralResponse.data.data.total_income;
      const userLevel = calcUserLevel(reputation, levelList);
      commit("SET_INTEGRAL", integral);
      commit("SET_REPUTATION", reputation);
      commit("SET_LEVEL_INFO", userLevel);
    },
    async getEmailInfo({ commit }) {
      const response = await fetchEmailInfo();
      const email = response.data.email;
      commit("SET_USER_EMAIL", email);
    },
    async getPhoneInfo({ commit }) {
      const response = await fetchPhoneInfo();
      const phone = response.data.phone;
      commit("SET_USER_PHONE", phone);
    },
    async updateUserInfo({ commit, dispatch }, data) {
      const response = await updateUserInfo(data);
      const userInfo = response.data;
      if (userInfo) commit("SET_USER_INFO", userInfo);
      await dispatch("getIntegralInfo");
      Toast.success("修改成功");
    }
  }
};
