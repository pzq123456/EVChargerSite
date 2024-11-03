<template>
  <div v-if="hoveredRegion">
    <p>当前悬停的区域: {{ hoveredRegion.name }}</p>
    <p>充电站数量: {{ hoveredRegion.count }}</p>
  </div>
  <div v-else>
    <p>悬停在某个区域以显示信息</p>
  </div>
</template>

<script>
import { useMapStore } from '@/stores/mapStore';
import { computed } from 'vue';

export default {
  setup() {
    const mapStore = useMapStore();
    const hoveredRegion = computed(() => mapStore.hoveredRegion);

    return {
      hoveredRegion
    };
  }
};
</script>
