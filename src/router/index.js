// router/index.js //

import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "@/store/auth-store";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && authStore.token !== null) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: () => import("../views/ForgotPasswordView.vue"),
  },
  {
    path: "/set-password/:token",
    name: "setPassword",
    component: () => import("../views/SetPasswordView.vue"),
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/dashboard/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && authStore.token !== null) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/user-management",
    name: "userManagement",
    component: () => import("../components/user-management/UserManagement.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && authStore.token !== null) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/sources",
    name: "sources",
    component: () => import("../components/sources/Source.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && authStore.token !== null) {
        next();
      } else {
        next("/");
      }
    },
  },
  // {
  //   path: "/activity-logs",
  //   name: "activityLogs",
  //   component: () => import("../components/activity-logs/ActivityLogs.vue"),
  //   beforeEnter: (to, from, next) => {
  //     const authStore = useAuthStore();
  //     if (authStore.isAuthenticated && authStore.token !== null) {
  //       next();
  //     } else {
  //       next("/");
  //     }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
