import {
  authorizedLogin,
  bindThirdLogin,
  loginAccount,
  loginPhone,
  loginThirdSecondStep,
  logout,
  unbindThirdLogin
} from "@/apis/auth";
import {
  deviceIdPersistence,
  passportTokenPersistence,
  brandCenterTokenPersistence,
  thirdTypePersistence,
  thirdBehaviorPersistence,
  tenantNamePersistence,
  parseThirdParameters
} from "@/utils";
import router from "@/router";
import { LOGIN_THIRD_TYPE } from "@/constants";
import { fetchThirdLoginInfo } from "@/apis";

export default {
  namespaced: true,
  state: {
    passportToken: passportTokenPersistence.get(),
    brandCenterToken: brandCenterTokenPersistence.get(),
    deviceId: deviceIdPersistence.get(),
    // 第三方登陆
    facebook: {
      avatar: null,
      name: null,
      type: LOGIN_THIRD_TYPE.FACEBOOK,
      openId: null
    },
    google: {
      avatar: null,
      name: null,
      type: LOGIN_THIRD_TYPE.GOOGLE,
      openId: null
    },
    twitter: {
      avatar: null,
      name: null,
      type: LOGIN_THIRD_TYPE.TWITTER,
      openId: null
    },
    instagram: {
      avatar: null,
      name: null,
      type: LOGIN_THIRD_TYPE.INSTAGRAM,
      openId: null
    }
  },
  mutations: {
    SET_PASSPORT_TOKEN(state, val) {
      passportTokenPersistence.set(val);
      state.passportToken = val;
    },
    SET_BRAND_CENTER_TOKEN(state, val) {
      brandCenterTokenPersistence.set(val);
      state.brandCenterToken = val;
    },
    SET_DEVICE_ID(state, val) {
      deviceIdPersistence.set(val);
      state.deviceId = val;
    },
    SET_THIRD_LOGIN: (state, data) => {
      switch (data.type) {
        case state.facebook.type:
          state.facebook.avatar = data.avatar;
          state.facebook.name = data.name;
          state.facebook.openId = data.open_id;
          break;
        case state.google.type:
          state.google.avatar = data.avatar;
          state.google.name = data.name;
          state.google.openId = data.open_id;
          break;
        case state.twitter.type:
          state.twitter.avatar = data.avatar;
          state.twitter.name = data.name;
          state.twitter.openId = data.open_id;
          break;
        case state.instagram.type:
          state.instagram.avatar = data.avatar;
          state.instagram.name = data.name;
          state.instagram.openId = data.open_id;
          break;
      }
    },
    REMOVE_THIRD_LOGIN: (state, type) => {
      switch (type) {
        case state.facebook.type:
          state.facebook.avatar = null;
          state.facebook.name = null;
          state.facebook.openId = null;
          break;
        case state.google.type:
          state.google.avatar = null;
          state.google.name = null;
          state.google.openId = null;
          break;
        case state.twitter.type:
          state.twitter.avatar = null;
          state.twitter.name = null;
          state.twitter.openId = null;
          break;
        case state.instagram.type:
          state.instagram.avatar = null;
          state.instagram.name = null;
          state.instagram.openId = null;
          break;
      }
    },
    REMOVE_AUTH(state) {
      passportTokenPersistence.remove();
      brandCenterTokenPersistence.remove();
      deviceIdPersistence.remove();
      state.passportToken = null;
      state.brandCenterToken = null;
      state.devideId = null;
    }
  },
  actions: {
    async loginSuccess({ commit }, { token, claim: { device_id: deviceId } }) {
      commit("SET_PASSPORT_TOKEN", token);
      commit("SET_DEVICE_ID", deviceId);
      const { data } = await authorizedLogin(
        process.env.VUE_APP_BRAND_CENTER_APP_ID
      );
      const brandCenterToken = data.token;
      commit("SET_BRAND_CENTER_TOKEN", brandCenterToken);
      await router.go(0);
    },

    async loginAccount({ dispatch }, { account, password }) {
      const { data } = await loginAccount(account, password);
      dispatch("loginSuccess", data);
    },

    async loginPhone({ dispatch }, { phone, code }) {
      const { data } = await loginPhone(phone, code);
      dispatch("loginSuccess", data);
    },

    async loginThird({ dispatch }) {
      const { code, type, verifier } = parseThirdParameters();
      const { data } = await loginThirdSecondStep(code, type, verifier);
      await dispatch("loginSuccess", data);
      // 第三方登陆成功，清除第三方登陆所需参数
      thirdTypePersistence.remove();
      thirdBehaviorPersistence.remove();
      tenantNamePersistence.remove();
    },

    async bindThird({ commit }) {
      const { code, type, verifier } = parseThirdParameters();
      const { data } = await bindThirdLogin(code, type, verifier);
      commit("SET_THIRD_LOGIN", data);
      await router.back();
    },

    async unbindThird({ commit, state }, { type }) {
      let openId;
      switch (type) {
        case state.facebook.type:
          openId = state.facebook.openId;
          break;
        case state.google.type:
          openId = state.google.openId;
          break;
        case state.twitter.type:
          openId = state.twitter.openId;
          break;
      }
      await unbindThirdLogin(type, openId);
      commit("REMOVE_THIRD_LOGIN", type);
    },

    async logout({ commit }, { withCallApi = true }) {
      if (withCallApi) await logout();
      // 清除登陆信息
      commit("REMOVE_AUTH");
      // 清除第三方登陆信息
      commit("REMOVE_THIRD_LOGIN", LOGIN_THIRD_TYPE.FACEBOOK);
      commit("REMOVE_THIRD_LOGIN", LOGIN_THIRD_TYPE.GOOGLE);
      commit("REMOVE_THIRD_LOGIN", LOGIN_THIRD_TYPE.TWITTER);
      commit("REMOVE_THIRD_LOGIN", LOGIN_THIRD_TYPE.INSTAGRAM);
      // 清除用户信息
      commit("user/REMOVE_USER_INFO", null, { root: true });
      await router.push({ name: "Home" });
    },

    async getThirdLoginInfo({ commit }) {
      const response = await fetchThirdLoginInfo();
      const thirdList = response.data.data;
      if (Array.isArray(thirdList)) {
        for (const third of thirdList) {
          commit("SET_THIRD_LOGIN", third);
        }
      }
    }
  }
};
