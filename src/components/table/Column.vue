<template>
    <div>
      <table class="simple-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(value, key, index) in data" :key="key" :class="{ active: index === activeRow }">
                <td>{{ index + 1 }}</td>
                <td>{{ key }}</td>
                <td>{{ value }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>

    import { computed } from "vue";

    const props = defineProps({
      data: Object,
      activeColumn: String,
    });

    const data = props.data;
    const activeColumn = props.activeColumn;

    const activeRow = computed(() => {
      return Object.keys(data).indexOf(activeColumn);
    });

  </script>
  
  <style scoped>
  /* .simple-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 16px;
    text-align: left;
  }
  .simple-table th,
  .simple-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .simple-table tbody tr:hover {
    background-color: #f2f2f2;
  } */
  .simple-table tr.active {
    background-color: yellow;
  }
  </style>
  