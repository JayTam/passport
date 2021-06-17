/**
 * 路由规范：
 * 1. 所有页面都使用路由懒加载, webpackChunkName指定路由名
 * 2. route name 使用驼峰式且首字母大写，比如 LoginAccount
 * 3. router.push不要用path，用name，比如 router.push({ name: "Home" })
 */
import userCenter from "./modules/userCenter";
import authPc from "./modules/authPc";
import auth from "./modules/auth";
import { isPC } from "@/utils";

const result_auth = isPC() ? authPc : auth;
export default [
  ...result_auth,
  ...userCenter,

  // 隐私政策
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/others/Privacy.vue"),
  },
  // 用户协议
  {
    path: "/agreement",
    name: "UserAgreement",
    component: () => import("@/views/others/UserAgreement.vue"),
  },
];
