<template>
  <div ref="map" class="leaflet-map"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';

import { baseMapInfos } from "../layers/baseMaps.js";
import { getBaseMap } from "../layers/utils.js";

import { initGeoJsonLayer } from "../layers/geojsonlayer.js";

import { data } from "@/loader/eu.data.js";

import { useMapStore } from '@/stores/mapStore';

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

const map = ref(null);

let mapInstance = null;

const props = defineProps({
  center: {
    type: Array,
    default: () => [50, 10],
  },
  zoom: {
    type: Number,
    default: 4,
  },
});

// 动态加载 Leaflet 资源
function loadLeafletResources(callback) {
  // 加载 Leaflet JS
  const leafletScript = document.createElement('script');
  leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
  leafletScript.onload = callback;
  document.head.appendChild(leafletScript);

  // 加载 Leaflet CSS
  const leafletCSS = document.createElement('link');
  leafletCSS.rel = 'stylesheet';
  leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
  document.head.appendChild(leafletCSS);
}

onMounted(() => {
  if (typeof window !== 'undefined') {

    loadLeafletResources(() => {
      const L = window.L;

      mapInstance = L.map(map.value, {
        renderer: L.canvas(),
        attributionControl: false, // 禁用归属信息
      }).setView(props.center, props.zoom);

      initGeoJsonLayer();

      const baseMaps = getBaseMap(baseMapInfos);
      const layerControl = L.control.layers(baseMaps).addTo(mapInstance);
      baseMaps.dark_all.addTo(mapInstance);

      const geoJsonLayer = L.geoJsonLayer(infoUpdate, clickCallback);

      layerControl.addOverlay(geoJsonLayer, 'US States');

      geoJsonLayer.addTo(mapInstance);

      geoJsonLayer.updateData(data);

      // 添加比例尺
      L.control.scale({ position: 'bottomright' }).addTo(mapInstance);
    });}
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
  }

  mapInstance = null;

  map.value = null;
});



    

// export default {
//   name: 'LeafletMap',
//   props: {
//     center: {
//       type: Array,
//       default: () => [50, 10],
//     },
//     zoom: {
//       type: Number,
//       default: 4,
//     },
//   },
//   setup(props) {
//     const map = ref(null);

//     let mapInstance = null;

//     onMounted(() => {
//       if (typeof window !== 'undefined') {
//         // console.log(data);
//         // 动态加载 Leaflet JS 和 CSS
//         const leafletScript = document.createElement('script');
//         leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
//         leafletScript.onload = () => { // Leaflet 加载完成后初始化地图


//           const L = window.L;

//           mapInstance = L.map(map.value, {
//             renderer: L.canvas(),
//             attributionControl: false, // 禁用归属信息
//           }).setView(props.center, props.zoom);

//           initGeoJsonLayer();

//           const baseMaps = getBaseMap(baseMapInfos);
//           const layerControl = L.control.layers(baseMaps).addTo(mapInstance);
//           baseMaps.dark_all.addTo(mapInstance);

//           const geoJsonLayer = L.geoJsonLayer(infoUpdate);

//           layerControl.addOverlay(geoJsonLayer, 'US States');

//           geoJsonLayer.addTo(mapInstance);

//           geoJsonLayer.updateData(data);

//           // 添加比例尺
//           L.control.scale({ position: 'bottomright' }).addTo(mapInstance);
//         };

//         document.head.appendChild(leafletScript);

//         // 动态加载 Leaflet CSS
//         const leafletCSS = document.createElement('link');
//         leafletCSS.rel = 'stylesheet';
//         leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
//         document.head.appendChild(leafletCSS);
//       }
//     });

//     onBeforeUnmount(() => {
//       if (mapInstance) {
//         mapInstance.remove();
//       }

//       mapInstance = null;

//       map.value = null;
//     });

//     return { map };
//   },
// };
</script>

<style>
.leaflet-map {
  height: 600px;
  width: 100%;
}
.custom-popup .leaflet-popup-content-wrapper {
    background: #ffffffe1;
}

.custom-popup .leaflet-popup-tip {
    background: #ffffffab;
}

.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; 
  color: #000;
}
.info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; }
.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }
</style>
