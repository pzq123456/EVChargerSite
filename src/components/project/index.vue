<template>
  <section class="projects-section">
    <h2 class="section-title">Individual Project/Papers</h2>
    
    <!-- Filter Section -->
    <div class="filter-section">
      <el-input
        v-model="searchQuery"
        placeholder="Search by title..."
        clearable
        class="search-input"
      >
        <template #prefix>
          <i class="el-icon-search"></i>
        </template>
      </el-input>
      <el-select v-model="roleFilter" placeholder="Filter by role" clearable>
        <el-option
          v-for="role in uniqueRoles"
          :key="role"
          :label="role"
          :value="role"
        />
      </el-select>
      <el-select v-model="fundingFilter" placeholder="Filter by funding" clearable>
        <el-option
          v-for="funding in uniqueFundings"
          :key="funding"
          :label="funding"
          :value="funding"
        />
      </el-select>
    </div>

    <!-- Text Projects -->
    <div class="projects-list">
      <el-card 
        v-for="(project, index) in paginatedTextProjects" 
        :key="'text-'+index"
        class="project-card"
        shadow="hover"
        :class="{ 'animate-in': isVisible[index] }"
        ref="textCardRefs"
      >
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
          <div class="project-meta">
            <span class="project-funding">{{ project.funding }}</span>
            <span class="project-period">{{ project.period }}</span>
          </div>
          <div class="project-role">
            <el-tag :type="project.role === 'PI' ? 'success' : 'info'">{{ project.role }}</el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <!-- Pagination for Text Projects -->
    <el-pagination
      v-if="filteredTextProjects.length > textItemsPerPage"
      v-model:current-page="currentTextPage"
      :page-size="textItemsPerPage"
      layout="prev, pager, next"
      :total="filteredTextProjects.length"
      class="pagination"
    />

    <!-- Image Projects -->
    <div class="projects-grid">
      <el-card 
        v-for="(project, index) in paginatedImageProjects" 
        :key="'image-'+index"
        class="project-card"
        shadow="hover"
        :class="{ 'animate-in': isVisible[index + paginatedTextProjects.length] }"
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
        </div>
      </el-card>
    </div>

    <!-- Pagination for Image Projects -->
    <el-pagination
      v-if="filteredImageProjects.length > imageItemsPerPage"
      v-model:current-page="currentImagePage"
      :page-size="imageItemsPerPage"
      layout="prev, pager, next"
      :total="filteredImageProjects.length"
      class="pagination"
    />
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const textProjects = [
  {
    title: "Electrifying the Bus System in Hong Kong: Feasibility Analysis and System Optimization",
    funding: "Chief Executive's Policy Unit of the Hong Kong Government",
    period: "Period: 2024 - 2025",
    role: "PI"
  },
  {
    title: "Evolutionary Mechanism and Impact Assessment of Hydrogen Fuel Cell Vehicle Market",
    funding: "Shenzhen Municipal Science and Technology Innovation Commission",
    period: "Period: 2023 - 2026",
    role: "PI"
  },
  {
    title: "Interlinked Low-Carbon Travel and Residential Behaviour: Energy, Climate, Social and Infrastructural Impacts",
    funding: "The Hong Kong Polytechnic University",
    period: "Period: 2022-2025",
    role: "PI"
  },
  {
    title: "Saving Water and Energy in the Residential Sector: Behavioural Adaptation and Technology Adoption",
    funding: "The Hong Kong Polytechnic University",
    period: "Period: 2023-2025",
    role: "PI"
  },
  {
    title: "Smart Infrastructure Planning for Transportation Electrification",
    funding: "The Hong Kong Polytechnic University",
    period: "Period: 2022-2024",
    role: "PI"
  },
  {
    title: "Assessing Local Environmental Benefits of Urban Transportation Electrification in Hong Kong",
    funding: "The Hong Kong Polytechnic University",
    period: "Period: 2021-2023",
    role: "PI"
  },
  {
    title: "Analysis and Modelling of Users' Willingness to Use the Vehicle-to-Grid Technology",
    funding: "National Natural Science Foundation of China",
    period: "Period: 2021-2023",
    role: "PI"
  },
  {
    title: "Developing Public Charging Infrastructure for Electric Vehicles: A Data-Driven and Activity-based Approach",
    funding: "The Hong Kong Polytechnic University",
    period: "Period: 2019-2022",
    role: "PI"
  }
];

const imageProjects = [
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
const roleFilter = ref('');
const fundingFilter = ref('');
const currentTextPage = ref(1);
const currentImagePage = ref(1);
const textItemsPerPage = ref(3);
const imageItemsPerPage = ref(6);
const textCardRefs = ref([]);
const imageCardRefs = ref([]);
const isVisible = ref({});

// Computed properties
const uniqueRoles = computed(() => {
  return [...new Set(textProjects.map(project => project.role))];
});

const uniqueFundings = computed(() => {
  return [...new Set(textProjects.map(project => project.funding))];
});

const filteredTextProjects = computed(() => {
  return textProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (!roleFilter.value || project.role === roleFilter.value) &&
    (!fundingFilter.value || project.funding === fundingFilter.value)
  );
});

const filteredImageProjects = computed(() => {
  return imageProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedTextProjects = computed(() => {
  const start = (currentTextPage.value - 1) * textItemsPerPage.value;
  return filteredTextProjects.value.slice(start, start + textItemsPerPage.value);
});

const paginatedImageProjects = computed(() => {
  const start = (currentImagePage.value - 1) * imageItemsPerPage.value;
  return filteredImageProjects.value.slice(start, start + imageItemsPerPage.value);
});

// Watch for filter changes and reset pagination
watch([searchQuery, roleFilter, fundingFilter], () => {
  currentTextPage.value = 1; // Reset to first page when filters change
});

watch(searchQuery, () => {
  currentImagePage.value = 1; // Reset to first page when search query changes
});

// Intersection Observer for animation
onMounted(() => {
  const cards = [...textCardRefs.value, ...imageCardRefs.value];
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

.filter-section {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  max-width: 300px;
}

.el-select {
  max-width: 250px;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
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

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.project-funding {
  font-weight: 500;
}

.project-period {
  color: var(--vp-c-brand-1);
  font-style: italic;
}

.project-role {
  margin-top: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
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

  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input, .el-select {
    max-width: 100%;
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