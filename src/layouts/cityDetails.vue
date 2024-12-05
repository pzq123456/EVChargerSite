<template>
    <div v-if="selectedCity" class="region">
      {{ selectedColumn }}
      <h1>
        {{ name }}
      </h1>
        {{ selectedCity }}
    </div>

    <div v-else>
      <p>please select a region</p>
    </div>

</template>

<script setup>
/**
 * @file mapDetails.vue
 * - 地图详情展示组件，用户点击地图上的某一区域时弹出
 * - 可以展示包括时区、法律条文、柱状图等信息
 * - 后续会集成更多的数据展示
 */
import { useCityStore } from '@/stores/cityStore';
import { computed } from 'vue';

const cityStore = useCityStore();

const selectedCity = computed(() => cityStore.selectedCity);
const selectedColumn = computed(() => cityStore.selectedColumn);


const name = computed(() => getName(selectedCity.value));


function getName(selectedCity) {
  if (selectedCity.cityname && selectedCity.pname) {
    return `${selectedCity.cityname}, ${selectedCity.pname}`;
  }else if (selectedCity.NAME_2 && selectedCity.NAME_1) {
    return `${selectedCity.NAME_2}, ${selectedCity.NAME_1}`;
  }else{
    return '';
  }
}

</script>

<style scoped>
  h1 {
    font-size: 1.5em;
  }
</style>
