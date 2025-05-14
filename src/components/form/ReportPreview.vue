<template>
  <div class="preview-container" v-if="visible">
    <div class="preview-content" id="printable-content">
      <!-- 报告头 -->
      <el-row class="report-header" justify="space-between">
        <el-col :span="16">
          <h1 class="report-title">{{ reportTitle }}</h1>
          <p class="report-subtitle">数据请求报告</p>
        </el-col>
        <el-col :span="8" class="text-right">
          <p class="report-number">报告编号: {{ reportNumber }}</p>
          <p class="report-date">生成日期: {{ generationTime }}</p>
        </el-col>
      </el-row>

      <!-- 用户信息 -->
      <el-card class="section-card">
        <h3 class="section-title">用户信息</h3>
        <el-descriptions :column="1" border>
          <template v-for="section in userInfoConfig.sections" :key="section.title">
            <template v-for="item in section.items" :key="item.model">
              <el-descriptions-item v-if="shouldDisplayItem(item, userInfo)" :label="item.label">
                <template v-if="item.type === 'upload' && userInfo[item.model]">
                  <img :src="userInfo[item.model]" alt="签名" class="signature-preview" />
                </template>
                <template v-else>
                  {{ formatValue(item, userInfo[item.model]) }}
                </template>
              </el-descriptions-item>
            </template>
          </template>
        </el-descriptions>
      </el-card>

      <!-- 数据选择信息 -->
      <el-card class="section-card" v-if="hasSelectedDatabases">
        <h3 class="section-title">数据选择</h3>
        <template v-for="(dbConfig, dbKey) in dataConfig.databases" :key="dbKey">
          <div v-if="queryParams[dbKey]?.selected" class="database-section">
            <h4 class="database-title">{{ dbConfig.label }}</h4>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="是否选择">是</el-descriptions-item>
              <template v-for="field in dbConfig.fields" :key="field.model">
                <el-descriptions-item :label="field.label">
                  {{ formatFieldValue(field, queryParams[dbKey][field.model]) }}
                </el-descriptions-item>
              </template>
            </el-descriptions>
          </div>
        </template>
      </el-card>

      <!-- 签名区域 -->
      <div class="signature-area">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="signature-box" v-if="userInfo.signature">
              <p class="signature-label">申请人签名:</p>
              <img :src="userInfo.signature" alt="用户签名" class="signature-image" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="date-box">
              <p class="date-label">日期:</p>
              <p class="date-value">{{ generationTime }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 页脚 -->
      <div class="report-footer">
        <el-divider />
        <p>GlobalEVData © 2024 - Present | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> @ <a href="https://www.polyu.edu.hk/"> HKPolyU </a></p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="print-actions">
      <el-button type="success" @click="printReport" size="large">
        <el-icon><Printer /></el-icon> 打印报告
      </el-button>
      <el-button type="primary" @click="exportPDF" size="large">
        <el-icon><Document /></el-icon> 导出PDF
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Printer, Document } from '@element-plus/icons-vue'

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

const generationTime = ref(new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))
const reportNumber = ref(`EV-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`)

// 计算属性
const hasSelectedDatabases = computed(() => {
  return Object.values(props.queryParams).some(db => db?.selected)
})

const reportTitle = computed(() => {
  return `${props.userInfo.institution || props.userInfo.organization || 'EV数据'}请求报告`
})

// 方法
const shouldDisplayItem = (item, data) => {
  // 只显示有值的字段或必填字段
  return data[item.model] !== undefined && data[item.model] !== null && data[item.model] !== ''
}

const formatValue = (item, value) => {
  if (!value) return '无'
  
  if (item.type === 'select') {
    const option = item.options.find(opt => opt.value === value)
    return option ? option.label : value
  }
  
  if (Array.isArray(value)) {
    return value.join('， ')
  }
  
  return value
}

const formatFieldValue = (field, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return '全部'
  }
  
  if (Array.isArray(value)) {
    return value.join('， ')
  }
  
  return value
}

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

.preview-content {
  padding: 30px;
  background: white;
  color: #333;
}

.report-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.report-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.report-subtitle {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}

.report-number, .report-date {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.section-card {
  margin-bottom: 24px;
}

.section-title {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.database-section {
  margin-bottom: 20px;
}

.database-title {
  margin: 10px 0;
  font-size: 16px;
  color: #444;
}

.signature-area {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.signature-box, .date-box {
  padding: 20px 0;
}

.signature-label, .date-label {
  font-weight: bold;
  margin-bottom: 15px;
}

.signature-image, .signature-preview {
  max-width: 200px;
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
  #printable-content, #printable-content * {
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
  
  /* 确保签名区域在页面底部 */
  .signature-area {
    position: fixed;
    bottom: 100px;
    width: 90%;
  }
}
</style>