import { getTenementInfo } from "@/apis";
import { resolveTenantName } from "@/utils";
import defaultBrand from "@/assets/imgs/brand.png";
import { Dialog } from "vant";

export default {
  namespaced: true,
  state: {
    // id
    id: null,
    // 租户名
    name: resolveTenantName(),
    // 租户简介
    description: null,
    // 租户头像
    logo: null,
    // 租户品牌背景
    brand: null,
  },
  getters: {
    // 租户是否存在
    isTenantExit(state) {
      return Boolean(state.id);
    },
  },
  mutations: {
    SET_TENANT: (state, data) => {
      state.id = data.id;
      state.name = data.name;
      state.description = data.description;
      state.logo = data.logo;
      state.brand = data.brand || defaultBrand;
    },
  },
  actions: {
    async getTenantInfo({ commit, state }) {
      // auth是第三方登陆统一callback租户名，（auth租户名实际上不存在，如果跑下面的流程会进入catch流程）
      if (state.name === "auth") return;
      try {
        const { data } = await getTenementInfo();
        commit("SET_TENANT", data);
      } catch (e) {
        // await Dialog.alert({
        //   message: `租户不存在，跳转到${process.env.VUE_APP_DEFAULT_TENANT_NAME}租户`,
        // });
        // window.location.href = `https://${process.env.VUE_APP_DEFAULT_TENANT_NAME}.mms.tevo.online`;
      }
    },
  },
};
