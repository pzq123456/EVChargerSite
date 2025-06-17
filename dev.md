# Global EV Data Application Form

> Note: This form is used to apply for datasets available through the Global EV Data Initiative (please see its website: https://globalevdata.github.io/ ). Please fill in this application form. We will process your application within two weeks. If you have any questions, you may contact us by email (global.ev.map@gmail.com). 

*(Version 2025.2 revised on 12 May 2025)*

## Part 1 Basic Information

<UserInfoForm :form-config="UserInfoConfig" v-model="userForm" ref="userInfoForm" />

## Part 2 Databases you need

> If a large-scale dataset or multiple datasets are requested, a strong justification with supporting documents (e.g., a project record, or supporting letter from supervisor / principal investigator) is generally needed.  

<DatabaseForm :form-config="DataQueryConfig" v-model="queryForm" ref="databaseForm" />

> These datasets marked with an asterisk (*) are available , but may be shareable until the relevant work (e.g., paper) is published. However, you are still welcome to submit an application now, as we will share the datasets requested as soon as we can. 

## Part 3 Global EV Data Initiative Membership Terms

> If I am not currently a member of the Global EV Data Initiative, I <b>agree</b> to the following Membership Terms:

<MembershipAgreement 
  @all-agreed="handleAllAgreed" v-model="agreementStatus"
/>

## Part 4 Declaration
1. By completing this declaration, I hereby declare that the information included in this application form is true and correct to the best of my knowledge. 
2. I understand that any falseor misleading information given by me in connection with my application may result intermination of the application process, I will not share the datasets with anyone else or usethem for commercial purposes. 

<div class="form-footer">
<el-tooltip
  :disabled="allAgreed && hasSelectedDatabase"
  content="You must complete the form and agree to all membership terms before using this feature."
  placement="top"
>
  <el-button
    type="success"
    @click="generatePreview"
    :disabled="!allAgreed || !hasSelectedDatabase"
    size="large"
    plain
  >
    Print Preview
  </el-button>
</el-tooltip>
</div>

<ReportPreview
  :visible="showPreview"
  :user-info="userForm"
  :query-params="queryForm"
  :userInfoConfig="UserInfoConfig"
  :dataConfig="DataQueryConfig"
  @print="printReport"
  @export="exportPDF"
  ref="componentRef"
/>

<div class="preview-footer" v-show="showPreview">
  <el-button type="primary" @click="backToEdit" size="large" plain>
    Back to Edit
  </el-button>
</div>

<script setup>
import { ref, computed } from 'vue'

import { ElButton, ElMessage, ElTooltip } from 'element-plus'

import UserInfoForm from '@/components/form/UserInfoForm.vue'
import DatabaseForm from '@/components/form/DatabaseForm.vue'
import MembershipAgreement from '@/components/form/MembershipAgreement.vue'
import ReportPreview from '@/components/form/preview/Preview.vue'

/* 表单配置文件 */
import UserInfoConfig from '@/components/form/formConfig/UserInfo.js'
import DataQueryConfig from '@/components/form/formConfig/DataQuery.js'
import { extractFormRef } from '@/components/form/formConfig/helper.js'

const userForm = extractFormRef(UserInfoConfig)
const queryForm = extractFormRef(DataQueryConfig)
const showPreview = ref(false)
const userInfoForm = ref()
const databaseForm = ref()

const agreementStatus = ref({
  agreeMembership: false,
  agreeEmail: false,
  agreeDataUsage: false,
  allAgreed: false
})

// 计算是否有选中的数据库
const hasSelectedDatabase = computed(() => {
  return Object.values(queryForm.value).some(db => db.selected)
})

// 是否所有用户条款都已同意
const allAgreed = computed(() => {
  return agreementStatus.value.allAgreed;
})

const agreementVisible = ref(true)
const userAgreeAgreement = ref(false)

const handleAllAgreed = () => {
  console.log('All agreements have been accepted')
}

const generatePreview = async () => {
  try {
    await Promise.all([
      userInfoForm.value.validate(),
      databaseForm.value.validate()
    ])
    showPreview.value = true
    // 使用requestAnimationFrame确保在下一个渲染周期执行
  } catch (error) {
    ElMessage.error('Please complete all required fields')
  }
}

const printReport = () => {
  const printContent = document.getElementById('printable-content').innerHTML
  const originalContent = document.body.innerHTML
  document.body.innerHTML = printContent
  // 等待页面渲染完成后再触发打印
  requestAnimationFrame(() => {
    window.print()
    document.body.innerHTML = originalContent
    location.reload()
  })
}

const exportPDF = (data) => {
  console.log('导出PDF:', data)
  ElMessage.success('PDF导出功能需集成PDF生成库')
}

const backToEdit = () => {
  showPreview.value = false
  // 使用requestAnimationFrame确保在下一个渲染周期执行
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}
</script>

<style scoped>
.form-footer {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.preview-footer {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>