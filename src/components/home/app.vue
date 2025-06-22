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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

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