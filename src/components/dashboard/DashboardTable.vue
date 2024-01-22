<template>
  <q-table
    flat
    bordered
    :dense="$q.screen.xs"
    :rows="rows"
    class="dashboard-table"
    :columns="columns"
    row-key="name"
    virtual-scroll
    separator="cell"
    :loading="loading"
    :pagination="pagination"
    :rows-per-page-options="[5, 10]"
    @update:pagination="handlePagination"
  >
    <template v-slot:bottom>
      <div
        style="
          font-size: 11px;
          font-weight: 500;
          line-height: 15.4px;
          color: var(--q-text-heading);
        "
      >
        Total Results: {{ pagination?.totalCount }}
      </div>
      <q-space />
      <span class="text-caption">Rows Per Page: </span>
      <DropDown
        dense
        borderless
        style="border: none"
        @changeValue="handleRows"
        v-model="rowsPerPage"
        class="q-mx-sm"
        default
        :option="['5', '7', '10']"
        appendIcon=""
        prependIcon=""
      />

      <span class="text-caption"
        >Page: {{ pagination?.page }} of {{ pagination?.totalPages }}</span
      >
      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination?.page === 1 || loading"
        @click="handlePage(pagination?.page - 1, pagination?.rowsPerPage)"
      />
      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination?.totalPages === pagination?.page || loading"
        @click="handlePage(pagination?.page + 1, pagination?.rowsPerPage)"
      />
    </template>
  </q-table>
</template>
<script setup>
import { useDashboardStore } from "@/store/dashboard-store";
import { computed, defineProps, ref } from "vue";
const { columns, loading, pagination } = defineProps([
  "rows",
  "columns",
  "loading",
  "pagination",
]);
const emit = defineEmits(["paginationData"]);
const updatePagination = ref(null);
const rowsPerPage = ref("10");
const dashboardStore = useDashboardStore();

const handleRows = (value) => {
  rowsPerPage.value = value;

  handlePage(1, value === "All" ? -1 : value);
};
const handlePage = (pageNumber, rows) => {
  emit("paginationData", pageNumber, rows);
};
</script>


<style>
.dashboard-table {
  max-height: 600px;
  height: 100%;
  overflow: auto;
}
.dashboard-table table thead tr th {
  position: sticky;
  top: 0px;
  background-color: var(--q-header-background) !important;
}
</style>
