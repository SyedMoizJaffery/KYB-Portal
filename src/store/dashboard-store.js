import { defineStore } from "pinia";
import { getRequest } from "@/helper/http-config";

export const useDashboardStore = defineStore("useDashboardStore", {
  state: () => {
    return {
      page: 1,
      regionDataType: [],
      regionIntegrated: [],
      countries: [],
      countriesPagination: {
        sortBy: null,
        descending: false,
        page: 0,
        totalPages: 0,
        totalCount: 0,
        rowsPerPage: 0,
      },
      noIntegratedCountriesPagination: {
        sortBy: null,
        descending: false,
        page: 0,
        totalPages: 0,
        totalCount: 0,
        rowsPerPage: 0,
      },
      noIntegratedCountries: [],
      loading: false,
      loading1: false,
      loading2: false,
      // totalItems: 1,
    };
  },
  actions: {
    async getRegionDataType() {
      try {
        this.loading = true;
        const response = await getRequest(`api/dashboard/get-regions`);
        this.regionDataType = response?.data?.data;
        return response;
      } catch (err) {}
    },
    async getRegionIntegrated() {
      try {
        // this.loading = true;
        // const response = await getRequest(`api/dashboard/region2?page=${page}`);
        // this.region2Data = response.data;
        // this.page = responseData?.data?.currentPage;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
    async getCountiresData(page, limit,search) {
      try {
        this.loading1 = true;
        const response = await getRequest(
          `/api/dashboard/get-countries?page=${page}&search=${search || ""}&limit=${limit || 10}`
        );
        this.countries = response?.data?.data?.countries;
        this.countriesPagination = {
          sortBy: "desc",
          descending: false,
          page: response?.data?.data?.pagination?.currentPage,
          totalPages: response?.data?.data?.pagination?.totalPages,
          totalCount: response?.data?.data?.pagination?.total,
          rowsPerPage: response?.data?.data?.pagination?.limit,
        };

        return response;
      } catch (err) {
      } finally {
        this.loading1 = false;
      }
    },

    async getNotIntegratedCountries(page, limit) {
      try {
        this.loading2 = true;
        const response = await getRequest(
          `/api/dashboard/get-countries-with-no-integrations?page=${page}&limit=${
            limit || 10
          }`
        );
        this.noIntegratedCountries = response?.data?.data?.countries;
        this.noIntegratedCountriesPagination = {
          sortBy: "desc",
          descending: false,
          page: response?.data?.data?.pagination?.currentPage,
          totalPages: response?.data?.data?.pagination?.totalPages,
          totalCount: response?.data?.data?.pagination?.total,
          rowsPerPage: response?.data?.data?.pagination?.limit,
        };

        return response;
      } catch (err) {
      } finally {
        this.loading2 = false;
      }
    },
    setLoading(bool) {
      this.loading = bool;
    },
    setCountryPagination(pageNumber, rowsPerPage) {
      this.countriesPagination.currentPage = pageNumber;
      this.countriesPagination.rowsPerPage = rowsPerPage;
    },
    setNoIntegratedCountryPagination(pageNumber, rowsPerPage) {
      this.noIntegratedCountriesPagination.currentPage = pageNumber;
      this.noIntegratedCountriesPagination.rowsPerPage = rowsPerPage;
    },
  },
  getters: {
    getCountries(state) {
      return state.countries;
    },
    getNoIntegrated(state) {
      return state.noIntegratedCountries;
    },
  },
  persist: false,
});
