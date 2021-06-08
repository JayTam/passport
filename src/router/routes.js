/**
 * 路由规范：
 * 1. 所有页面都使用路由懒加载, webpackChunkName指定路由名
 * 2. route name 使用驼峰式且首字母大写，比如 LoginAccount
 * 3. router.push不要用path，用name，比如 router.push({ name: "Home" })
 */
import auth from "./modules/auth";
import userCenter from "./modules/userCenter";
import teamUp from "@/router/modules/teamUp";

export default [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/Home/Home.vue"),
    meta: {
      keepAlive: true
    }
  },
  ...auth,
  ...userCenter,
  ...teamUp,
  // 待兑换积分优惠卷
  {
    path: "/integral_coupon/:id",
    name: "IntegralCoupon",
    component: () =>
      import(
        /* webpackChunkName: "IntegralCoupon" */ "@/views/integral/IntegralRewardCoupon.vue"
      )
  },
  // 待兑换积分实物奖品
  {
    path: "/integral_product/:id",
    name: "IntegralProduct",
    component: () =>
      import(
        /* webpackChunkName: "IntegralProduct" */ "@/views/integral/IntegralRewardProduct"
      )
  },
  //积分任务
  {
    path: "/offers",
    name: "Offers",
    component: () =>
      import(/* webpackChunkName: "Offers"*/ "@/views/integral/Offers")
  },
  // 隐私政策
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/others/Privacy.vue")
  },
  // 用户协议
  {
    path: "/agreement",
    name: "UserAgreement",
    component: () => import("@/views/others/UserAgreement.vue")
  }
];
