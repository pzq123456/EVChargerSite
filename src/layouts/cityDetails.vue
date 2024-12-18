<template>
    <div v-if="selectedCity" class="region">
      <timezone :country="countryName" />
      <div class="cityName">
        {{ cityName }}
      </div>

      <p class="num">
        {{ selectedColumn }} : {{ value }}
      </p>

      <!-- slot -->

      <slot></slot>

      <!-- <div>
        {{ selectedCity }}
      </div> -->
      <Column :data="selectedCity" :activeColumn="selectedColumn" />

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
import Column from "@/components/table/Column.vue";

const cityStore = useCityStore();

const selectedCity = computed(() => cityStore.selectedCity);
const selectedColumn = computed(() => cityStore.selectedColumn);

const value = computed(() => {
  if(selectedCity.value[selectedColumn.value]){
    return selectedCity.value[selectedColumn.value].toFixed(2);
  }else if(selectedCity.value.V) {
    return selectedCity.value.V.toFixed(2);
  }else if(selectedCity.value.count){
    return selectedCity.value.count;
  }else{
    return 'N.A.';
  }
});

const cityName = computed(() => {
  const name = getCityName(selectedCity.value);
  if (isChineseChar(name)) {
    // return pinyin(name, { toneType: 'none' }) + '(' + name + ')';
    // return pinYin(handleChineseCityName(name)) + '(' + name + ')';
    return handleChineseCityName(name);
    
    
  }else{
    return name;
  }
});


// 帮助函数 处理中国地名 将 省替换为 Province 自治区替换为 Autonomous Region 市替换为 City 
// 省 -> Province
// 自治区 -> Autonomous Region
// 市 -> City
// 特别行政区 -> Hong Kong, Macau
// 直辖市 -> Municipality

const keyWordsMap = {
  '省': 'Province',
  '自治区': 'Autonomous Region',
  '市': 'City',
  '香港': 'Hong Kong',
  '澳门': 'Macau',
  '直辖市': 'Municipality'
}

function handleChineseCityName(name) {
  // 首先识别中文字符中是否含有关键字
  for (let key in keyWordsMap) {
    if (name.includes(key)) {
      return pinyin(name.replace(key, ''), {
        toneType: 'none'
      }).replace(/\s+/g, '').charAt(0).toUpperCase() + pinyin(name.replace(key, ''), {
        toneType: 'none'
      }).replace(/\s+/g, '').slice(1) + ' ' 
      + keyWordsMap[key];
    }
  }
}


const countryName = computed(() => getCountryName(selectedCity.value));

function getCountryName(selectedCity) {
  if (selectedCity.pname) {
    return selectedCity.pname;
  }else if(selectedCity.COUNTRY) {
    // return selectedCity.COUNTRY;
    return selectedCity.NAME_1 + ', ' + selectedCity.COUNTRY;
  }else if(selectedCity.NAME_1) {
    return selectedCity.NAME_1;
  }else{
    return null;
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

// 帮助函数判断是否为中文字符
function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
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
    padding: 10px;

    color: var(--vp-c-success-1);
  }

  .cityName {
    font-size: 1.5em;
    padding: 10px;
    color: var(--vp-c-text);
  }

</style>
