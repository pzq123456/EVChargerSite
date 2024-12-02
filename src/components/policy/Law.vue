<template>
  <div class="policy-details" v-if="policy">
    <div v-for="(value, key) in policy" :key="key">
      <!-- 渲染标题 -->
      <div class="policy-title" v-if="key">
        <strong>{{ formatKey(key) }}</strong>
      </div>

      <!-- 渲染数组 -->
      <ul v-if="Array.isArray(value)">
        <li v-for="(item, index) in value" :key="index">
          {{ item }}
        </li>
      </ul>

      <!-- 渲染字符串或其他类型 -->
      <p v-else>
        {{ value }}
      </p>
    </div>
  </div>

  <div v-else>
    <p>Policy not found</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  policy: {
    type: Object,
    required: true
  }
});

// 格式化键名，首字母大写
const formatKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};
</script>

<style scoped>
.policy-details {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.policy-title {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--vp-c-important-2);
}

ul {
  margin-left: 20px;
  list-style-type: none;
}

p {
  margin: 10px 0;
}
</style>
