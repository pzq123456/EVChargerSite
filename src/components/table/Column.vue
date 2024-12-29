<template>
  <div>
    <table class="simple-table">
      <thead>
        <tr>
          <th></th>
          <!-- 同样检查 column 是否等于 V -->
          <!-- <th>Column</th> -->
          <th v-if="columns[0] !== 'V'">Column</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(column, index) in columns"
          :key="column"
          :class="{ active: index === activeRow }"
        >
          <td>{{ index + 1 }}</td>
          <!-- 若 column 等于 V 则不渲染column名 -->
          <!-- <td>{{ column }}</td> -->
          <td v-if="column !== 'V'">{{ column }}</td>
          <td v-if="data[column] === 0"> N.A. </td>
          <td v-else>{{ formatValue(data[column]) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 工具条 -->
    <div class="toolbar">
      <span>Decimal Places:</span>
      <button class="control-button" @click="decreaseDecimal">-</button>
      <span class="decimal-value">{{ decimalPlaces }}</span>
      <button class="control-button" @click="increaseDecimal">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, computed } from "vue";

const props = defineProps({
  data: Object,
  activeColumn: String,
});

const data = toRef(props, "data");
const activeColumn = toRef(props, "activeColumn");

// 用户定义的小数位数，默认 2
const decimalPlaces = ref(2);

// 增加小数位数
const increaseDecimal = () => {
  if (decimalPlaces.value < 10) {
    decimalPlaces.value += 1;
  }
};

// 减少小数位数
const decreaseDecimal = () => {
  if (decimalPlaces.value > 0) {
    decimalPlaces.value -= 1;
  }
};

// 格式化数值
const formatValue = (value) => {
  if (typeof value === "number") {
    return value.toFixed(decimalPlaces.value);
  }
  return value;
};

// 对数据进行过滤 同时保持响应性
const filter = (d) =>
  !isNaN(parseInt(data.value[d])) &&
  d !== "area" &&
  !d.includes("zscore"); // 去除 area 和含有 zscore 的列

// 获取所有的列
const columns = computed(() => {
  return sortColumnsByNumber(Object.keys(data.value).filter(filter));
});

// 获取当前激活的行
const activeRow = computed(() => {
  return columns.value.indexOf(activeColumn.value);
});

function extractNumberFromString(str) {
  const match = str.match(/\d+/g);
  return match ? parseInt(match[0]) : null;
}

function sortColumnsByNumber(columns) {
  return columns.slice().sort((a, b) => {
    const numA = extractNumberFromString(a);
    const numB = extractNumberFromString(b);

    if (numA !== null && numB !== null) {
      return numA - numB;
    }
    if (numA !== null) return -1;
    if (numB !== null) return 1;
    return 0;
  });
}
</script>

<style scoped>
.simple-table {
  width: 100%;
  border-radius: 5px;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 10px;
  background-color: var(--vp-c-bg); /* 使用背景变量 */
}

.simple-table thead th {
  background-color: var(--vp-c-green-soft); /* 使用成功背景变量 */
  text-align: left;
  font-weight: bold;
  padding: 10px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
  border: 2px solid var(--vp-c-border); /* 使用边框变量 */
}

.simple-table tr.active {
  background-color: var(--vp-c-warning-soft); /* 使用警告背景变量 */
  font-weight: bold;
  animation: fadeIn 1s;
}

.simple-table td {
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  padding: 10px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.toolbar {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.control-button {
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: var(--vp-c-default-3); /* 使用默认背景变量 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  transition: background-color 0.2s ease-in-out; /* 添加悬停过渡效果 */
}

.control-button:hover {
  background-color: var(--vp-c-default-2); /* 悬停时使用更亮的默认背景 */
}

.decimal-value {
  padding: 0 10px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

@keyframes fadeIn {
  from {
    background-color: var(--vp-c-warning-soft); /* 使用警告背景变量 */
  }
  to {
    background-color: transparent;
  }
}
</style>
