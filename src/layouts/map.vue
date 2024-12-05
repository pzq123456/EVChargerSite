<template>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
        <mapDetails />
    </Drawer>

    <button @click="toggleDrawer" :class="{ open: isDrawerOpen, close: !isDrawerOpen }" id="toggle">
    </button>

    <LeafletMap :mainScript :center="mapCenter" :zoom="mapZoom" ref="map" />
</template>
  
<script setup>
    import { ref } from "vue";
    import Drawer from "@/components/Drawer.vue";
    import LeafletMap from '@/components/LeafletMap.vue';
    import mapDetails from "./mapDetails.vue";

    import { useMapStore } from '@/stores/mapStore';
    import { computed, watch } from 'vue';

    const mapCenter = ref([50, 10]);
    const mapZoom = ref(4);

    const mapStore = useMapStore();

    const selectedRegion = computed(() => mapStore.selectedRegion);

    let isDrawerOpen = ref(false);

    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };

    // 只要 selectedRegion 不为空就打开抽屉
    watch(selectedRegion, (newVal) => {
        if (newVal) {
            isDrawerOpen.value = true;
        }
    });

  import { baseMapInfos } from "@/layers/baseMaps.js";
  import { getBaseMap } from "@/layers/utils.js";
  import { initGeoJsonLayer } from "@/layers/geojsonlayer.js";

  import { data as eu } from '@/loader/eu.data.js';
  import { data as us } from '@/loader/us.data.js';
  import { data as cn } from '@/loader/cn.data.js';

  // const infoUpdate = function (props, data) {
  //   const mapStore = useMapStore();

  //   const contents = props
  //     ? `<b>${props.name}</b><br />${props.count} charging stations`
  //     : 'Hover over a state';
  //   this._div.innerHTML = `<h4>INFO</h4>${contents}`;
    
  //   if (props) {
  //     this._div.style.display = 'block';
  //     mapStore.updateHoveredRegion(props);  // 更新悬停区域信息
  //     // console.log(props.name);
  //   } else {
  //     this._div.style.display = 'none';
  //     mapStore.updateHoveredRegion(null);  // 没有悬停时重置信息
  //   }
  // };

  const clickCallback = function (properties) {
    const mapStore = useMapStore();
    
    if (properties){
      mapStore.updateSelectedRegion(properties);
    } else {
      mapStore.updateSelectedRegion(null);
    }
  };

  function mainScript(L, mapInstance, layerControl) {

    initGeoJsonLayer();
    // const baseMaps = getBaseMap(baseMapInfos);
    // const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

    // baseMaps.dark_all.addTo(mapInstance);

    const geoJsonLayer = L.geoJsonLayer("EVCharge Count", clickCallback);

    layerControl.addOverlay(geoJsonLayer, 'EVCharge Count');

    geoJsonLayer.addTo(mapInstance);

    geoJsonLayer.appendData(eu);
    geoJsonLayer.appendData(us);
    geoJsonLayer.appendData(cn);

    return geoJsonLayer;
  }

</script>

<style scoped>

#toggle.open {
    background-color: #ff1100b0;
    border-radius: 50%;
    width: 10px;
    height: 10px;
}

#toggle.close {
    background-color: #00ff08b0;
    border-radius: 50%;
    width: 10px;
    height: 10px;
}

</style>