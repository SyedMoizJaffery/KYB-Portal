<template>
  <div class="q-pa-md dashboard-header" flat bordered>
    <q-card class="total-sources-card" flat bordered>
      <q-card-section>
        <div class="text-body2 text-weight-medium flex justify-between">
          <span class="total-sources-heading"> Total Sources </span>
          <span> {{ totalSource }} </span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-caption text-weight-medium flex justify-between">
          <span> Portals </span>
          <span> {{ portalData }} </span>
        </div>
        <div class="text-caption text-weight-medium flex justify-between">
          <span> Dumps {{}} </span>
          <span> {{ dumpData }} </span>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="integration-card" flat bordered>
      <q-card-section class="flex justify-between">
        <div class="text-body2 text-weight-medium flex justify-between">
          <span class="integration-heading q-mr-sm"> Integration </span>
        </div>
        <div class="text-body2 text-weight-medium flex justify-between">
          <span class="q-mr-sm"> Required </span>
          <span> {{ require }} </span>
        </div>
        <div class="text-body2 text-weight-bold flex justify-between">
          <span class="q-mr-sm"> Live </span>
          <span> {{ live }} </span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-3">
            <div class="text-caption text-weight-medium flex justify-between">
              <span> Portals </span>
              <span> {{ portal.totalPortal }} </span>
            </div>
            <div class="text-caption text-weight-medium flex justify-between">
              <span> Dumps </span>
              <span> {{ dump.totalDump }} </span>
            </div>
          </div>
          <div class="col-3">
            <div class="integration-subtitles-sm flex q-ml-lg">
              <div>Live - {{ portal.Live }}</div>
            </div>
            <div class="integration-subtitles-sm flex q-ml-lg">
              <div>Live - {{ dump.Live }}</div>
            </div>
          </div>
          <div class="col-3">
            <div class="integration-subtitles-sm flex q-ml-sm">
              <div>Pending - {{ portal.Pending }}</div>
            </div>
            <div class="integration-subtitles-sm flex q-ml-sm">
              <div>Pending - {{ dump.Pending }}</div>
            </div>
          </div>
          <div class="col-3">
            <div class="integration-subtitles-sm flex q-ml-sm">
              <div>Issues - {{ portal.Issued }}</div>
            </div>
            <div class="integration-subtitles-sm flex q-ml-sm">
              <div>Issues - {{ dump.Issued }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="row q-gutter-md">
      <q-card
        class="q-pa-md integration-status-card"
        flat
        bordered
        v-for="status in getIntegrationStatus"
        :key="status.label"
        :class="{ 'refresh-button': status.label == 'btn' }"
      >
        <div
          v-if="status.label == 'btn'"
          class="flex justify-between items-center cursor-pointer"
          @click="getIntegrationInfo()"
        >
          <span class="text-white text-weight-bolder"> Refresh </span>
          <q-icon class="text-white" name="refresh" size="25px"> </q-icon>
        </div>
        <div v-else class="flex justify-between">
          <span class="text-caption text-weight-regular">
            {{ status.label }}
          </span>
          <span class="text-caption text-weight-medium">
            {{ status.value }}
          </span>
        </div>
      </q-card>
    </div>
    <q-btn class="new-refresh-button" @click="getIntegrationInfo()" size="8px" round icon="refresh" />
    <q-inner-loading :showing="visible">
      <q-spinner-ios class="spinner" size="50px" />
    </q-inner-loading>
  </div>
</template>
    
<script setup>
import { ref, onMounted, computed } from "vue";
import { QCard, QCardSection, QSeparator, QSpinner } from "quasar";
import { getRequest } from "@/helper/http-config";

const visible = ref(true);
const apiData = ref(null);
const totalSource = computed(() =>
  apiData.value ? apiData.value.TotalSource : 0
);
const portalData = computed(() =>
  apiData.value ? apiData.value.TotalPortal : 0
);
const dumpData = computed(() => (apiData.value ? apiData.value.TotalDump : 0));
const require = computed(() => (apiData.value ? apiData.value.required : 0));
const live = computed(() => (apiData.value ? apiData.value.live : 0));
const portal = computed(() =>
  apiData.value ? apiData.value.PortalLiveSource : 0
);
const dump = computed(() => (apiData.value ? apiData.value.DumpLiveSource : 0));
const getIntegrationStatus = computed(() => {
  if (!apiData.value) return;
  const temp = apiData.value.integrationStatusList.map((status) => {
    if (status.label === "Reverted by QA - Not Live") {
      return { label: "Reverted by QA", value: status.value };
    } else {
      return status;
    }
  });
  // temp.push({ label: 'btn'})
  return temp;
});

onMounted(() => {
  getIntegrationInfo();
});

const getIntegrationInfo = async () => {
  try {
    visible.value = true;
    const response = await getRequest("/api/dashboard/dashboard-chart");
    apiData.value = response.data.customResponse;
    visible.value = false;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
};
</script>
    
<style scoped>
.dashboard-header {
  display: flex;
  border: 1px solid var(--q-dashboard-card-border);
  border-radius: 4px;
  width: 100%;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  color: var(--q-gray);
}
.total-sources-card {
  min-width: 191px;
}
.total-sources-heading {
  color: var(--q-chart-heading);
}
.integration-card {
  min-width: 334px;
}
.integration-heading {
  color: var(--q-chart-heading);
}
.integration-subtitles-sm {
  font-size: 8px;
  font-weight: 400;
}
.integration-status-card {
  min-width: 189px;
}
.refresh-button {
  background-color: var(--q-header-background);
}
.spinner {
  color: var(--q-header-background);
}
.new-refresh-button {
  position: absolute;
  top: -6%;
  right: -.5%;
  background-color: var(--q-header-background);
  color: white;
}
@media (max-width: 600px) {
  .dashboard-header {
    flex-direction: column;
  }
}
</style>
    