// store/source-store.js //

import { getRequest } from "@/helper/http-config";
import { defineStore } from "pinia";

export const useSourceStore = defineStore("source", {
  state: () => {
    return {
      sourceList: [],
      pagination: {},
      associatedCountries: [],
      languages: [],
      formats: [],
      regions: [],
      states: [],
      loading: false,
      viewDialog: false,
      editToggle: false,
      source: {},
    };
  },
  actions: {
    async getSourceList(
      search,
      page,
      limit,
      startCreatedAt,
      endCreatedAt,
      startUpdatedAt,
      endUpdatedAt,
      country,
      coverage,
      dataType,
      language,
      format,
      integration,
      integrationStatus,
      showDuplicate,
      region,
      cost,
      sourceType,
      containsUBOs
    ) {
      try {
        this.loading = true;
        const response = await getRequest(
          `api/source/get-source?search=${search || ""}&page=${page || 1
          }&limit=${limit || 20}&startCreatedAt=${startCreatedAt || ""
          }&endCreatedAt=${endCreatedAt || ""}&startUpdatedAt=${startUpdatedAt || ""
          }&endUpdatedAt=${endUpdatedAt || ""}&countryWithId=${country || ""
          }&coverage=${coverage || ""}&datatype=${dataType || ""}&language=${language || ""
          }&format=${format || ""}&integrations=${integration || ""
          }&integrationStatus=${integrationStatus || ""}&showDuplicate=${showDuplicate || ""
          }&regionWithId=${region.length === 0 ? "" : region}&cost=${cost || ""
          }&sourceType=${sourceType || ""}&containUbos=${containsUBOs || ""}`
        );
        this.sourceList = response?.data?.data?.source;
        this.pagination = response?.data?.data?.pagination;
        return response;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async fetchHistory(id) {
      try {
        this.loading = true;
        const response = await getRequest(`api/history/get-history/${id}`);
        this.id = response?.data?.data?.source.id;
        return response;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    setLoading(bool) {
      this.loading = bool;
    },
    setToggleView(bool) {
      this.viewDialog = bool;
    },
    setToggleEdit(bool) {
      this.editToggle = bool;
    },
    getSource(payload) {
      this.source = payload;
    },
    getDropdownData() {
      try {
        getRequest(`api/source/get-countries`)
          .then((response) => {
            this.associatedCountries = response?.data?.data;
            this.associatedCountries.map((country) => {
              country.value = country.id;
            });
          })
          .catch(() => { });
        getRequest(`api/source/get-source-type`)
          .then((response) => {
            this.formats = response?.data?.data;
            this.formats.map((format) => {
              format.value = format.id;
            });
          })
          .catch(() => { });

        getRequest(`api/source/get-languages`)
          .then((response) => {
            this.languages = response?.data?.data;
            this.languages.map((language) => {
              language.value = language.id;
            });
          })
          .catch(() => { });
        getRequest(`api/source/get-region-list`)
          .then((response) => {
            this.regions = response?.data?.data;
            this.regions.map((region) => {
              region.value = region.id;
            });
          })
          .catch(() => { });
        getRequest(`api/source/get-state-list`)
          .then((response) => {
            this.states = response?.data?.data;
            this.states.map((state) => {
              state.value = state.id;
            });
          })
          .catch(() => { });
      } catch (error) { }
    },
  },
  getters: {
    getList(state) {
      return state.sourceList;
    },
    getPagination(state) {
      return state.pagination;
    },
    getSourceId(state) {
      return state.source.id;
    }
  },
  persist: false,
});
