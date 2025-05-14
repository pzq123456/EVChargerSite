<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>User Information</span>
      </div>
    </template>
    <el-descriptions :column="1" border :label-width="labelWidth">
      <template v-for="section in userInfoConfig.sections" :key="section.title">
        <template v-for="item in section.items" :key="item.model">
          <!-- 特殊处理姓名和标题的组合 -->
          <el-descriptions-item 
            v-if="item.model === 'firstName' && shouldDisplayItem(item, userInfo)"
            label="Full Name"
          >
            <strong v-if="userInfo.title">{{ userInfo.title }}</strong> {{ userInfo.firstName }} {{ userInfo.lastName }}
          </el-descriptions-item>
          
          <!-- 跳过已经处理过的字段或签名 -->
          <el-descriptions-item 
            v-else-if="shouldDisplayItem(item, userInfo) && item.model !== 'lastName' && item.model !== 'title' && item.model !== 'signature'"
            :label="item.label"
          >
            {{ formatValue(item, userInfo[item.model]) }}
          </el-descriptions-item>
        </template>
      </template>
    </el-descriptions>
  </el-card>
</template>

<script setup>
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
  userInfoConfig: {
    type: Object,
    required: true,
    default: () => ({
      sections: []
    })
  },
    labelWidth: {
    type: String,
    default: '120px' // 默认标签宽度
  }
})



const shouldDisplayItem = (item, data) => {
  // 跳过签名图片
  if (item.model === 'signature') return false
  
  // 只显示有值的字段或必填字段
  return data[item.model] !== undefined && data[item.model] !== null && data[item.model] !== ''
}

const formatValue = (item, value) => {
  if (!value) return 'N/A'
  
  if (item.type === 'select') {
    const option = item.options.find(opt => opt.value === value)
    return option ? option.label : value
  }
  
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  
  return value
}
</script>

<style scoped>

.section-title {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

</style>
