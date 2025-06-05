<template>
  <div class="custom-alert-wrapper" v-show="visible">
    <el-alert type="warning" title="Submission Instructions"
      description="Please review and sign the generated application form (PDF format), then email it to global.ev.map@gmail.com along with any supporting documents. Please use your institutional email for submission."
      show-icon :closable="true" class="custom-alert" />
  </div>

  <div class="preview-container" v-show="visible">
    <div class="preview-content" id="printable-content">
      <!-- 报告头 -->
      <el-row class="report-header" justify="space-between">
        <el-col :span="16">
          <h1 class="report-title">Global EV Data Application Form</h1>
        </el-col>
        <!-- 组织简介 -->
        <p>
          Global EV Data Initiative is an open electric vehicle data initiative
          that aims to collect, analyse,
          visualize and share data on the electric vehicle market, policy and
          charging infrastructure across the globe.
        </p>

        <!-- 重要提醒 -->
        <p class="instructions-text">
          Please review and sign the generated application form (<b>PDF format</b>), then email it to
          <a href="mailto:global.ev.map@gmail.com" class="instructions-email">global.ev.map@gmail.com</a>
          along with any supporting documents. <span class="highlight-text"><b>Please use your institutional email for submission.</b></span>
        </p>
      </el-row>


      <!-- 用户信息 -->
      <section class="section">
        <userInfoCard :userInfo="userInfo" :userInfoConfig="userInfoConfig" />
      </section>

      <div STYLE="page-break-after: always;"></div>

      <!-- 数据选择信息 -->
      <section class="section">
        <DatabasePreview :queryParams="queryParams" :dataConfig="dataConfig" />
      </section>

      <!-- 签名区域 -->
      <section class="section">
        <SignaturePreview :userInfo="userInfo" />
      </section>

      <!-- 用户条款 -->
      <section class="section membership-terms">

        <span class="terms-text">If I am not currently a member of the Global EV Data Initiative, I <b>agree</b> to the following Membership Terms: </span>
        <br>
        <div class="terms-content">
          <span><b>1.</b> By applying for data, I agree to become a member of the Global EV Data Initiative.</span>
          <br>
         <span><b>2.</b> I understand that the email address I provided will serve as my unique Member ID.</span>
          <br>
          <span><b>3.</b> I consent to the use of my anonymized data for research and statistical purposes.</span>
        </div>
      </section>
    </div>

    <!-- 操作按钮 -->
    <div class="print-actions">
      <el-button type="success" @click="printReport" size="large" plain>
        <el-icon>
          <Printer />
        </el-icon> Print
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
.custom-alert-wrapper {
  margin: 16px 0;
  border-radius: 6px;
}

.custom-alert {
  border-left: 2px solid #e6a23c;
  animation: alert-pop 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}


@keyframes alert-pop {
  0% {
    transform: scale(0.95) translateY(-20px);
    opacity: 0;
    box-shadow: none;
  }

  60% {
    transform: scale(1.03) translateY(4px);
    opacity: 1;
    box-shadow: 0 8px 32px rgba(230, 162, 60, 0.18);
  }

  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
    box-shadow: 0 4px 16px rgba(230, 162, 60, 0.15);
  }
}

.preview-container {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--el-border-color);
}

.preview-content>* {
  margin-bottom: 10px;
}

.report-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color);
}

.report-title {
  margin: 0;
  font-size: 24px;
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
  .el-row,
  .el-col,
  .el-card,
  .el-form-item {
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
  .preview-content>* {
    margin-bottom: 15pt;
  }
}

/* 全局打印样式 - 会应用到所有子组件 */
@media print {

  html,
  body {
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