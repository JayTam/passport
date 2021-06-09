/**
 * 路由规范：
 * 1. 所有页面都使用路由懒加载, webpackChunkName指定路由名
 * 2. route name 使用驼峰式且首字母大写，比如 LoginAccount
 * 3. router.push不要用path，用name，比如 router.push({ name: "Home" })
 */
// import auth from "./modules/auth";
import auth from "./modules/authPc";
import userCenter from "./modules/userCenter";

export default [
  ...auth,
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
