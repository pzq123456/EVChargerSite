<template>
  <el-card shadow="never" v-if="hasSelectedDatabases">
    <template #header>
      <div class="card-header">
        <span>Dataset Selected</span>
      </div>
    </template>
    <template v-for="dbKey in sortedDatabaseKeys" :key="dbKey">
      <div v-if="queryParams[dbKey]?.selected" class="database-section">
        <h4 class="database-title">{{ dataConfig.databases[dbKey].label }}</h4>
        <el-descriptions :column="1" border :label-width="labelWidth">
          <template v-for="field in sortedFields(dbKey)" :key="field.model">
            <el-descriptions-item :label="field.label">
              {{ formatFieldValue(field, queryParams[dbKey][field.model]) }}
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  queryParams: {
    type: Object,
    required: true,
  },
  dataConfig: {
    type: Object,
    required: true,
    default: () => ({
      databases: {}
    })
  },
  labelWidth: {
    type: String,
    default: '120px'
  }
})

// 计算属性：按字母顺序排序的数据库键
const sortedDatabaseKeys = computed(() => {
  return Object.keys(props.dataConfig.databases).sort((a, b) => {
    return props.dataConfig.databases[a].label.localeCompare(props.dataConfig.databases[b].label)
  })
})

// 计算属性：是否有选中的数据库
const hasSelectedDatabases = computed(() => {
  return Object.values(props.queryParams).some(db => db?.selected)
})

// 方法：获取排序后的字段列表
const sortedFields = (dbKey) => {
  const fields = props.dataConfig.databases[dbKey]?.fields || []
  return [...fields].sort((a, b) => a.label.localeCompare(b.label))
}

const formatFieldValue = (field, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'all'
  }

  if (Array.isArray(value)) {
    return [...value].sort().join(' ') // 对数组值也进行排序
  }

  return value
}
</script>

<style scoped>
.card-header {
  font-weight: 500;
  font-size: 16px;
}

.database-section {
  margin-bottom: 20px;
}

.database-title {
  margin: 10px 0;
  font-size: 16px;
  color: var(--el-text-color-regular);
  font-weight: 500;
}

:deep(.el-descriptions__label) {
  font-weight: 500;
  color: var(--el-text-color-regular);
}

:deep(.el-descriptions__content) {
  color: var(--el-text-color-primary);
}
</style>