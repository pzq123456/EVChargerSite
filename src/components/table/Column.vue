<template>
  <div>
    <table class="simple-table">
      <thead>
        <tr>
          <th></th>
          <th>Column</th>
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
          <td>{{ column }}</td>
          <td v-if="data[column] === 0">N/A</td>
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
  border: 1px solid var(--vp-c-border);
  padding: 5px;
}

.toolbar {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;

}

.control-button {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
}

.control-button:hover {
  background-color: #ccc;
}

.decimal-value {
  padding: 0 10px;
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
