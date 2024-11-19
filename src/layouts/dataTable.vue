
<template>
  <Switcher :buttons="buttons" v-model:activeIndex="activateIndex" />
  <Table :geoJSONData="geoJSONData"> 
    <button 
      class="download" >
      
      <a href="./contact">
        Download All
      </a>
    </button>
  </Table>
</template>

<script setup>
import { ref, computed } from 'vue';

import Table from '../components/table/Table.vue';

import Switcher from '../components/Switcher.vue';

import { data as eu } from '@/loader/eu.data.js';
import { data as us } from '@/loader/us.data.js';
import { data as cn } from '@/loader/cn.data.js';

const buttons = ['eu', 'us', 'cn'];

const activateIndex = ref(0);

const geoJSONData = ref(null);

// Id Count Name Geometry

const euFields = ['count', 'name', 'geometry'];
const usFields = ['count', 'name', 'geometry'];
const cnFields = ['count', 'name', 'geometry'];

const data = {
  eu: processData(eu, 10, euFields),
  us: processData(us, 10, usFields),
  cn: processData(cn, 10, cnFields),
};


// computed 

geoJSONData.value = computed(() => {
  return data[buttons[activateIndex.value]];
});



// 数据处理函数，预处理数据 仅仅保留指定的字段 保留指定的行 例如 10 行
// 最终返回值还是一个 geoJSON 数据
function processData(data, rows = 30, fields) {
  return {
    type: 'FeatureCollection',
    features: data.features.slice(0, rows).map((feature) => {
      const newFeature = {
        type: 'Feature',
        properties: {},
        geometry: feature.geometry,
      };

      fields.forEach((field) => {
        newFeature.properties[field] = feature.properties[field];
      });

      return newFeature;
    }),
  };
}


</script>

<style scoped>
    .download {
    margin: 10px 0;
    padding: 5px 10px;
    font-size: 1em;
    color: white;
    border: solid 1px var(--vp-c-green-3);
    border-radius: 5px;
    cursor: pointer;
  }
</style>

