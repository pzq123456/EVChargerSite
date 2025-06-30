<template>
  <section class="publications-section">
    <h2 class="section-title">Recent Publications</h2>
    <div class="publications-grid">
      <article 
        v-for="(pub, index) in publications" 
        :key="index" 
        class="publication-card"
      >
        <div class="pub-image-container">
          <img :src="pub.image" class="pub-image" />
          <div class="pub-journal-tag">
            <span class="journal-badge">{{ pub.journal }}</span>
          </div>
        </div>
        <div class="pub-content">
          <h3 class="pub-title">{{ pub.title }}</h3>
          <div class="pub-meta">
            <span 
              class="pub-authors"
              :title="getAuthorsTitle(pub.authors)"
            >
              <template v-for="(author, idx) in parseAuthors(pub.authors)" :key="idx">
                <span v-if="author.hasStar" class="author-highlight">
                  {{ author.name }}<sup>*</sup>
                </span>
                <span v-else>{{ author.name }}</span>
                <span v-if="idx < parseAuthors(pub.authors).length - 1">, </span>
              </template>
            </span>
            <span class="pub-year">{{ pub.year }}</span>
          </div>
          <p class="pub-abstract">{{ pub.abstract }}</p>
          <div class="pub-actions">
            <button class="read-button" @click="$emit('navigate-to', pub.link)">
              Read Paper <span class="arrow-icon">→</span>
            </button>
            <button
              v-if="pub.github && /^https?:\/\/.+/.test(pub.github)"
              class="github-button"
              @click="openGithub(pub.github)"
            >
              <img src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg" alt="GitHub" width="20" />
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  publications: {
    type: Array,
    required: true
  }
});

defineEmits(['navigate-to']);

// 解析作者数据
const parseAuthors = (authors) => {
  if (!Array.isArray(authors)) {
    return authors ? [{ name: String(authors), hasStar: authors.includes('*') }] : [];
  }
  return authors.map(author => ({
    name: author.replace('*', ''),
    hasStar: author.includes('*')
  }));
};

// 获取作者标题（用于原生 tooltip）
const getAuthorsTitle = (authors) => {
  const parsed = parseAuthors(authors);
  return parsed.map(author => author.name).join(', ');
};

// 安全打开 GitHub 链接
const openGithub = (url) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};
</script>

<style scoped>
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
  background: var(--vp-c-bg-soft);
}

.publication-card {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  object-fit: cover;
  transition: all 0.5s ease;
  background-color: #ffffff;
}

.publication-card:hover .pub-image {
  transform: scale(1.1);
}

.journal-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
  padding: 4px 12px;
  background: var(--el-color-success);
  color: white;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.pub-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
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

.pub-authors span:not(:last-child)::after {
  content: ', ';
}

.author-highlight {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.author-highlight sup {
  font-size: 0.8em;
  vertical-align: super;
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

.read-button {
  background: none;
  border: none;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}

.read-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.arrow-icon {
  font-size: 1.2em;
}

.github-button {
  background: #fff;
  border-radius: 50%;
  min-width: 0;
  border: 1px solid #e0e0e0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.github-button:hover {
  transform: scale(1.1);
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