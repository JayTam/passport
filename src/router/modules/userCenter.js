export default [
  // 积分历史记录
  {
    path: "/integral_history",
    name: "IntegralHistory",
    component: () =>
      import(
        /* webpackChunkName: "IntegralHistory" */ "@/views/userCenter/IntegralReputationHistory"
      ),
  },
  //信誉值
  {
    path: "/reputation",
    name: "Reputation",
    component: () => import(/* webpackChunkName: "Reputation" */ "@/views/userCenter/Reputation"),
  },
  // 获取信誉历史记录
  {
    path: "/reputation_history",
    name: "ReputationHistory",
    component: () =>
      import(
        /* webpackChunkName: "ReputationHistory" */ "@/views/userCenter/IntegralReputationHistory"
      ),
  },
  // 账户信息
  {
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "Account" */ "@/views/userCenter/Account"),
  },
  //用户信息
  {
    path: "/profiles",
    name: "Profiles",
    component: () => import(/* webpackChunkName: "Profiles" */ "@/views/userCenter/Profiles"),
  },
  //编辑名称
  {
    path: "/edit_name",
    name: "EditName",
    component: () =>
      import(/* webpackChunkName: "EditName" */ "@/views/userCenter/editProfiles/EditName"),
  },
  //编辑签名
  {
    path: "/edit_bio",
    name: "EditBio",
    component: () =>
      import(/* webpackChunkName: "EditBio" */ "@/views/userCenter/editProfiles/EditBio"),
  },
  //编辑头像
  {
    path: "/edit_avatar",
    name: "EditAvatar",
    component: () =>
      import(/* webpackChunkName: "EditAvatar" */ "@/views/userCenter/editProfiles/EditAvatar"),
  },
  // 收货地址编辑
  {
    path: "/address_book",
    name: "AddressBook",
    component: () => import(/* webpackChunkName: "AddressBook" */ "@/views/userCenter/AddressBook"),
  },
  // 收货地址选择
  {
    path: "/pick_address",
    name: "PickAddress",
    component: () => import(/* webpackChunkName: "PickAddress" */ "@/views/userCenter/AddressBook"),
  },
  // 新增单个收货地址
  {
    path: "/new_address",
    name: "NewAddress",
    component: () => import(/* webpackChunkName: "NewAddress" */ "@/views/userCenter/NewAddress"),
  },
  // 编辑收货地址
  {
    path: "/edit_address/:id",
    name: "EditAddress",
    component: () => import(/* webpackChunkName: "EditAddress" */ "@/views/userCenter/EditAddress"),
  },
  // 账户安全，包含手机，邮箱，第三方登陆的绑定，换绑
  {
    path: "/account_security",
    name: "AccountSecurity",
    component: () =>
      import(/* webpackChunkName: "AccountSecurity" */ "@/views/userCenter/AccountSecurity"),
  },
];
