<template>
  <section class="news-section">
    <div class="section-header">
      <h2 class="section-title">Latest News</h2>
      <el-divider class="section-divider" />
    </div>
    
    <!-- 时间线容器 -->
    <div class="timeline-container">
      <el-timeline class="elegant-timeline">
        <el-timeline-item
          v-for="(item, index) in visibleNews"
          :key="index"
          :timestamp="formatDate(item.date)"
          placement="top"
          :class="['timeline-item', { 'highlight-item': index < 3 }]"
        >
          <!-- 新闻卡片 -->
          <el-card 
            class="news-card" 
            :body-style="{ padding: 0 }"
          >
            <div class="news-image-container">
              <el-image 
                :src="item.image" 
                fit="cover" 
                class="news-image"
              />
              <div class="news-date-overlay">
                <span class="news-date">{{ formatDate(item.date) }}</span>
              </div>
            </div>
            
            <div class="news-content">
              <div class="news-header">
                <h3 class="news-title">{{ item.title }}</h3>
                <el-tag 
                  v-if="index < 3"
                  class="news-badge"
                  effect="dark"
                >
                  {{ getNewsTag(item) }}
                </el-tag>
              </div>
              
              <p class="news-summary">{{ item.summary }}</p>
              
              <div class="news-footer">
                <el-button 
                  type="text" 
                  class="read-more-btn"
                  @click="navigateTo(item.link)"
                >
                  Read Full Story
                  <el-icon class="arrow-icon"><right /></el-icon>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      
      <!-- 加载更多按钮 -->
      <div class="load-more" v-if="hasMoreNews">
        <el-button 
          plain
          :loading="loading"
          @click="loadMore"
          class="load-more-btn"
        >
          {{ loading ? 'Loading...' : 'View Older News' }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  news: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(item => item.image && typeof item.image === 'string')
    }
  },
  formatDate: {
    type: Function,
    required: true
  },
  navigateTo: {
    type: Function,
    required: true
  }
})

// 响应式数据
const visibleCount = ref(3)
const loading = ref(false)

// 计算属性
const visibleNews = computed(() => props.news.slice(0, visibleCount.value))
const hasMoreNews = computed(() => visibleCount.value < props.news.length)

// 方法
const loadMore = () => {
  loading.value = true
  // 模拟异步加载
  setTimeout(() => {
    visibleCount.value = Math.min(visibleCount.value + 3, props.news.length)
    loading.value = false
  }, 600)
}

const getNewsTag = (item) => {
  // 根据日期判断新闻类型
  const daysDiff = (new Date() - new Date(item.date)) / (1000 * 60 * 60 * 24)
  if (daysDiff < 7) return 'New'
  if (daysDiff < 30) return 'Recent'
  return 'Featured'
}
</script>

<style scoped>
.news-section {
  padding: 80px 0;
  background-color: var(--vp-c-bg);
  margin: 0 auto;
  max-width: 1200px;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.section-divider {
  width: 100px;
  margin: 0 auto;
  border-top: 2px solid var(--vp-c-brand-1);
}

/* 时间线容器 */
.timeline-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.elegant-timeline {
  --el-timeline-node-size: 12px;
  --el-timeline-node-color: var(--vp-c-brand-1);
}

.elegant-timeline :deep(.el-timeline-item__tail) {
  border-left: 2px solid var(--vp-c-divider);
}

/* 时间线项目 */
.timeline-item {
  margin-bottom: 40px;
  padding-bottom: 10px;
}

.highlight-item :deep(.el-timeline-item__node) {
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb), 0.1);
}

/* 新闻卡片 */
.news-card {
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg);
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-2);
}

.news-image-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.news-card:hover .news-image {
  transform: scale(1.03);
}

.news-date-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 0 4px 0 0;
}

.news-content {
  padding: 24px;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.news-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.news-badge {
  margin-left: 12px;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.news-summary {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 20px;
}

.news-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more-btn {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  padding: 0;
  height: auto;
}

.read-more-btn:hover {
  color: var(--vp-c-brand-2);
  background: transparent;
}

.arrow-icon {
  margin-left: 6px;
  transition: transform 0.3s ease;
}

.read-more-btn:hover .arrow-icon {
  transform: translateX(3px);
}

/* 加载更多按钮 */
.load-more {
  text-align: center;
  margin-top: 40px;
}

.load-more-btn {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-weight: 500;
  padding: 10px 24px;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  background-color: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .news-image-container {
    height: 180px;
  }
  
  .news-content {
    padding: 20px;
  }
  
  .news-header {
    flex-direction: column;
  }
  
  .news-badge {
    margin-left: 0;
    margin-top: 10px;
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .news-image-container {
    height: 160px;
  }
  
  .news-title {
    font-size: 1.15rem;
  }
}
</style>