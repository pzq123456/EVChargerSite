<script setup>
import { ref, onMounted } from 'vue'

import { hello } from '../src';

console.log(hello());
// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<style>
button {
  font-size: 1.5em;
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
}
</style>