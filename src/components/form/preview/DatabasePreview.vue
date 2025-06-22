<template>
  <el-card shadow="never" v-if="hasSelectedDatabases">
    <template #header>
      <div class="card-header">
        <span>
          Dataset Selected
        </span>
      </div>
    </template>
    <template v-for="(dbConfig, dbKey) in dataConfig.databases" :key="dbKey">
      <div v-if="queryParams[dbKey]?.selected" class="database-section">
        <h4 class="database-title">{{ dbConfig.label }}</h4>
        <el-descriptions :column="1" border :label-width="labelWidth">
          <template v-for="field in dbConfig.fields" :key="field.model">
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
    default: '120px' // 默认标签宽度
  }
})

// 计算属性
const hasSelectedDatabases = computed(() => {
  return Object.values(props.queryParams).some(db => db?.selected)
})

const formatFieldValue = (field, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'all' // 根据需求可以改为 'all' 或 '全部'
  }

  if (Array.isArray(value)) {
    return value.join(' ')
  }

  return value
}
</script>

<style scoped>
.section-title {
  margin: 0 0 15px 0;
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 500;
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

/* 如果需要更精细的控制，可以添加以下样式 */
:deep(.el-descriptions__label) {
  font-weight: 500;
  color: var(--el-text-color-regular);
}

:deep(.el-descriptions__content) {
  color: var(--el-text-color-primary);
}
</style>