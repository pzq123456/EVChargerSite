<template>
  <div class="preview-container" v-if="visible">
    <div class="preview-content" id="printable-content">
      <!-- 报告头 -->
      <el-row class="report-header" justify="space-between">
        <el-col :span="16">
          <h1 class="report-title">Global EV Data Application Form</h1>
        </el-col>
      </el-row>

      <!-- 用户信息 -->
      <userInfoCard :userInfo="userInfo" :userInfoConfig="userInfoConfig" />

      <!-- 数据选择信息 -->
      <DatabasePreview :queryParams="queryParams" :dataConfig="dataConfig" />

      <!-- 签名区域 -->
      <SignaturePreview :userInfo="userInfo" />
    </div>

    <!-- 操作按钮 -->
    <div class="print-actions">
      <el-button type="success" @click="printReport" size="large">
        <el-icon><Printer /></el-icon> Print
      </el-button>
    </div>
  </div>
</template>

<script setup>
import userInfoCard from './UserInfoPreview.vue'
import DatabasePreview from './DatabasePreview.vue'
import SignaturePreview from './SignaturePreview.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  userInfo: {
    type: Object,
    required: true,
  },
  queryParams: {
    type: Object,
    required: true,
  },
  userInfoConfig: {
    type: Object,
    required: true,
    default: () => ({
      sections: []
    })
  },
  dataConfig: {
    type: Object,
    required: true,
    default: () => ({
      databases: {}
    })
  }
})

const emit = defineEmits(['print', 'export'])

const printReport = () => {
  emit('print')
}
</script>

<style scoped>
.preview-container {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--el-border-color);
}

.preview-content > * {
  margin-bottom: 10px;
}

.report-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.report-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.print-actions {
  margin-top: 30px;
  text-align: center;
}

/* 打印样式优化 */
@media print {
  body * {
    visibility: hidden;
    background: transparent !important;
    color: #000 !important;
  }

  #printable-content,
  #printable-content * {
    visibility: visible;
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  #printable-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  /* 移除所有背景色和边框 */
  .el-row, .el-col, .el-card, .el-form-item {
    background-color: transparent !important;
    border: none !important;
  }

  /* 移除按钮区域 */
  .print-actions {
    display: none !important;
  }

  /* 优化标题样式 */
  .report-title {
    color: #000 !important;
    font-size: 24pt;
    margin-bottom: 20pt;
  }

  /* 优化边距 */
  .preview-content > * {
    margin-bottom: 15pt;
  }
}

/* 全局打印样式 - 会应用到所有子组件 */
@media print {
  html, body {
    background: #fff !important;
  }

  :deep(*) {
    background-color: transparent !important;
    color: #000 !important;
    border-color: #000 !important;
  }
  
  :deep(.el-card) {
    border: none !important;
    box-shadow: none !important;
  }
  
  :deep(.el-table) {
    border: 1px solid #000 !important;
  }
  
  :deep(.el-table th) {
    background-color: transparent !important;
  }
  
  :deep(.el-button) {
    display: none !important;
  }
}
</style>