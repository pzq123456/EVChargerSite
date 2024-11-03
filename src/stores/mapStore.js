// stores/mapStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('mapStore', () => {
  const hoveredRegion = ref(null);

  function updateHoveredRegion(regionData) {
    hoveredRegion.value = regionData;
  }

  return {
    hoveredRegion,
    updateHoveredRegion
  };
});
