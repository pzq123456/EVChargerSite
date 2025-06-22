<template>
  <section class="team-section">
    <h2 class="section-title">Our Team</h2>
    <el-row :gutter="20" justify="center">
      <el-col 
        v-for="member in team" 
        :key="member.name" 
        :xs="24" 
        :sm="12" 
        :md="8" 
        :lg="8"
      >
        <el-card class="team-card" shadow="hover">
          <el-image :src="member.image" fit="cover" class="member-image" />
          <div class="team-info">
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
            <p class="bio">{{ member.bio }}</p>
            <div class="social-links">
              <el-link :underline="false">
                <el-icon :size="20"><i-ep-user /></el-icon>
              </el-link>
              <el-link :underline="false">
                <el-icon :size="20"><i-ep-message /></el-icon>
              </el-link>
              <el-link :underline="false">
                <el-icon :size="20"><i-ep-link /></el-icon>
              </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
defineProps({
  team: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.team-section {
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

.team-card {
  height: 100%;
  transition: all 0.3s;
  border-radius: 12px;
  overflow: hidden;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.member-image {
  width: 100%;
  height: 250px;
}

.team-info {
  padding: 20px;
  text-align: center;
}

.team-info h3 {
  font-size: 1.4rem;
  margin-bottom: 5px;
  color: var(--vp-c-text-1);
}

.role {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 15px;
  font-weight: 500;
}

.bio {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 15px;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>