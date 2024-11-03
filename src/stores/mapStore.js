// stores/mapStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('mapStore', () => {
  const hoveredRegion = ref(null);
  const selectedRegion = ref(null);

  function updateHoveredRegion(regionData) {
    hoveredRegion.value = regionData;
  }

  function updateSelectedRegion(regionData) {
    // console.log('updateSelectedRegion')
    selectedRegion.value = regionData;
  }

  return {
    hoveredRegion,
    selectedRegion,

    updateHoveredRegion,
    updateSelectedRegion,
  };
});
