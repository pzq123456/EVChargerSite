<template>
  <section id="about" class="features-section">
    <h2 class="section-title">Our Features</h2>
    <el-row :gutter="20" justify="center">
      <el-col 
        v-for="feature in features" 
        :key="feature.title" 
        :xs="24" 
        :sm="12" 
        :md="8" 
        :lg="8"
      >
        <el-card class="feature-card" shadow="hover">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-details">{{ feature.details }}</p>
          <el-button type="success" plain @click="$emit('navigate-to', feature.link)">
            Learn More
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})

// defineEmits
defineEmits(['navigate-to'])
</script>

<style scoped>
.features-section {
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

.feature-card {
  height: 100%;
  text-align: center;
  padding: 30px 20px;
  margin-bottom: 20px;
  transition: all 0.3s;
  border-radius: 12px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
}

.feature-details {
  font-size: 1rem;
  margin-bottom: 25px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>