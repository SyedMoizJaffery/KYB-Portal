<template>
  <div class="dashboard">
    <div class="q-pa-md dashboard-header" flat bordered>
      <q-card
        v-for="(item, index) in dashboardItems"
        :key="index"
        flat
        bordered
        :class="['card', { 'integration-card': item.title === 'Integration' }]"
      >
        <q-card-section class="card-section">
          <div class="row items-center">
            <span class="table-headings col">{{ item.title }}</span>
            <span
              v-for="(value, key) in item.totals"
              :key="key"
              class="table-numbers col text-right"
              >{{ key }} {{ value }}</span
            >
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <template v-if="item.title === 'Total Sources'">
            <div
              v-for="(value, key) in item.subtitles"
              :key="key"
              class="row items-center"
            >
              <span class="col-6 table-one-subtitles">{{ key }}</span>
              <span class="col-6 table-one-subtitles text-right">{{
                value
              }}</span>
            </div>
          </template>
          <template v-else-if="item.title === 'Integration'">
            <div
              v-for="(statuses, category) in item.subtitles"
              :key="category"
              class="row items-center"
            >
              <span class="col-2 table-two-subtitles">{{ category}}</span>
              <span class="col-1" style="color: var(--q-table-subtitles);">{{ statuses.Total }}</span>
              <template
                v-for="(statusValue, statusName) in statuses"
                :key="statusName"
              >
                <span
                  class="col-3 table-two-subtitles text-right"
                  style="font-size: 8px"
                  v-if="statusName !== 'Total'"
                  >{{ statusName }}: {{ statusValue }}</span
                >
              </template>
            </div>
          </template>
        </q-card-section>
      </q-card>
      <div class="status-cards">
        <q-card
          v-for="(status, index) in statusItems"
          :key="`status-${index}`"
          flat
          bordered
          class="status-card"
        >
          <q-card-section class="flex justify-between">
            <div class="table-three-subtitles">{{ status.title.split(' - ')[0].replace(' but ', ', ')  }}</div>
            <div class="table-three-subtitles">{{ status.value }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { QCard, QCardSection, QSeparator, QSpinner } from "quasar";
import { getRequest } from "@/helper/http-config";

const dashboardItems = ref([]);
const statusItems = ref([]);

const getIntegrationInfo = async () => {
  try {
    const response = await getRequest("/api/dashboard/dashboard-chart");

    const apiData = response.data.customResponse;

    dashboardItems.value = [
      {
        title: "Total Sources",
        totals: {
          "": apiData.TotalSource.toString(),
        },
        subtitles: {
          Portals: apiData.TotalPortal.toString(),
          Dumps: apiData.TotalDump.toString(),
        },
      },
      {
        title: "Integration",
        totals: {
          Required: apiData.required.toString(),
          Live: apiData.live.toString(),
        },
        subtitles: {
          Portals: {
            Total: apiData.PortalLiveSource.totalPortal.toString(),
            Live: apiData.PortalLiveSource.Live.toString(),
            Pending: apiData.PortalLiveSource.Pending.toString(),
            Issued: apiData.PortalLiveSource.Issued.toString(),
          },
          Dumps: {
            Total: apiData.DumpLiveSource.totalDump.toString(),
            Live: apiData.DumpLiveSource.Live.toString(),
            Pending: apiData.DumpLiveSource.Pending.toString(),
            Issued: apiData.DumpLiveSource.Issued.toString(),
          },
        },
      },
    ];

    statusItems.value = Object.entries(
      apiData.integrationStatus.integrationStatusCount
    ).map(([title, value]) => ({
      title,
      value: value.toString(),
    }));
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
};

onMounted(() => {
  getIntegrationInfo();
});
</script>
  
  <style scoped>
.status-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-left: 16px;
}
.dashboard {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  gap: 16px;
}

.dashboard-header {
  display: flex;
  /* flex-wrap: wrap; */
  border: 1px solid var(--q-dashboard-card-border);
  border-radius: 4px;
  width: 100%;
}

.card {
  flex-shrink: 0;
  margin-right: 16px;
}
.status-card{
  margin-bottom: 0px;
}
.integration-card {
  flex: 0 0 auto;
  width: 320px;
}
.card-section {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  text-align: left;
}
.table-headings {
  font-size: 14px;
  color: var(--q-heading-card);
}
.table-numbers {
  font-size: 14px;
  color: var(--q-table-numbers);
}
.table-one-subtitles {
  font-size: 12px;
  color: var(--q-table-subtitles);
}
.table-two-subtitles {
  font-size: 12px;
  color: var(--q-table-subtitles);
}
.table-three-subtitles {
  font-size: 12px;
  color: var(--q-table-subtitles);
}
.q-card {
  max-width: 100%;
}

.text-h5 {
  font-size: 1.5em;
  font-weight: bold;
}

.text-subtitle2 {
  font-size: 0.875em;
}

.row {
  width: 100%;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  min-width: 0;
}

@media (max-width: 600px) {
  .dashboard-header {
    flex-direction: column;
  }
}
</style>
  