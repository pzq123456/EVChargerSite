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

// download function

const download = () => {
  const data = JSON.stringify(geoJSONData.value, null, 2)
  const blob = new Blob([data], { type: 'text/json' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  a.click()
  window.URL.revokeObjectURL(url)
}

</script>

<template>
  <form id="search">
    Search <input id="query" name="query" v-model="searchQuery">
  </form>

  <DemoGrid
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery">
  </DemoGrid>

  <button class="download" @click="download">
    Download
  </button>
  
</template>

<style scoped>
  #search {
    margin-bottom: 10px;
  }

  #query {
    border: 1px solid var(--vp-c-gray-3);
    border-radius: 5px;
  }

  #query:focus {
    border: 1px solid var(--vp-c-green-3);
    transition: border 0.3s;
    background-color: var(--vp-c-gray-soft);
  }

  .download {
    margin: 10px 0;
    padding: 5px 10px;
    font-size: 1em;
    background-color: var(--vp-c-green-3);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
