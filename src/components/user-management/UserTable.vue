<template>
  <q-table
    bordered
    dense
    flat
    :rows="rows"
    class="user-table"
    :columns="columns"
    row-key="name"
    virtual-scroll
    :loading="loading"
    :pagination="pagination"
    :filter="filter"
    separator="cell"
  >
    <!-- <template v-slot:top>
      <q-input
        borderless
        dense
        debounce="300"
        color="primary"
        v-model="filter"
        label="Search By User Name"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space />
      
      <q-btn
        color="primary"
        flat
        class="q-ma-xs text"
        @click="addRow"
        text-color="var(--q-text-active)"
      >
        <img :src="leftIcon" alt="Left Icon" class="q-mr-sm icons" />
        <span class="btn-text"> Select Role </span>
        <img :src="rightIcon" alt="Right Icon" class="q-ml-sm icon" />
      </q-btn>
   
      <q-btn class="q-ml-sm text" color="primary" flat @click="removeRow">
        <img :src="leftIcon2" alt="Left Icon" class="q-mr-sm icons" />
        <span class="btn-text"> Select Date Range</span>
        <img :src="rightIcon2" alt="Right Icon" class="q-ml-sm icon" />
      </q-btn>
    </template> -->

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{ props.row.full_name }}
        </q-td>
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="role" :props="props">
          {{ props.row.role }}
        </q-td>
        <q-td key="createdBy" :props="props">
          {{ props.row.created_by }}
        </q-td>
        <q-td key="createdAt" :props="props">
          {{ formatDate(props.row.createdAt) }}
        </q-td>
        <q-td key="currentStatus" :props="props">
          <q-badge :color="getStatusColor(props.row.is_active)">
            {{ props.row.is_active }}
          </q-badge>
        </q-td>

        <q-td key="actions" :props="props">
          <q-btn
            flat
            round
            color="white"
            text-color="black"
            toggleUser="true"
            size="sm"
            class="nav-link"
          >
            <img src="../../assets/icons/edit.png" alt="" style="height: 20px;width: 20px;"/>
            <q-tooltip
              transition-show="scale"
              style="
                background: var(--q-header-background);
                color: var(--q-text-heading);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              Edit Detail
            </q-tooltip>
          </q-btn>
          <!-- 
          <q-btn
            flat
            round
            color="white"
            text-color="black"
            toggleUser="true"
            size="sm"
            class="nav-link"
          >
            <img src="@/assets/icons/Eye.png" alt="" />
            <q-tooltip
              transition-show="scale"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              View Detail
            </q-tooltip>
          </q-btn>
          -->
        </q-td>
      </q-tr>
    </template>

    <!--Pagination-->

    <template v-slot:bottom>
      <div
        style="
          font-size: 11px;
          font-weight: 500;
          line-height: 15.4px;
          color: var(--q-text-heading);
        "
      >
        Total Users : {{ userStore.pagination?.totalUsers }}
      </div>
      <q-space />
      <span class="text-caption">Rows Per Page:</span>
      <DropDown
        dense
        borderless
        style="border: none"
        @changeValue="handleRows"
        v-model="rowsPerPage"
        class="q-mr-sm q-pl-none"
        default
        :option="['5', '7', '10', '20', '50', 'All']"
        appendIcon=""
        prependIcon=""
      />
      <span class="text-caption"
        >Page: {{ userStore.pagination?.currentPage }} of
        {{ userStore.pagination?.totalPages }}</span
      >
      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        flat
        :disable="!userStore.hasPreviousPage || loading"
        @click="handlePage(page - 1, pagination?.rowsPerPage)"
      />

      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        :disable="!userStore.hasNextPage || loading"
        @click="handlePage(page + 1, pagination?.rowsPerPage)"
      />
    </template>
  </q-table>
</template>

<script setup>
import { formatDate } from "@/helper";
import { useUserStore } from "@/store/user-store";
import { defineProps, ref, onMounted, watchEffect } from "vue";

const filter = ref("");
const userStore = useUserStore();
const rowsPerPage = ref("10");
const page = ref(1);
const data = ref({
  hasNextPage: false,
  hasPreviousPage: false,
});
const handleRows = (value) => {
  rowsPerPage.value = value;
  handlePage(1, value === "All" ? -1 : value);
};
defineProps(["rows", "coulmns", "loading", "pagination"]);
const leftIcon = ref(require("@/assets/icons/user-opt.png"));
const rightIcon = ref(require("@/assets/icons/vector.png"));
const leftIcon2 = ref(require("@/assets/icons/Calendar.png"));
const rightIcon2 = ref(require("@/assets/icons/vector.png"));

const addRow = () => {};
const getStatusColor = (status) => {
  return status === "Active"
    ? "positive"
    : status === "Blocked"
    ? "negative"
    : "";
};

const removeRow = () => {};
// const pagination = ref({
//   sortBy: "desc",
//   descending: false,
//   page: userStore.state.page,
//   rowsPerPage: 15,
// });

const handlePage = (pageNumber) => {
  page.value = pageNumber;
  userStore.fetchUsers(
    page.value,
    filter.value,
    rowsPerPage?.value === "All" ? -1 : rowsPerPage?.value
  );
};
// const handleFilterChange = (value) => {
//   filter.value = value;
//   userStore.fetchUsers(page.value, filter.value);
// };

// watchEffect(() => {
//   userStore.fetchUsers(page.value, filter.value);
// });

// onMounted(() => {
//   userStore.fetchUsers(page.value, filter.value);
// });
</script>

<style>
.active {
  color: green;
}

.blocked {
  color: red;
}
.user-table {
  max-height: 600px;
  height: 100%;
}
.user-table table thead tr th {
  position: sticky;
  top: 0px;
  background-color: var(--q-header-background) !important;
}

</style>
