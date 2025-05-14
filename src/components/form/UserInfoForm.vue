<template>
  <el-form 
    :model="formData" 
    :rules="formRules"
    ref="formRef"
    v-bind="formProps"
  >
    <template v-for="section in formConfig.sections" :key="section.title">
      <h3 class="form-section-title" v-if="section.title">{{ section.title }}</h3>
      
      <template v-for="item in section.items" :key="item.model">
        <el-form-item 
          :label="item.label" 
          :prop="item.model"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="formData[item.model]"
            :type="item.inputType || 'text'"
            :placeholder="item.placeholder"
          />
          
          <!-- 下拉选择 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="formData[item.model]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          
          <!-- 文本域 -->
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="formData[item.model]"
            type="textarea"
            :rows="item.rows"
            :placeholder="item.placeholder"
          />
          
          <!-- 上传组件 -->
          <el-upload
            v-else-if="item.type === 'upload'"
            class="signature-upload"
            action="#"
            :auto-upload="false"
            :on-change="(file) => handleUpload(file, item.model)"
            :show-file-list="false"
            :accept="item.accept"
          >
            <el-button type="primary">{{ item.uploadText || '点击上传' }}</el-button>
            <div slot="tip" class="el-upload__tip" v-if="item.tip">{{ item.tip }}</div>
            <div v-if="formData[item.model] && item.showPreview" class="signature-preview">
              <img :src="formData[item.model]" :alt="`${item.label}预览`" class="signature-image" />
              <el-button 
                size="" 
                type="danger" 
                @click.stop="() => removeUpload(item.model)"
              >
                移除
              </el-button>
            </div>
          </el-upload>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const formRef = ref()
const formData = reactive({ ...props.modelValue })

// 提取表单属性
const formProps = computed(() => props.formConfig.formProps || {})

// 生成验证规则
const formRules = computed(() => {
  const rules = {}
  props.formConfig.sections.forEach(section => {
    section.items.forEach(item => {
      if (item.required || item.rules) {
        rules[item.model] = [
          ...(item.required ? [{ required: true, message: `${item.label}不能为空`, trigger: 'blur' }] : []),
          ...(item.rules || [])
        ]
      }
    })
  })
  return rules
})

const handleUpload = (file, model) => {
  const isImage = file.raw.type.includes('image')
  if (!isImage) {
    ElMessage.error('请上传图片文件')
    return false
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    formData[model] = e.target.result
    emitUpdate()
  }
  reader.readAsDataURL(file.raw)
}

const removeUpload = (model) => {
  formData[model] = ''
  emitUpdate()
}

const emitUpdate = () => {
  emit('update:modelValue', formData)
}

// 暴露验证方法给父组件
defineExpose({
  validate: () => formRef.value.validate()
})
</script>

<style scoped>
.form-section-title {
  margin: 20px 0 15px;
  color: #606266;
}

.signature-preview {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.signature-image {
  max-width: 100px;
  max-height: 60px;
  border: 1px solid #eee;
}
</style>