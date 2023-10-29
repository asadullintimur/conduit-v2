import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

import {useAuthStore} from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false
    }
  },
  // {
  //   path: "/settings",
  //   name: "settings",
  //   meta: {
  //     access: ACCESS.USER
  //   }
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((from, to) => {
  const authStore = useAuthStore(),
      {isAuthorized} = authStore;

  if (to.meta.requiresAuth && !isAuthorized) return {name: "login"};
});

export default router;
