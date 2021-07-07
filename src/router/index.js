import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { registerBeforeRoute } from "./guard";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

registerBeforeRoute(router);

export default router;
