/**
 * 组队活动相关路由
 */

export default [
  {
    path: "/team_up/:id",
    name: "TeamUp",
    component: () =>
      import(/* webpackChunkName: "TeamUp" */ "@/views/teamUp/TeamUp")
  },
  {
    path: "/team_up/:id/join/:teamId",
    name: "JoinTeamUp",
    component: () =>
      import(/* webpackChunkName: "JoinTeamUp" */ "@/views/teamUp/TeamUp")
  }
];
