import { defineStore } from "pinia";
import {
  postRequest,
  patchRequest,
  getRequest,
  HTTP,
} from "@/helper/http-config";
import { showSnackBar } from "@/helper/index";
import { useRouter } from "vue-router";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: "",
      isAuthenticated: false,
      rememberMe: false,
      userName: "",
    };
  },
  getters: {},
  actions: {
    async handleLogin(payload) {
      try {
        const response = await postRequest("/api/auth/login", payload);
        const token = response.data.token;
        HTTP.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        this.token = token;
        this.isAuthenticated = true;
        this.userName = response.data.data.UserName;
        if (payload.rememberMe) {
          this.rememberMe = true;
        }
        showSnackBar(true, response?.data.message);
        router.push("/dashboard");

        return response;
      } catch (error) { }
    },

    async forgetPassword(payload) {
      try {
        const response = await postRequest(
          "/api/auth/forgot-password",
          payload
        );
        showSnackBar(true, response.data.message);
      } catch (error) { }
    },
    async setPassword(payload) {
      try {
        const response = await patchRequest("/api/auth/set-password", payload);
        showSnackBar(true, response.data.message);
      } catch (error) { }
    },
    async handleLogout() {
      try {
        const response = await getRequest("/api/auth/logout");
        this.token = "";
        this.isAuthenticated = false;
        showSnackBar(true, response.data.message);
        router.push("/");
      } catch (error) { }
    },
  },
  persist: true,
});
