import { ref } from 'vue'

/**
 * 从表单配置中提取 Vue ref 对象
 * @param {Object} formConfig 表单配置
 * @returns {import('vue').Ref} Vue 的 ref 对象
 */
export function extractFormRef(formConfig) {
  // 处理第一种结构（扁平结构）
  if (formConfig.sections) {
    const formData = {}
    
    formConfig.sections.forEach(section => {
      section.items.forEach(item => {
        // 初始化不同类型的默认值
        let defaultValue = ''
        if (item.type === 'checkbox' || item.type === 'checkbox-group') {
          defaultValue = []
        } else if (item.type === 'upload') {
          defaultValue = null
        }
        
        formData[item.model] = defaultValue
      })
    })
    
    return ref(formData)
  }
  // 处理第二种结构（数据库选择结构）
  else if (formConfig.databases) {
    const formData = {}
    
    Object.keys(formConfig.databases).forEach(dbKey => {
      formData[dbKey] = {
        selected: false,
        regions: [],
        years: []
      }
      
      // 遍历字段以确保所有模型都被包含
      formConfig.databases[dbKey].fields.forEach(field => {
        if (!formData[dbKey][field.model]) {
          formData[dbKey][field.model] = field.type === 'checkbox-group' ? [] : ''
        }
      })
    })
    
    return ref(formData)
  }
  
  throw new Error('无法识别的表单结构')
}

// 使用示例
// const userFormRef = extractFormRef(firstFormConfig)  // 第一个配置
// const queryFormRef = extractFormRef(secondFormConfig)  // 第二个配置