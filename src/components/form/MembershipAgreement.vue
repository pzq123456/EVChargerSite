<template>
  <div class="agreement-content">    
    <el-checkbox-group v-model="checkedAgreements" @change="handleCheckedChange">
      <el-checkbox value="agreeMembership" class="agreement-item">
        By applying for data, I agree to become a member of the Global EV Data Initiative.
      </el-checkbox>
      <el-checkbox value="agreeEmail" class="agreement-item">
        I understand that the email address I provided will serve as my unique Member ID.
      </el-checkbox>
      <el-checkbox value="agreeDataUsage" class="agreement-item">
        I consent to the use of my anonymized data for research and statistical purposes.
      </el-checkbox>
    </el-checkbox-group>
    
    <div class="select-all">
      <el-checkbox 
        :indeterminate="isIndeterminate" 
        v-model="checkAll" 
        @change="handleCheckAllChange"
      >
        Select All
      </el-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      agreeMembership: false,
      agreeEmail: false,
      agreeDataUsage: false,
      allAgreed: false
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const checkedAgreements = ref([])
const checkAll = ref(false)
const isIndeterminate = ref(false)

// Initialize with prop values
if (props.modelValue.agreeMembership) checkedAgreements.value.push('agreeMembership')
if (props.modelValue.agreeEmail) checkedAgreements.value.push('agreeEmail')
if (props.modelValue.agreeDataUsage) checkedAgreements.value.push('agreeDataUsage')

// Update checkAll and indeterminate states
updateCheckStates()

// Watch for internal changes and update v-model
watch(checkedAgreements, (newVal) => {
  const status = {
    agreeMembership: newVal.includes('agreeMembership'),
    agreeEmail: newVal.includes('agreeEmail'),
    agreeDataUsage: newVal.includes('agreeDataUsage'),
    allAgreed: newVal.length === 3
  }
  emit('update:modelValue', status)
  updateCheckStates()
}, { deep: true })

function updateCheckStates() {
  const checkedCount = checkedAgreements.value.length
  checkAll.value = checkedCount === 3
  isIndeterminate.value = checkedCount > 0 && checkedCount < 3
}

const handleCheckAllChange = (val) => {
  if (val) {
    checkedAgreements.value = ['agreeMembership', 'agreeEmail', 'agreeDataUsage']
  } else {
    checkedAgreements.value = []
  }
  isIndeterminate.value = false
}

const handleCheckedChange = (value) => {
  updateCheckStates()
}
</script>

<style scoped>
/* Keep your existing styles */
.agreement-content {
  padding: 16px;
}

.agreement-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  white-space: normal;
  font-size: 14px;
  line-height: 1.5;
}

.agreement-item :deep(.el-checkbox__label) {
  padding-left: 8px;
  flex: 1;
}

.select-all {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>