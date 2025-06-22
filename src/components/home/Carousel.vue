<template>
  <section class="carousel-section">
    <el-carousel height="400px" :interval="5000" arrow="always" motion-blur>
      <el-carousel-item v-for="(slide, index) in carousel" :key="index">
        <div class="carousel-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <el-image :src="slide.image" fit="cover" class="carousel-image" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup>
defineProps({
  carousel: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.carousel-section {
  margin: 60px 0;
}

.carousel-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
  background: rgba(66, 65, 65, 0.18);
}

.carousel-content h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.carousel-content p {
  font-size: 1.2rem;
  max-width: 80%;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>