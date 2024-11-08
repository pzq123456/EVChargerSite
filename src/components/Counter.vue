<template>
    <div v-if="selectedRegion" class="region">
      <timezone :country="selectedRegion.name" :countryFlag="selectedRegion.ISO2" />
      <!-- <h1>{{ selectedRegion.name }}</h1> -->
      CargeStation Count: 
        <p class="num">
          {{ selectedRegion.count }}
        </p>

    </div>

    <div v-else>
      <p>please select a region</p>
    </div>

    <div v-if="policy" class="policy">
      <law :policy="policy" />
    </div>

    <div v-else>
      <div class="notfound">
        <p>Policy not found</p>
      </div>
    </div>

    <bar-chart />

</template>

<script setup>

import { useMapStore } from '@/stores/mapStore';
import { computed } from 'vue';
import { data } from '@/loader/policy.data.js';
import law from '@/components/policy/Law.vue';
import timezone from '@/components/chart/TimeZone.vue';
import BarChart from './chart/BarChart.vue';

const mapStore = useMapStore();

const hoveredRegion = computed(() => mapStore.hoveredRegion);
const selectedRegion = computed(() => mapStore.selectedRegion);

// 匹配 选择区域国家名 与 数据中的国家名 匹配结果返回 data 中的数据 若无匹配则返回 null

function getRegionData(regionName) {
  // data 是一个 json 文件 国家名作为键值
  return data[regionName] || null;
}

// 获取国家的法律条文 并渲染到页面上

const policy = computed(() => {
  if (selectedRegion.value) {
    const regionData = getRegionData(selectedRegion.value.name);
    return regionData;
  }
  return null;
});

</script>

<style scoped>
  .policy {
    border-top: 1px solid var(--vp-c-border);
    padding-top: 10px;
  }
  h1 {
    font-size: 1.5em;
  }
  .region {
    font-family: Arial, sans-serif;
    margin: 10px;
    background-color: var(--vp-c-gray-soft);
  }

  .num {
    font-size: 1.5em;
    color: var(--vp-c-success-1);
  }

  .notfound {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: var(--vp-c-gray-soft);
    color: var(--vp-c-warning-1);
  }

</style>
