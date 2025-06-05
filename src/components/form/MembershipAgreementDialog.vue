<template>
  <el-dialog
    v-model="dialogVisible"
    title="Membership Agreement"
    width="50%"
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
  padding: 0 10px;
}

.agreement-item {
  display: block;
  margin-bottom: 12px;
  white-space: normal;
}

.select-all {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>