<template>
  <q-table
    bordered
    flat
    rows="rows"
    :dense="$q.screen.xs"
    class="region-table"
    columns="columns"
    row-key="name"
    virtual-scroll
    separator="cell"
    :pagination="pagination"
    :rows-per-page-options="[10]"
    :loading="loading"
  >
    <template v-slot:header="props">
      <q-tr>
        <q-th rowspan="2" :props="props" key="regions">Regions</q-th>
        <q-th rowspan="2" :props="props" key="total">Total</q-th>
        <q-th colspan="2" style="text-align: center">Official</q-th>
        <q-th colspan="2" style="text-align: center">Unofficial</q-th>
      </q-tr>
      <q-tr>
        <q-th
          :props="props"
          style="border-left: 1px solid var(--q-table-border)"
          key="officialFree"
          >Free</q-th
        >
        <q-th :props="props" key="officialPaid">Paid</q-th>
        <q-th :props="props" key="unOfficialFree">Free</q-th>
        <q-th :props="props" key="unOfficialPaid">Paid</q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="regions" auto-width :props="props">
          {{ props.row.region_name }}
        </q-td>
        <q-td key="total" auto-width :props="props">
          {{ props.row.total }}
        </q-td>
        <q-td key="officialFree" auto-width :props="props">
          {{ props.row.totalOfficialFree }}
        </q-td>
        <q-td key="officialPaid" auto-width :props="props">
          {{ props.row.totalOfficialPaid }}
        </q-td>
        <q-td key="unOfficialFree" auto-width :props="props">
          {{ props.row.totalUnOfficialFree }}
        </q-td>
        <q-td key="unOfficialPaid" auto-width :props="props">
          {{ props.row.totalUnOfficialPaid }}
        </q-td>
      </q-tr>
    </template>

    <!-- <template v-slot:pagination="scope">
      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        flat
        :disable="scope.isFirstPage"
        @click="scope.prevPage"
      />

      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        :disable="scope.isLastPage"
        @click="scope.nextPage"
      />
    </template> -->
  </q-table>
</template>

<script setup>
defineProps(["columns, rows, pagination"]);
</script>

<style scoped>
.region-table table thead tr th {
  position: sticky;
  top: 0;
  background-color: var(--q-header-background);

}
.region-table table thead tr:nth-child(2) th {
  position: sticky;
  top: 56px;
  background-color: var(--q-header-background);
}
</style>
