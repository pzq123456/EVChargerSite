<template>
  <div ref="map" class="leaflet-map"></div>
</template>

<script setup>
/**
 * @file LeafletMap.vue
 * @description Leaflet 地图组件
 * 封装 Leaflet 为纯粹的地图组件，不包含任何业务逻辑
 * - 使用 mainScript 属性传入主要的地图脚本例如：加载地图图层、控制器等
 */
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';

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

  mainScript: {
    type: Function,
    default: defaultMainScript,
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

      // 限制最大缩放级别
      mapInstance.setMaxZoom(7);

      props.mainScript(L, mapInstance);

    });}
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
  }

  mapInstance = null;

  map.value = null;

  // 移除 Leaflet CSS
  const leafletCSS = document.querySelector('link[href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"]');
  leafletCSS && leafletCSS.remove();

  // 移除 Leaflet JS
  const leafletScript = document.querySelector('script[src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"]');
  leafletScript && leafletScript.remove();

});

</script>

<script type="module">
import { baseMapInfos } from "../layers/baseMaps.js";
import { getBaseMap } from "../layers/utils.js";

export function defaultMainScript(L, mapInstance) {

  const baseMaps = getBaseMap(baseMapInfos);
  const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

  baseMaps.dark_all.addTo(mapInstance);
}
</script>

<style>
.leaflet-map {
  height: 75vh;
  width: 95%;
  z-index: 0;
  /* 自行居中 */
  margin: 0 auto;
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
