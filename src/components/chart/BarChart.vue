<template>
  <div class="chartCointer">
    <Bar
      id="my-chart-id"
      :data="data"
      :options="options"
    />
  </div>
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { computed } from 'vue';

  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const props = defineProps({
    inputData: Object
  })

  const data = computed(
    () => {
      return transformData(props.inputData)
    }
  )

  const options = {
      responsive: true,
  }

  function transformData(inputData){
    return alignData(inputData);
};

// 合并标签并补全空缺
function alignData(inputData){
    // 提取cnev和cn的标签和数据
    const labelsCnev = inputData.labels.cnev || [];
    const dataCnev = inputData.data.cnev.map(val => val === "null" ? null : parseFloat(val));
    
    const labelsCn = inputData.labels.cn || [];
    const dataCn = inputData.data.cn.map(val => parseFloat(val));

    // 合并并排序标签
    const allLabels = Array.from(new Set([...labelsCnev, ...labelsCn])).sort((a, b) => a - b);

    // 对齐cnev数据
    const alignedDataCnev = allLabels.map(label => {
        const index = labelsCnev.indexOf(label);
        return index !== -1 ? dataCnev[index] : null; // 如果标签在cnev中，取对应数据，否则为null
    });

    // 对齐cn数据
    const alignedDataCn = allLabels.map(label => {
        const index = labelsCn.indexOf(label);
        return index !== -1 ? dataCn[index] : null; // 如果标签在cn中，取对应数据，否则为null
    });

    // 返回合并后的结果
    return {
        labels: allLabels,
        datasets: [
            {
                label: 'EVCar Retain Data',
                backgroundColor: '#f87979',
                data: alignedDataCnev
            },
            {
                label: 'Private Car Data',
                backgroundColor: '#7bb6a4',
                data: alignedDataCn
            }
        ]
    };
};
  </script>

<style scoped>
.chartCointer {
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  padding: 10px;
  background-color: var(--vp-c-gray-soft);
}
</style>