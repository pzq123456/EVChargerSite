// stores/mapStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCityStore = defineStore('cityStore', () => {

  const selectedCity = ref(null);
  const selectedColumn = ref(null);

  function updateSelectedCity(cityData) {
    selectedCity.value = cityData;
  }

  function updateSelectedColumn(columnData) {
    selectedColumn.value = columnData;
  }

    return {
        selectedCity,
        selectedColumn,
        updateSelectedCity,
        updateSelectedColumn
    };
});
