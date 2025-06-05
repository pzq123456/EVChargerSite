<template>
  <el-dialog
    v-model="dialogVisible"
    title="Membership Agreement"
    :width="dialogWidth"
    :before-close="handleClose"
  >
    <div class="agreement-content">
      <h3>Global EV Data Initiative Membership Terms</h3>
      <p>
        An open electric vehicle data initiative that aims to collect, analyse, 
        visualize and share data on the electric vehicle market, policy and 
        charging infrastructure across the globe.
      </p>
      
      <el-divider />
      
      <el-checkbox-group v-model="checkedAgreements">
        <el-checkbox value="agreeEmail" class="agreement-item">
          I understand that the email address I provided will serve as my unique Member ID.
        </el-checkbox>
        <el-checkbox value="agreeMembership" class="agreement-item">
          By applying for data, I agree to become a member of the Global EV Data Initiative.
        </el-checkbox>
        <el-checkbox value="agreeDataUsage" class="agreement-item">
          I consent to the use of my anonymized data for research and statistical purposes.
        </el-checkbox>
        <el-checkbox value="agreeCommunications" class="agreement-item">
          I agree to receive occasional communications about the initiative.
        </el-checkbox>
        <el-checkbox value="agreeTerms" class="agreement-item">
          I have read and agree to the full Terms and Conditions of the Global EV Data Initiative.
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
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button 
          type="primary" 
          @click="submitAgreement"
          :disabled="!allChecked"
        >
          Submit
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'MembershipAgreementDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'agreement-submitted'],
  
  setup(props, { emit }) {
    const dialogVisible = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })
    
    const dialogWidth = computed(() => {
      return window.innerWidth <= 768 ? '90%' : '50%'
    })
    
    const checkedAgreements = ref([])
    const checkAll = ref(false)
    const isIndeterminate = ref(false)
    
    const allChecked = computed(() => {
      return checkedAgreements.value.length === 5
    })
    
    const handleCheckAllChange = (val) => {
      if (val) {
        checkedAgreements.value = ['agreeEmail', 'agreeMembership', 'agreeDataUsage', 'agreeCommunications', 'agreeTerms']
      } else {
        checkedAgreements.value = []
      }
      isIndeterminate.value = false
    }
    
    const handleCheckedChange = (value) => {
      const checkedCount = value.length
      checkAll.value = checkedCount === 5
      isIndeterminate.value = checkedCount > 0 && checkedCount < 5
    }
    
    const handleClose = (done) => {
      if (checkedAgreements.value.length > 0 && !allChecked.value) {
        ElMessage.warning('Please agree to all terms or cancel the registration')
        return
      }
      done()
    }
    
    const submitAgreement = () => {
      if (allChecked.value) {
        emit('agreement-submitted')
        dialogVisible.value = false
      } else {
        ElMessage.error('Please agree to all terms before submitting')
      }
    }
    
    return {
      dialogVisible,
      dialogWidth,
      checkedAgreements,
      checkAll,
      isIndeterminate,
      allChecked,
      handleCheckAllChange,
      handleCheckedChange,
      handleClose,
      submitAgreement
    }
  }
}
</script>

<style scoped>
.agreement-content {
  max-height: 60vh;
  overflow-y: auto;
  padding: 0 16px;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
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
  border-top: 1px solid #eee;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
}

.dialog-footer .el-button {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 48px; /* Larger touch target for mobile */
}

h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .agreement-content {
    max-height: 70vh;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 13px;
  }

  .agreement-item {
    font-size: 10px;
    margin-bottom: 30px;
  }

  .dialog-footer .el-button {
    padding: 10px 20px;
    font-size: 14px;
    min-height: 44px;
  }
}
</style>