import { defineStore } from "pinia";
import { getRequest } from "@/helper/http-config";

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      users: [],
      page: 1,
      filter: "",
      pagination: [],
      loading: false,
      totalItems:1,
      hasNextPage:false,
      hasPreviousPage:false,
    };
  },
  actions: {
    async fetchUsers(page, filter, limit) {
      try {
        this.loading = true;

        const response = await getRequest(
          `api/user/get-user?page=${page}&search=${filter}&limit=${limit || 10}`
        );
        const responseData = response.data;
        const userData = responseData?.data?.users;
        this.pagination = response.data.data.pagination;

        this.users = userData;
        this.page = responseData?.data?.pagination.currentPage;
        this.totalItems=response?.data?.data?.pagination.totalUsers; 
        this.hasNextPage=response?.data?.data?.pagination.hasNextPage;
        this.hasPreviousPage=response?.data?.data?.pagination.hasPreviousPage;
      } catch (err) {
        console.error("Error in fetchUsers:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
