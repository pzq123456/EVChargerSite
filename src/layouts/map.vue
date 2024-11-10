<template>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
        <mapDetails />
    </Drawer>
    <button @click="toggleDrawer" :class="{ open: isDrawerOpen, close: !isDrawerOpen }" id="toggle">
        {{ isDrawerOpen ? "Close" : "Open" }}
    </button>

    <LeafletMap :mainScript />

</template>
  
<script setup>
    import { ref } from "vue";
    import Drawer from "@/components/Drawer.vue";
    import LeafletMap from '@/components/LeafletMap.vue';
    import mapDetails from "./mapDetails.vue";
    import { useMapStore } from '@/stores/mapStore';
    import { computed, watch } from 'vue';

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

import { data as euData } from "@/loader/eu.data.js";

// import { useMapStore } from '@/stores/mapStore';

const infoUpdate = function (props, data) {
  const mapStore = useMapStore();

  const contents = props
    ? `<b>${props.name}</b><br />${props.count} charging stations`
    : 'Hover over a state';
  this._div.innerHTML = `<h4>US EV Charging Stations</h4>${contents}`;
  
  if (props) {
    this._div.style.display = 'block';
    mapStore.updateHoveredRegion(props);  // 更新悬停区域信息
    // console.log(props.name);
  } else {
    this._div.style.display = 'none';
    mapStore.updateHoveredRegion(null);  // 没有悬停时重置信息
  }
};

const clickCallback = function (properties) {
  // console.log("clickCallback");
  const mapStore = useMapStore();
  
  if (properties){
    mapStore.updateSelectedRegion(properties);
  } else {
    mapStore.updateSelectedRegion(null);
  }
};

function mainScript(L, mapInstance) {

  initGeoJsonLayer();
  const baseMaps = getBaseMap(baseMapInfos);
  const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

  baseMaps.dark_all.addTo(mapInstance);

  const geoJsonLayer = L.geoJsonLayer(infoUpdate, clickCallback);

  layerControl.addOverlay(geoJsonLayer, 'US States');

  geoJsonLayer.addTo(mapInstance);

  geoJsonLayer.updateData(euData);

  // 添加比例尺
  L.control.scale({ position: 'bottomright' }).addTo(mapInstance);
}
</script>

<style scoped>

#toggle.open {
    background-color: #f44336;
}

/* button 区分 open 和 close */

#toggle.close {
    background-color: #4CAF50;
}

</style>