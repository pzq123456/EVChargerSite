<template>
  <div class="container">
    <UserInfoForm 
      :form-config="UserInfoConfig"
      v-model="userForm" 
      ref="userInfoForm" 
    />
    
    <DataQueryForm 
      :form-config="DataQueryConfig" 
      v-model="queryForm" 
      ref="dataQueryForm"
    />

    <!-- element 的 分割线 -->
    <el-divider></el-divider>

        <el-button 
          type="primary" 
          @click="generatePreview"
          :disabled="!hasSelectedDatabase"
        >
          生成预览 
        </el-button>
    

    <ReportPreview 
      :visible="showPreview" 
      :user-info="userForm" 
      :query-params="queryForm"
      :userInfoConfig="UserInfoConfig"
      :dataConfig="DataQueryConfig"
      @print="printReport"
      @export="exportPDF"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import UserInfoForm from './UserInfoForm.vue'
import DataQueryForm from './DatabaseForm.vue'

import ReportPreview from './preview/Preview.vue'

// src/components/form/preview/Preview.vue

/* 表单配置文件 */
import UserInfoConfig from './formConfig/userInfo.json'
import DataQueryConfig from './formConfig/DataQuery.json'
import { extractFormRef } from './formConfig/helper.js' // 提取表单配置为ref


const userForm = extractFormRef(UserInfoConfig)
// const userForm = ref({
//   title: '',
//   name: '',
//   email: '',
//   organization: '',
//   purpose: '',
//   signature: ''
// })

const queryForm = extractFormRef(DataQueryConfig)
// const queryForm = ref({
//   charging_stations: {
//     selected: false,
//     regions: [],
//     years: []
//   },
//   user_reviews: {
//     selected: false,
//     regions: [],
//     years: []
//   }
// })

const showPreview = ref(false)

const userInfoForm = ref()
const dataQueryForm = ref()

// 计算是否有选中的数据库
const hasSelectedDatabase = computed(() => {
  return Object.values(queryForm.value).some(db => db.selected)
})

const generatePreview = async () => {
  try {
    // await Promise.all([
    //   userInfoForm.value.validate(),
    //   dataQueryForm.value.validate()
    // ])
    showPreview.value = true
  } catch (error) {
    ElMessage.error('请完善所有必填信息')
  }
}

const printReport = () => {
  const printContent = document.getElementById('printable-content').innerHTML
  const originalContent = document.body.innerHTML
  
  document.body.innerHTML = printContent
  window.print()
  document.body.innerHTML = originalContent
  location.reload()
}

const exportPDF = (data) => {
  // 实际项目中这里应该调用PDF生成库
  console.log('导出PDF:', data)
  ElMessage.success('PDF导出功能需集成PDF生成库')
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>