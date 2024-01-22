<template>
  <div class="q-pa-md">
    <dashboard-chart></dashboard-chart>
    <div>
      <span class="table-title text-h6 q-ml-sm q-pb-xs">Regions</span>
      <RegionTable
        class="q-my-md"
        :columns="regionColumns"
        :rows="regionDataType"
        :loading="loading"
      />
      <!-- <DashboardTable
        class="q-my-md"
        :rows="countries"
        :columns="region2Columns"
        :pagination="countryPagination1"
        :loading="loading"
      /> -->
    </div>
    <div>
      <div class="header-section">
        <div class="table-title text-h6 q-ml-sm"
          >Countries</div>
          <span>
          <InputField
            borderless
            dense
            style="width: 100%; max-width: 250px"
            v-model="search"
            debounce="500"
            @update:model-value="handleSearch"
            appendIcon=""
            prependIcon="search"
            class="q-ml-md q-ml-auto"
            label="Search"
            placeholder="By name"
          >
            <template v-slot:label>
              <div class="label">Search</div>
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </InputField>
        </span>
      </div>
      <div class="">
        <DashboardTable
          class="q-my-md"
          :columns="countriesColumns"
          :rows="countries"
          :loading="loading1"
          :pagination="countriesPagination"
          @paginationData="handleCountryPagination"
        />
        <!-- <DashboardTable
          class="q-my-md"
          :columns="noIntegratedColumns"
          :rows="noIntegratedCountries"
          :loading="loading2"
          :pagination="noIntegratedCountriesPagination"
          @paginationData="handleNoIntegratedCountryPagination"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { onMounted } from "vue";
import { useDashboardStore } from "@/store/dashboard-store";
import RegionTable from "./RegionTable.vue";
import DashboardTable from "./DashboardTable.vue";
import { storeToRefs } from "pinia";
import CreateUserHeader from "../user-management/CreateUserHeader.vue";
import IntegrationInfo from "./IntegrationInfo.vue";
import dashboardChart from "./DashboardChart.vue";

const dashboardStore = useDashboardStore();
const {
  loading,
  loading1,
  loading2,
  regionDataType,
  getCountries,
  countriesPagination,
  noIntegratedCountries,
  getNoIntegrated,
  noIntegratedCountriesPagination,
  countries,
} = storeToRefs(dashboardStore);
const countryPagination1 = ref({});
const countryPagination2 = ref({});
const noIntegratedResponse = ref({});
const search = ref("");

const regionColumns = ref([
  {
    name: "regions",
    required: true,
    label: "Regions",
    field: "regions",
    align: "left",
  },
  {
    name: "total",
    align: "left",
    label: "Total",
    field: "total",
  },

  {
    name: "officialFree",
    label: "Free",
    align: "left",
    field: "officialFree",
  },
  {
    name: "officialPaid",
    label: "Paid",
    align: "left",
    field: "officialPaid",
  },
  {
    name: "unOfficialFree",
    label: "Free",
    align: "left",
    field: "unOfficialFree",
  },
  {
    name: "unOfficialPaid",
    label: "Paid",
    align: "left",
    field: "unOfficialPaid",
  },
]);
const region2Columns = ref([
  {
    name: "region",
    required: true,
    label: "Regions",
    field: "region",
    align: "left",
  },
  {
    name: "total",
    align: "left",
    label: "Total",
    field: "total",
  },

  {
    name: "markedForIntegration",
    label: "Marked for Integration",
    align: "left",
    field: "markedForIntegration",
  },
  {
    name: "integratedIssues",
    label: "Integrated Issues",
    align: "left",
    field: "integratedIssues",
  },
  {
    name: "integratedDone",
    label: "Integrated Done",
    align: "left",
    field: "integratedDone",
  },
  {
    name: "inProcess",
    label: "In Process",
    align: "left",
    field: "inProcess",
  },
  {
    name: "pending",
    label: "Pending",
    align: "left",
    field: "pending",
  },
]);

const countriesColumns = ref([
  {
    name: "country_name",
    required: true,
    label: "Countries",
    field: "country_name",
    align: "left",
  },
  {
    name: "region_name",
    align: "left",
    label: "Region",
    field: "region_name",
  },

  {
    name: "gdp_amount",
    label: "GDP",
    align: "left",
    field: "gdp_amount",
  },
  {
    name: "sourceCount",
    label: "Source Count",
    align: "left",
    field: "sourceCount",
  },
  {
    name: "integrated",
    label: "Integration Sources",
    align: "left",
    field: "integrated",
  },
  {
    name: "Not Integrated",
    label: "No Integration Sources",
    align: "left",
    field: "Not Integrated",
  },
  {
    name: "Duplicate",
    label: "Duplicate",
    align: "left",
    field: "Duplicate",
  },
]);
const noIntegratedColumns = ref([
  {
    name: "country",
    required: true,
    label: "Countries with no integration made",
    field: "country",
    align: "left",
  },
  {
    name: "region_name",
    align: "left",
    label: "Region",
    field: "region_name",
  },

  {
    name: "GDPAmount",
    label: "GDP",
    align: "left",
    field: "GDPAmount",
  },
  {
    name: "SourceCount",
    label: "Source Count",
    align: "left",
    field: "SourceCount",
  },
]);

const handleCountryPagination = (pageNumber, rows) => {
  dashboardStore.setCountryPagination(pageNumber, rows);
  dashboardStore
    .getCountiresData(pageNumber, rows || 10)
    .then((response) => {});
};
const handleNoIntegratedCountryPagination = (pageNumber, rows) => {
  dashboardStore.setNoIntegratedCountryPagination(pageNumber, rows);
  dashboardStore
    .getNotIntegratedCountries(pageNumber, rows || 10)
    .then((response) => {});
};
const handleSearch = (value) => {
  dashboardStore.getCountiresData(
    1,
    "",
    search.value = value,
  )
};

onMounted(() => {
  dashboardStore
    .getRegionDataType()
    .then(() => {
      dashboardStore.setLoading(false);
    })
    .catch(() => {
      dashboardStore.setLoading(false);
    })
    .finally(() => {
      dashboardStore.setLoading(false);
    });
  // dashboardStore.getRegionIntegrated()
  dashboardStore
    .getCountiresData(1,"",search.value || "")
    .then((res) => {
      dashboardStore.setLoading(false);
    })
    .catch(() => {
      dashboardStore.setLoading(false);
    })
    .finally(() => {
      dashboardStore.setLoading(false);
    });
  dashboardStore
    .getNotIntegratedCountries(1)
    .then(() => {
      dashboardStore.setLoading(false);
    })
    .catch(() => {
      dashboardStore.setLoading(false);
    })
    .finally(() => {
      dashboardStore.setLoading(false);
    });
});
</script>
<style scoped>
.table-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--q-text-color);
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
