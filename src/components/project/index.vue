<template>
  <section class="projects-section">
    <h2 class="section-title">Featured Projects</h2>
    <div class="projects-grid">
      <el-card
        v-for="(project, index) in paginatedImageProjects"
        :key="'image-' + index"
        class="project-card"
        shadow="hover"
        :class="{ 'animate-in': isVisible[index] }"
        ref="imageCardRefs"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @click="goToLink(project.link)"
      >
        <div class="project-image-container">
          <el-image
            :src="project.image"
            fit="contain"
            class="project-image"
            lazy
          />
        </div>
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import image1 from './image1.png?url'
import image2 from './image2.png?url'

const imageProjects = [
  {
    title: "Where are electric vehicle charging stations located globally?",
    image: image1,
    link: "https://globalevdata.github.io/USCharger/map/A.html",
    paper: "",
    code: ""
  },
  {
    title: "Decade-long EV charging accessibility and equity in U.S.",
    image: image2,
    link: "https://globalevdata.github.io/USCharger/",
    paper: "",
    code: ""
  }
];

// State management
const searchQuery = ref('');
const imageCardRefs = ref([]);
const isVisible = ref({});

// Pagination variables
const currentImagePage = ref(1);
const imageItemsPerPage = ref(6); // Show all projects by default

const filteredImageProjects = computed(() => {
  return imageProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedImageProjects = computed(() => {
  const start = (currentImagePage.value - 1) * imageItemsPerPage.value;
  return filteredImageProjects.value.slice(start, start + imageItemsPerPage.value);
});

// Intersection Observer for animation
onMounted(() => {
  const cards = [...imageCardRefs.value];
  cards.forEach((card, index) => {
    useIntersectionObserver(
      card,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          isVisible.value[index] = true;
        }
      },
      { threshold: 0.1 }
    );
  });
});

// Mouse move handlers for border highlight
const handleMouseMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};

const handleMouseLeave = (event) => {
  const card = event.currentTarget;
  card.style.setProperty('--mouse-x', '50%');
  card.style.setProperty('--mouse-y', '50%');
};

// New method for navigation
const goToLink = (link) => {
  if (link) {
    window.open(link, '_blank');
  }
};
</script>

<style scoped>
.projects-section {
  padding: 60px 0;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--vp-c-bg);
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: var(--vp-c-text-1);
  position: relative;
  font-weight: 600;
}

.section-title::after {
  content: '';
  display: block;
  width: 20%;
  height: 4px;
  background: linear-gradient(to right, var(--vp-c-brand-2), var(--vp-c-brand-1), transparent);
  margin: 15px auto 0;
  border-radius: 2px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.project-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  cursor: pointer; /* Add cursor style to indicate clickability */
}

.project-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  padding: 2px;
  background: radial-gradient(
    circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    var(--vp-c-brand-1) 0%,
    transparent 80%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: white;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: 24px;
}

.project-title {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  font-weight: 500;
}

/* The original project-link styles and element are removed */

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 40px 20px;
  }

  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .project-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }

  .project-image-container {
    height: 200px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>