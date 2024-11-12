<!--
该示例创建了一个可复用网格组件，并结合外部数据使用它。
-->

<script setup>
import DemoGrid from './Grid.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  geoJSONData: Object
})

const geoJSONData = ref(props.geoJSONData)

const searchQuery = ref('')

const gridData = ref([])

const gridColumns = ref([])

watch(geoJSONData, (newVal) => {
  const { gridData: data, gridColumns: columns } = geoJSONParse(newVal)
  gridData.value = data
  gridColumns.value = columns
}, { immediate: true })

function geoJSONParse(data) {
    const features = data.features;
    const columns = Object.keys(features[0].properties);

    // 加一列默认的 id
    columns.unshift('id');

    let gridData = features.map((feature, index) => {
        return {
            id: index,
            ...feature.properties
        };
    });

    // 加一列 geometry 将 geometry 的类型展示出来
    columns.push('geometry');

    gridData.forEach((item, index) => {
        item.geometry = features[index].geometry.type;
    });

    return {
        gridData,
        gridColumns: columns
    };
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
