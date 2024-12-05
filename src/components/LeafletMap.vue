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
import { onMounted, ref, onBeforeUnmount, computed} from 'vue';

import { useData } from 'vitepress'
const { isDark } = useData();

import { baseMapInfos } from "../layers/baseMaps.js";
import { getBaseMap } from "../layers/utils.js";

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
        zoomControl: false, // 禁用缩放控制
      }).setView(props.center, props.zoom);

      // 限制最大缩放级别
      mapInstance.setMaxZoom(7);

      const baseMaps = getBaseMap(baseMapInfos);
      const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

      if (isDark.value) {
        baseMaps.dark_all.addTo(mapInstance);
      } else {
        baseMaps.light_all.addTo(mapInstance);
      }

      props.mainScript(L, mapInstance, layerControl);

    });
  }
});



onBeforeUnmount(() => {
  if (mapInstance) {
    delete window.L;
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

.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; }
.info h4 { margin: 0 0 5px; color: #000000; }
.legend { text-align: left; line-height: 18px; color: #000000; }
.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }

.legend-title {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid rgb(255, 255, 255);
}

/* 控件的整体样式 */
.leaflet-control-select-button {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.804);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-family: Arial, sans-serif;
}

/* 信息文本的样式 */
.select-button-info {
    margin-bottom: 5px;
    font-size: 20px;
    color: #333;
}

/* 下拉框的样式 */
.select-button-dropdown {
    width: 150px;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
}

/* 按钮的样式 */
.select-button-button {
    padding: 10px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    font-size: 14px;
}

.select-button-button:hover {
    background-color: #45a049;
}

</style>
