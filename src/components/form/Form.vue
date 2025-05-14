<template>

    <UserInfoForm :form-config="UserInfoConfig" v-model="userForm" ref="userInfoForm" />

    <DatabaseForm :form-config="DataQueryConfig" v-model="queryForm" ref="databaseForm">
      <template #actions>
        <el-button type="primary" @click="generatePreview" :disabled="!hasSelectedDatabase">
          Print Prewiew
        </el-button>
      </template>
    </DatabaseForm>

    <!-- element 的 分割线 -->
    <el-divider></el-divider>

    <ReportPreview :visible="showPreview" :user-info="userForm" :query-params="queryForm"
      :userInfoConfig="UserInfoConfig" :dataConfig="DataQueryConfig" @print="printReport" @export="exportPDF" />

</template>

<script setup>
import { ref, computed } from 'vue'

import UserInfoForm from './UserInfoForm.vue'
import DatabaseForm from './DatabaseForm.vue'

import ReportPreview from './preview/Preview.vue'

/* 表单配置文件 */
import UserInfoConfig from './formConfig/userInfo.js'
import DataQueryConfig from './formConfig/DataQuery.js'
import { extractFormRef } from './formConfig/helper.js' // 提取表单配置为ref


const userForm = extractFormRef(UserInfoConfig)

const queryForm = extractFormRef(DataQueryConfig)

const showPreview = ref(false)

const userInfoForm = ref()
const databaseForm = ref()

// 计算是否有选中的数据库
const hasSelectedDatabase = computed(() => {
  return Object.values(queryForm.value).some(db => db.selected)
})

const generatePreview = async () => {
  try {
    // await Promise.all([
    //   userInfoForm.value.validate(),
    //   databaseForm.value.validate()
    // ])
    showPreview.value = true
  } catch (error) {
    // ElMessage.error('请完善所有必填信息')
    ElMessage.error('Please complete all required fields')
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

