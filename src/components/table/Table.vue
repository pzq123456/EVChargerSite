<!--
该示例创建了一个可复用网格组件，并结合外部数据使用它。
-->

<script setup>
import DemoGrid from './Grid.vue'
import { ref } from 'vue'

import { data } from '@/loader/eu.data.js'


const searchQuery = ref('')
const { gridColumns, gridData } = geoJSONParse(data)

function geoJSONParse(data) {
    console.log(data);
    const features = data.features;
    const columns = Object.keys(features[0].properties);
    const gridData = features.map((feature) => {
        return feature.properties;
    });
    return { gridColumns: columns, gridData };
}

</script>

<template>
  <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form>
  <DemoGrid
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery">
  </DemoGrid>
</template>

<style>
  #search {
    margin-bottom: 10px;
  }

  #search input[type="text"] {
    width: 100%;
    padding: 5px;
    font-size: 1em;
    border: 1px solid #ddd;
  }

  #search input[type="text"]:focus {
    border-color: #fbfbfb;
  }

</style>
