<template>
  <section class="publications-section">
    <h2 class="section-title">Recent Publications</h2>
    <div class="publications-grid">
      <el-card 
        v-for="(pub, index) in publications" 
        :key="index" 
        class="publication-card"
        shadow="hover"
      >
        <div class="pub-image-container">
          <el-image :src="pub.image" fit="cover" class="pub-image" />
          <div class="pub-journal-tag">
            <el-tag type="success">{{ pub.journal }}</el-tag>
          </div>
        </div>
        <div class="pub-content">
          <h3 class="pub-title">{{ pub.title }}</h3>
          <div class="pub-meta">
            <el-popover
              placement="top"
              :width="400"
              trigger="hover"
              :disabled="!isAuthorsOverflow(index)"
            >
              <template #reference>
                <span 
                  ref="authorsRef"
                  class="pub-authors"
                  v-html="formatAuthors(pub.authors)"
                ></span>
              </template>
              <div class="popover-authors">
                <p v-for="(author, idx) in parseAuthors(pub.authors)" :key="idx" class="popover-author-item">
                  {{ author.name }}<sup v-if="author.hasStar">*</sup>
                </p>
              </div>
            </el-popover>
            <span class="pub-year">{{ pub.year }}</span>
          </div>
          <p class="pub-abstract">{{ pub.abstract }}</p>
          <div class="pub-actions">
            <el-button type="primary" text @click="$emit('navigate-to', pub.link)">
              Read Paper <el-icon><i-ep-right /></el-icon>
            </el-button>
            <el-button
              v-if="pub.github && /^https?:\/\/.+/.test(pub.github)"
              :style="{
                background: '#fff',
                borderRadius: '50%',
                minWidth: '0',
                border: '1px solid #e0e0e0'
              }"
              circle
              @click="window.open(pub.github, '_blank')"
            >
              <img src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg" alt="GitHub" width="20" />
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue';

defineProps({
  publications: {
    type: Array,
    required: true
  }
})

const authorsRef = ref([]);

// 解析作者数据，返回结构化对象数组
const parseAuthors = (authors) => {
  if (!Array.isArray(authors)) {
    return authors ? [{ name: String(authors), hasStar: authors.includes('*') }] : [];
  }
  return authors.map(author => ({
    name: author.replace('*', ''),
    hasStar: author.includes('*')
  }));
};

// 格式化作者名称，处理上标样式
const formatAuthors = (authors) => {
  const parsed = parseAuthors(authors);
  return parsed.map(author => {
    if (author.hasStar) {
      return `<span class="author-highlight">${author.name}<sup>*</sup></span>`;
    }
    return author.name;
  }).join(', ');
};

// 检查作者名称是否溢出
const isAuthorsOverflow = (index) => {
  return nextTick(() => {
    const el = authorsRef.value[index];
    if (el) {
      return el.scrollWidth > el.offsetWidth;
    }
    return false;
  });
};
</script>

<style scoped>
.author-highlight {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.author-highlight sup {
  font-size: 0.8em;
  vertical-align: super;
}

.popover-authors {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}

.popover-author-item {
  margin: 5px 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.publications-section {
  padding: 80px 0;
}

.section-title {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 50px;
  color: var(--vp-c-text-1);
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: var(--vp-c-brand-1);
  margin: 15px auto 0;
  border-radius: 2px;
}

.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 50px;
  margin-top: 40px;
}

.publication-card {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.publication-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.pub-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.pub-image {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  background-color: #ffffff;
}

.publication-card:hover .pub-image {
  transform: scale(1.1);
}

.pub-journal-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
}

.pub-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pub-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.pub-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.pub-authors {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.pub-year {
  margin-left: 10px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.pub-abstract {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pub-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

@media (max-width: 992px) {
  .publications-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .publications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .pub-image-container {
    height: 180px;
  }
}
</style>