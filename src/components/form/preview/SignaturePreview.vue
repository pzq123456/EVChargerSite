<template>
  <div class="signature-area">
    <div class="signature-container">
      <div class="signature-box">
        <div class="signature-header">
          <span class="signature-label">SIGNATURE: </span>
          <span class="signature-required">(Required)</span>
        </div>
        <div class="signature-field">
        </div>
        <p class="date-value">Date: {{ generationTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const generationTime = ref(new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))
</script>

<style scoped>
.signature-container {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  width: fit-content;
  font-family: Arial, sans-serif;
}

.signature-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 250px;
}

.signature-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: bold;
}

.signature-label {
  color: #333;
}

.signature-required {
  color: #d32f2f;
}

.signature-field {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #1d0606;
  position: relative;
  margin-bottom: 8px;
}

.date-value {
  margin: 0;
  text-align: right;
  font-size: 14px;
  width: 100%;
}
</style>

<!-- <template>
  <div class="signature-area">
    <div class="signature-container">
      <div class="signature-box" v-if="userInfo.signature">
        <img :src="userInfo.signature" alt="Signature" class="signature-image" />
        <p class="date-value">{{ generationTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
})

const generationTime = ref(new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))
</script>

<style scoped>
.signature-container {
  display: flex;
  justify-content: flex-end; /* 使内容靠右 */
  margin-left: auto; /* 确保容器靠右 */
  width: fit-content; /* 根据内容自适应宽度 */
}

.signature-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 右对齐内容 */
}

.signature-image {
  height: 60px; /* 限制签名高度 */
  display: block;
  margin-bottom: 8px; /* 签名和日期间距 */
}

.date-value {
  margin: 0;
  text-align: right; /* 日期右对齐 */
}
</style> -->