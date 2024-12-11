<template>

      <table class="simple-table">
        <thead>
          <tr>
            <th></th>
            <th>Column</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(column, index) in columns" :key="column" :class="{ active: index === activeRow }">
                <td>{{ index + 1 }}</td>
                <td>{{ column }}</td>
                <!-- <td>{{ data[column] }}</td> -->

                <!-- vif 将 0 替换为 N/A -->
                <td v-if="data[column] === 0">N/A</td>
                <td v-else>{{ data[column] }}</td>
            </tr>
        </tbody>
      </table>

  </template>
  
  <script setup>
    import { toRef, computed } from "vue";

    const props = defineProps({
      data: Object,
      activeColumn: String,
    });

    const data = toRef(props, 'data');
    const activeColumn = toRef(props, 'activeColumn');

    // 对数据进行过滤 同时保持响应性
    // const filter = (d) => !isNaN(parseInt(data.value[d])) && d !== 'area';
    const filter = (d) => !isNaN(parseInt(data.value[d])) && d !== 'area' && !d.includes('zscore') // 去除 area 和含有 zscore 的列
   
    // 获取所有的列
    const columns = computed(() => { 
      // return Object.keys(data.value).filter(filter)
      return sortColumnsByNumber(Object.keys(data.value).filter(filter));
    });

    // 获取当前激活的行
    const activeRow = computed(() => {
      return columns.value.indexOf(activeColumn.value);
    });

    function extractNumberFromString(str) {
        // 提取字符串中的数字
        const match = str.match(/\d+/g);
        return match ? parseInt(match[0]) : null; // 返回第一个数字，如果没有数字返回 null
    }

    function sortColumnsByNumber(columns) {
        return columns.slice().sort((a, b) => {
            const numA = extractNumberFromString(a);
            const numB = extractNumberFromString(b);

            // 若两者都有数字，则按数字升序排列
            if (numA !== null && numB !== null) {
                return numA - numB;
            }

            // 若只有一个含有数字，则无数字的放在后面
            if (numA !== null) return -1;
            if (numB !== null) return 1;

            // 若两者都没有数字，则保持原样的顺序
            return 0;
        })
        // .map((column) => column.replace(/[_-]/g, ' ')).map((column) => column.replace(/(\d+)/g, ' $1 ')); // 下次优化

        // 同时将 key 中的 _ - 等字符替换为空格 在数字前后加空格

    }



    // // filter filter = (d) => !isNaN(parseInt(this._data.features[0].properties[d])) && d !== 'area' // 获取其中所有值为数字的列 同时去除 area 列
    // const filter = (d) => !isNaN(parseInt(data.value[d])) && d !== 'area';
    // // 对data使用过滤器
    // // const columns = 
    // const columns = computed(() => Object.keys(data.value).filter(filter));

    // const activeRow = computed(() => {
    //   return columns.indexOf(activeColumn.value);
    // });

  </script>
  
  <style scoped>
  .simple-table {
    width: 100%;
    border-radius: 5px;
    border-collapse: collapse;
    margin: 0 auto;
    padding: 10px;
  }

  .simple-table thead th {
    background-color: #12644668;
    text-align: left;
    font-weight: bold;
  }

  .simple-table tr.active {

    background-color: rgba(234, 255, 0, 0.395);
    font-weight: bold;
    animation: fadeIn 0.5s;
  }

  .simple-table td {
    border : 1px solid var(--vp-c-border);
    padding: 5px;
  }

  @keyframes fadeIn {
    from {
      border: 2px solid rgba(18, 195, 18, 0.492);
      opacity: 0;
    }
    to {
      border: 2px solid rgba(18, 195, 18, 0.492);
      opacity: 1;
    }
  }



  </style>
  