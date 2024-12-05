<template>
    <div v-if="selectedCity" class="region">
      <timezone :country="countryName" />
      <h1>
        {{ cityName }}
      </h1>

      <p class="num">
        {{ selectedColumn }} : {{ selectedCity[selectedColumn].toFixed(2) }}
      </p>


    </div>

    <div v-else>
      <p>please select a region</p>
    </div>


</template>

<script setup>

import { useCityStore } from '@/stores/cityStore';
import { computed } from 'vue';
import timezone from '@/components/chart/TimeZone.vue';
import { pinyin } from 'pinyin-pro';

const cityStore = useCityStore();

const selectedCity = computed(() => cityStore.selectedCity);
const selectedColumn = computed(() => cityStore.selectedColumn);


const cityName = computed(() => {
  const name = getCityName(selectedCity.value);
  if (isChineseChar(name)) {
    return pinyin(name, { toneType: 'none' }) + '(' + name + ')';
  }else{
    return name;
  }
});

const countryName = computed(() => getCountryName(selectedCity.value));

function getCountryName(selectedCity) {
  if (selectedCity.cityname && selectedCity.pname) {
    return selectedCity.pname;
  }else if (selectedCity.GID_0) {
    return selectedCity.GID_0;
  }else{
    return '';
  }
}


function getCityName(selectedCity) {
  if (selectedCity.cityname && selectedCity.pname) {
    return `${selectedCity.cityname}`;
  }else if (selectedCity.NAME_2 && selectedCity.NAME_1) {
    return `${selectedCity.NAME_2}`;
  }else{
    return '';
  }
}

// // 固定两位小数
// function toFixed2(num) {
//   return num.toFixed(2);
// }

// 帮助函数判断是否为中文字符
function isChineseChar(str) {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}

</script>

<style scoped>
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

</style>
