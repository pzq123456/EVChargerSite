<template>
  <div class="team-page">
    <Hero :hero="teamData.hero" @scroll-to="scrollTo" />
    <Carousel :carousel="teamData.carousel" />
    <Features :features="teamData.features" @navigate-to="navigateTo" />
    <Publications :publications="teamData.publications" @navigate-to="navigateTo" />
    <News :news="teamData.news" :format-date="formatDate" :navigate-to="navigateTo" />
    <!-- <Team :team="teamData.team" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { teamData } from './data.js'
import Hero from './Hero.vue'
import Carousel from './Carousel.vue'
import Features from './Features.vue'
import Publications from './Publications.vue'
import News from './News.vue'
// import Team from './Team.vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
import { useRouter } from 'vitepress'

const router = useRouter()

const navigateTo = (link) => {
  if (link.startsWith('/')) {
    // 处理绝对路径（以/开头）
    const base = import.meta.env.BASE_URL || '/'
    const fullPath = base.endsWith('/') && link.startsWith('/') ? base.slice(0, -1) + link : base + link
    router.go(fullPath)
  } else if (link.startsWith('http')) {
    // 处理外部链接
    window.open(link, '_blank')
  } else {
    // 处理相对路径（如 News/2025-5-21.html）
    const base = import.meta.env.BASE_URL || '/'
    const fullPath = base + (base.endsWith('/') ? '' : '/') + link
    router.go(fullPath)
  }
}

const formatDate = (dateInput) => {
  try {
    // 处理多种日期输入格式
    let date;
    
    if (dateInput instanceof Date) {
      // 如果已经是Date对象，直接使用
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // 处理字符串格式的日期
      const parts = dateInput.split(/[-/]/);
      
      // 标准化日期字符串格式为YYYY-MM-DD
      if (parts.length === 3) {
        const year = parts[0].padStart(4, '0');
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        dateInput = `${year}-${month}-${day}`;
      }
      
      // 尝试解析日期
      date = new Date(dateInput);
      
      // 检查是否解析为无效日期
      if (isNaN(date.getTime())) {
        // 尝试其他格式
        date = new Date(dateInput.replace(/(\d+)(st|nd|rd|th)/, '$1'));
      }
    } else {
      throw new Error('Invalid date input type');
    }
    
    // 再次验证日期有效性
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    // 格式化选项
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date'; // 或者根据需求返回null/抛出错误
  }
};

const submitContact = () => {
  console.log('Form submitted:', contactForm.value)
  contactForm.value = { name: '', email: '', message: '' }
  ElMessage.success('Thank you for your message! We will get back to you soon.')
}
</script>

<style scoped>
.team-page {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>