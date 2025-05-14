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
        <el-icon>
          <Printer />
        </el-icon> 打印报告
      </el-button>
      <el-button type="primary" @click="exportPDF" size="large">
        <el-icon>
          <Document />
        </el-icon> 导出PDF
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

const exportPDF = () => {
  emit('export', {
    userInfo: props.userInfo,
    queryParams: props.queryParams
  })
}
</script>

<style scoped>
.preview-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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


.section-title {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.signature-area {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.signature-box,
.date-box {
  padding: 20px 0;
}

.signature-label,
.date-label {
  font-weight: bold;
  margin-bottom: 15px;
}

.signature-image,
.signature-preview {
  max-width: 300px;
  max-height: 80px;
  border-bottom: 1px solid #333;
  display: block;
}

.date-value {
  padding-top: 15px;
}

.report-footer {
  margin-top: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.print-actions {
  margin-top: 30px;
  text-align: center;
}

/* 打印样式 */
@media print {
  body * {
    visibility: hidden;
  }

  #printable-content,
  #printable-content * {
    visibility: visible;
  }

  #printable-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px;
  }

  .print-actions {
    display: none;
  }

  /* 优化打印边距 */
  .preview-content {
    padding: 0;
  }

}
</style>