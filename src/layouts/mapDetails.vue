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
/**
 * @file mapDetails.vue
 * - 地图详情展示组件，用户点击地图上的某一区域时弹出
 * - 可以展示包括时区、法律条文、柱状图等信息
 * - 后续会集成更多的数据展示
 */
import { useMapStore } from '@/stores/mapStore';
import { computed } from 'vue';

import law from '@/components/policy/Law.vue';
import timezone from '@/components/chart/TimeZone.vue';
import BarChart from '@/components/chart/BarChart.vue';

import { getRegionData } from '@/services/law.js';

const mapStore = useMapStore();

// const hoveredRegion = computed(() => mapStore.hoveredRegion);
const selectedRegion = computed(() => mapStore.selectedRegion);

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
