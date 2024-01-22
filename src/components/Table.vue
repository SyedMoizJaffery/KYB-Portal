<template>
    <div class="q-pa-md">
      <q-table
        flat bordered
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="calories" :props="props">
              <q-badge color="green">
                {{ props.row.calories }}
              </q-badge>
            </q-td>
            <q-td key="fat" :props="props">
              <q-badge color="purple">
                {{ props.row.fat }}
              </q-badge>
            </q-td>
            <q-td key="carbs" :props="props">
              <q-badge color="orange">
                {{ props.row.carbs }}
              </q-badge>
            </q-td>
            <q-td key="protein" :props="props">
              <q-badge color="primary">
                {{ props.row.protein }}
              </q-badge>
            </q-td>
            <q-td key="sodium" :props="props">
              <q-badge color="teal">
                {{ props.row.sodium }}
              </q-badge>
            </q-td>
            <q-td key="calcium" :props="props">
              <q-badge color="accent">
                {{ props.row.calcium }}
              </q-badge>
            </q-td>
            <q-td key="iron" :props="props">
              <q-badge color="amber">
                {{ props.row.iron }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  
  <script>
  const columns = [
    { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
    { name: 'type', label: 'Type', field: 'type', sortable: true },
    { name: 'country', label: 'Country', field: 'country' },
    { name: 'created-at', label: 'Created At', field: 'created-at' },
    { name: 'category', label: 'Category', field: 'category' },
    { name: 'body', label: 'Body', field: 'body', sortable: true },
    { name: 'date-range', label: 'Date Range', field: 'date-range', sortable: true },
    { name: 'total-enteties', label: 'Total Entities', field: 'total-entities', sortable: true },
    { name: 'details', label: 'Details', field: 'details', sortable: true }
  ]
  
  const rows = [
    
  ]
  
  export default {
    setup () {
      return {
        onRowClick: (row) => alert(`${row.name} clicked`),
        columns,
        rows
      }
    }
  }
  </script>
  