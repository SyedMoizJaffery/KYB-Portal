<template>
  <div class="q-pa-md" style="padding-top: 0px;">
    
    <create-user-header></create-user-header>

    <UserTable
      :columns="columns"
      :rows="users"
      :loading="loading"
      :pagination="pagination"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import UserTable from "./UserTable.vue";
import { useUserStore } from "@/store/user-store";
import CreateUserHeader from "../user-management/CreateUserHeader.vue";
const { users, loading, pagination: userPagination } = storeToRefs(useUserStore());
const pagination = ref({
  sortBy: "desc",
  descending: true,
  page: useUserStore.pagination?.currentPage || 1,
  totalPages: useUserStore.pagination?.totalPages,
  totalResult: useUserStore.pagination?.totalUSers,
  rowsPerPage: 10,
});
const columns = [
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "role",
    align: "center",
    label: "Role",
    field: "role",
    sortable: true,
  },
  {
    name: "createdBy",
    align: "center",
    label: "Created By",
    field: "createdBy",
    sortable: true,
  },
  {
    name: "createdAt",
    align: "center",
    label: "Created At",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "currentStatus",
    align: "center",
    label: "Current Status",
    field: "currentStatus",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
    sortable: true,
  },
];
onMounted(() => {
  useUserStore().fetchUsers(1, "");
});
</script>
