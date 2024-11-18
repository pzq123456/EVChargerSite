
<template>
  <Switcher :buttons="buttons" v-model:activeIndex="activateIndex" />
  <Table :geoJSONData="geoJSONData" />
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

const data = {
  eu,
  us,
  cn,
};

// computed 

geoJSONData.value = computed(() => {
  return data[buttons[activateIndex.value]];
});

</script>

