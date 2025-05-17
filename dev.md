# Global EV Data Application Form

> - Note: This form is used to apply for datasets available through the Global EV Data Initiative (please see its website: https://globalevdata.github.io/ ). Please fill in this application form. We will process your application within two weeks. If you have any questions, you may contact us by email (global.ev.map@gmail.com). 
> - (Version 2025.2 revised on 12 May 2025)

## Part1 Basic Information

<UserInfoForm :form-config="UserInfoConfig" v-model="userForm" ref="userInfoForm" />

## Part2 Databases you need
> - *These datasets are available, but may be shareable until the relevant work (e.g., paper) is published. However, you are still welcome to submit an application now, as we will share the datasets requested as soon as we can. 
> - If a large-scaledataset or multipledatasets are requested, a strong justification with supporting documents (e.g., a project record, or supporting letter from supervisor / principal investigator) is generally needed.  

<DatabaseForm :form-config="DataQueryConfig" v-model="queryForm" ref="databaseForm">
</DatabaseForm>

<div class="form-footer">
    <el-button type="success" @click="generatePreview" :disabled="!hasSelectedDatabase" size="large">
        Print Preview
    </el-button>
</div>

<el-divider></el-divider>

<ReportPreview :visible="showPreview" :user-info="userForm" :query-params="queryForm"
    :userInfoConfig="UserInfoConfig" :dataConfig="DataQueryConfig" @print="printReport" />


<script setup>
import { ref, computed } from 'vue'

import { ElButton } from 'element-plus'

import UserInfoForm from '@/components/form/UserInfoForm.vue'
import DatabaseForm from '@/components/form/DatabaseForm.vue'

import ReportPreview from '@/components/form//preview/Preview.vue'

/* 表单配置文件 */
import UserInfoConfig from '@/components/form/formConfig/UserInfo.js'
import DataQueryConfig from '@/components/form/formConfig/DataQuery.js'
import { extractFormRef } from '@/components/form/formConfig/helper.js'


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
    await Promise.all([
      userInfoForm.value.validate(),
      databaseForm.value.validate()
    ])
    showPreview.value = true
  } catch (error) {
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
  console.log('导出PDF:', data)
  ElMessage.success('PDF导出功能需集成PDF生成库')
}
</script>


<style scoped>
.form-footer {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>
