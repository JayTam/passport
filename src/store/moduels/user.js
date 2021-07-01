import { fetchUserInfo, updateUserInfo, fetchEmailInfo, fetchPhoneInfo } from "@/apis/user";
import { Toast } from "vant";
import defaultAvatar from "@/assets/imgs/portrait.png";

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
      type: 0,
    },
    // 手机号码
    phone: null,
    // 邮箱
    email: null,
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
    SET_USER_ID: (state, data) => {
      state.uid = data;
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
    },
  },
  actions: {
    async getUserInfo({ commit, dispatch }) {
      const userInfoResponse = await fetchUserInfo();
      const userInfo = userInfoResponse.data;
      if (userInfo) commit("SET_USER_INFO", userInfo);
      await dispatch("getEmailInfo");
      await dispatch("getPhoneInfo");
      await dispatch("auth/getThirdLoginInfo", null, { root: true });
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
    },
  },
};
