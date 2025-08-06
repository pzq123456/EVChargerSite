<template>
  <section class="projects-section">
    <h2 class="section-title">Individual Project/Papers</h2>
    <div class="projects-grid">
      <el-card 
        v-for="(project, index) in paginatedImageProjects" 
        :key="'image-'+index"
        class="project-card"
        shadow="hover"
        :class="{ 'animate-in': isVisible[index] }"
        ref="imageCardRefs"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
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
          <a v-if="project.link" :href="project.link" target="_blank" class="project-link">View Project</a>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const imageProjects = [
  {
    title: "Where are electric vehicle charging stations located globally?",
    image: "https://globalevdata.github.io/GlobalCharger/assets/img2.R_IwUWN7.png",
    link: "https://globalevdata.github.io/GlobalCharger/",
    paper: "",
    code: ""
  },
  {
    title: "United States Electric Vehicle Charger System",
    image: "https://globalevdata.github.io/USCharger/assets/img1.BzpLkadO.png",
    link: "https://globalevdata.github.io/USCharger/",
    paper: "",
    code: ""
  },
  {
    title: "Electric Mobility: Smart Infrastructure Planning and Operation",
    image: "https://static.wixstatic.com/media/907b0c_d5dce50fdc4544d4aa2f2ecfde32bd1d~mv2.png/v1/fit/w_558,h_558,q_90,enc_avif,quality_auto/907b0c_d5dce50fdc4544d4aa2f2ecfde32bd1d~mv2.png"
  },
  {
    title: "Shared Mobility: Sharing Vehicles and Infrastructure",
    image: "https://static.wixstatic.com/media/907b0c_f3d8edc2736c43b59ab17a7024562a64~mv2.png/v1/fit/w_559,h_558,q_90,enc_avif,quality_auto/907b0c_f3d8edc2736c43b59ab17a7024562a64~mv2.png"
  },
  {
    title: "Urban Micro-simulation",
    image: "https://static.wixstatic.com/media/907b0c_1abd37a611e34a7391c770379bd15e0f~mv2.png/v1/fit/w_558,h_558,q_90,enc_avif,quality_auto/907b0c_1abd37a611e34a7391c770379bd15e0f~mv2.png"
  },
  {
    title: "Autonomous Mobility: Adoption Behavior and Impact Assessment",
    image: "https://static.wixstatic.com/media/907b0c_0c070b602e0941e68144f090c3bc8f96~mv2.png/v1/fit/w_558,h_558,q_90,enc_avif,quality_auto/907b0c_0c070b602e0941e68144f090c3bc8f96~mv2.png"
  },
  {
    title: "Water-Energy Nexus: Behavioural Adaptation and Technology Adoption",
    image: "https://static.wixstatic.com/media/907b0c_f2b2dc0c5a584995bd39c2869b6f520d~mv2.png/v1/fit/w_559,h_558,q_90,enc_avif,quality_auto/907b0c_f2b2dc0c5a584995bd39c2869b6f520d~mv2.png"
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
  background: var(--vp-c-bg-soft);
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

.project-link {
  display: inline-block;
  margin-top: 10px;
  color: var(--vp-c-text-2);
  text-decoration: underline;
  position: absolute;
  bottom: 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-text-2);
  padding: 3px 6px;
  font-size: 0.8rem;
}

.project-link:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

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