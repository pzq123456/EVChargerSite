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
import { onMounted, ref, onBeforeUnmount, onUnmounted} from 'vue';

import { useData } from 'vitepress'
const { isDark } = useData();

import { baseMapInfos } from "../layers/baseMaps.js";
import { getBaseMap } from "../layers/utils.js";

const map = ref(null);
let mapInstance = null;

let geojsonLayer = null;

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

      geojsonLayer = props.mainScript(L, mapInstance, layerControl);
      // console.log('geojsonLayer', geojsonLayer);

    });
  }
});



onUnmounted(() => {
  if (mapInstance) {
    geojsonLayer.clear();
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
  height: 78vh;
  width: 100%;
  z-index: 0;
  /* 自行居中 */
  margin: 0 auto;
}

/* 自定义弹出框样式 */
.custom-popup .leaflet-popup-content-wrapper {
  background: var(--vp-c-bg-soft); /* 使用背景变量 */
  border-radius: 4px; /* 添加圆角 */
  box-shadow: 0 2px 6px var(--vp-c-divider); /* 使用阴影变量 */
}

.custom-popup .leaflet-popup-tip {
  background: var(--vp-c-bg-soft); /* 使用背景变量 */
}

/* 信息框样式 */
.info {
  padding: 6px 8px;
  font: 14px/16px var(--vp-font-family-base); /* 使用默认字体 */
  background: var(--vp-c-bg-soft); /* 使用背景变量 */
  box-shadow: 0 0 15px var(--vp-c-divider); /* 使用阴影变量 */
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

/* 图例样式 */
.legend {
  text-align: left;
  line-height: 18px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}

.legend-title {
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-border); /* 使用边框变量 */
}

/* 控件整体样式 */
.leaflet-control-select-button {
  padding: 10px;
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border-radius: 5px;
  box-shadow: 0 0 5px var(--vp-c-divider); /* 使用阴影变量 */
  font-family: var(--vp-font-family-base); /* 使用默认字体 */
}

/* 信息文本样式 */
.select-button-info {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

/* 下拉框样式 */
.select-button-dropdown {
  width: 150px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 3px;
  font-size: 14px;
  background-color: var(--vp-c-bg); /* 使用背景变量 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

/* 按钮样式 */
.select-button-button {
  padding: 5px;
  border-radius: 5px;
  background-color: var(--vp-c-success-1); /* 使用成功色变量 */
  color: var(--vp-c-white); /* 使用白色文本 */
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out; /* 添加悬停过渡效果 */
}

.select-button-button:hover {
  background-color: var(--vp-c-success-2); /* 悬停时使用更亮的成功色 */
}

</style>
