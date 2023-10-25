import {createRouter, createWebHistory} from "vue-router";

import ACCESS from "@/utils/constants/router/access";
import {useAuthStore} from "@/stores/auth";

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      access: ACCESS.GUEST
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      access: ACCESS.GUEST
    }
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      access: ACCESS.ALL
    }
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      access: ACCESS.USER
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((from, to) => {
  const authStore = useAuthStore(),
      {isAuthorized} = authStore;

  console.log(from);
  if (to.meta.access === ACCESS.USER && !isAuthorized) return {name: "login"};
  if (to.meta.access === ACCESS.GUEST && isAuthorized) return false;
});
export default router;
