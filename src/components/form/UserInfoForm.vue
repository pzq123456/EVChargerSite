<template>
  <el-form :model="formData" :rules="formRules" ref="formRef" v-bind="formProps">
    <template v-for="section in formConfig.sections" :key="section.title">
      <!-- <h3 v-if="section.title" class="form-section-title">{{ section.title }}</h3> -->
      <template v-for="item in section.items" :key="item.model">
        <el-form-item :label="item.label" :prop="item.model">
          <el-input v-if="item.type === 'input'" v-model="formData[item.model]" :type="item.inputType || 'text'"
            :placeholder="item.placeholder" />
          <el-select v-else-if="item.type === 'select'" v-model="formData[item.model]" :placeholder="item.placeholder">
            <el-option v-for="o in item.options" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
          <el-input v-else-if="item.type === 'textarea'" v-model="formData[item.model]" type="textarea"
            :rows="item.rows" :placeholder="item.placeholder" />
          <el-upload v-else-if="item.type === 'upload'" class="drag-upload" drag action="#" :auto-upload="false"
            :on-change="(file) => handleUpload(file, item.model)" :show-file-list="false" :accept="item.accept">
            <template v-if="!formData[item.model]">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Please drag files here
                <em>
                  Click to upload
                </em>
              </div>
              <div v-if="item.tip" class="el-upload__tip">{{ item.tip }}</div>
            </template>
            <div v-else class="upload-preview">
              <img v-if="formData[item.model].startsWith('data:image')" :src="formData[item.model]"
                class="preview-image" />
              <div v-else class="file-info">
                <el-icon>
                  <document />
                </el-icon>
              </div>
              <div class="preview-actions">
                <el-button size="small" type="primary"
                  @click.stop="$refs.formRef.$el.querySelector('.el-upload__input').click()">
                  re-upload
                </el-button>
                <el-button size="small" type="danger" @click.stop="removeUpload(item.model)">
                  remove
                </el-button>
              </div>
            </div>
          </el-upload>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  formConfig: { type: Object, required: true },
  modelValue: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue'])
const formRef = ref()
const formData = reactive({ ...props.modelValue })
const formProps = computed(() => props.formConfig.formProps || {})

const formRules = computed(() => {
  const rules = {}
  props.formConfig.sections.forEach(s => s.items.forEach(i => {
    if (i.required || i.rules) rules[i.model] = [
      ...(i.required ? [{ required: true, message: `${i.label} can not be empty`, trigger: 'blur' }] : []),
      ...(i.rules || [])
    ]
  }))
  return rules
})

const handleUpload = (file, model) => {
  if (props.formConfig.accept && !file.raw.type.match(props.formConfig.accept.replace('*', '.*')))
    return ElMessage.error(`Please upload ${props.formConfig.accept} files only`)
  // if (props.formConfig.maxSize && file.raw.size > props.formConfig.maxSize * 1024)
  //   return ElMessage.error(`文件大小不能超过${props.formConfig.maxSize}KB`)

  if (file.raw.type.includes('image')) {
    const reader = new FileReader()
    reader.onload = e => (formData[model] = e.target.result, emit('update:modelValue', formData))
    reader.readAsDataURL(file.raw)
  } else {
    formData[model] = file.raw
    emit('update:modelValue', formData)
  }
}

const removeUpload = model => (formData[model] = null, emit('update:modelValue', formData))

defineExpose({ validate: () => formRef.value.validate() })
</script>

<style scoped>
.form-section-title {
  margin: 20px 0 15px;
  color: #606266;
}

.drag-upload {
  width: 100%;
}

.drag-upload :deep(.el-upload),
.drag-upload :deep(.el-upload-dragger) {
  width: 100%;
}

.drag-upload :deep(.el-upload-dragger) {
  padding: 20px;
}

.upload-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.preview-image {
  max-width: 100%;
  max-height: 80px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.preview-actions {
  display: flex;
  gap: 10px;
}

.el-upload__tip {
  font-size: 12px;
  color: #909399;
  margin-top: 7px;
}
</style>