<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ hero.title }}</h1>
          <p class="hero-tagline">{{ hero.tagline }}</p>
          <div class="hero-actions">
            <el-button 
              type="success" 
              size="large" 
              round 
              @click="$emit('scroll-to', 'about')"
            >
              Learn More
              <el-icon class="button-icon"><i-ep-arrow-right /></el-icon>
            </el-button>
          </div>
        </div>
        
        <div class="hero-media">
          <div class="logo-container">
            <el-image 
              :src="hero.logo" 
              class="logo-image" 
              fit="contain"
            />
            <div class="logo-shine"></div>
            <div class="logo-shadow"></div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator" @click="$emit('scroll-to', 'about')">
        <el-icon class="scroll-icon"><i-ep-arrow-down /></el-icon>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.title && value.tagline && value.logo
    }
  }
})

defineEmits(['scroll-to', 'contact'])
</script>

<style scoped>
.hero-section {
  padding: 80px 0 40px;
  width: 100%;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 60px;
}

.hero-text {
  flex: 1;
  text-align: left;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
  line-height: 1.2;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-tagline {
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 32px;
  color: var(--vp-c-text-2);
  max-width: 90%;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}


.hero-media {
  flex: 1;
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 400px;
  perspective: 1000px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
}

.logo-container:hover .logo-image {
  transform: translateY(-10px) rotateY(10deg) rotateX(5deg);
  filter: drop-shadow(0 10px 10px rgba(31, 112, 40, 0.798));
}


.logo-shadow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 40px;
  background: radial-gradient(ellipse at center, rgb(149, 149, 149) 0%, transparent 70%);
  filter: blur(10px);
  z-index: 1;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo-container:hover .logo-shadow {
  width: 90%;
  height: 50px;
  filter: blur(15px);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  animation: bounce 2s infinite;
}

.scroll-icon {
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.scroll-indicator:hover .scroll-icon {
  color: var(--vp-c-brand-2);
  transform: translateY(5px);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .hero-tagline {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-media {
    min-height: 300px;
  }
  
  .logo-container {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0 60px;
  }
  
  .hero-container {
    padding: 0 24px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-tagline {
    font-size: 1.15rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button,
  .secondary-button {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-tagline {
    font-size: 1rem;
  }
  
  .logo-container {
    height: 250px;
  }
}
</style>