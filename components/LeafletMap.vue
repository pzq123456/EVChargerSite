<template>
  <div ref="map" class="leaflet-map"></div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from 'vue';

import { baseMapInfos } from "../src/baseMaps.js";
import { getBaseMap } from "../src/utils.js";

export default {
  name: 'LeafletMap',
  props: {
    center: {
      type: Array,
      default: () => [51.505, -0.09],
    },
    zoom: {
      type: Number,
      default: 13,
    },
  },
  setup(props) {
    const map = ref(null);

    onMounted(() => {
      if (typeof window !== 'undefined') {
        // 动态加载 Leaflet JS 和 CSS
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        leafletScript.onload = () => { // Leaflet 加载完成后初始化地图
          // let map = L.map('map',
          //     {
          //         renderer: L.canvas(),
          //         attributionControl: false // 禁用归属信息
          //     }
          // ).setView([37.8, -96], 4);

          // let baseMaps = getBaseMap(baseMapInfos);
          // let layerControl = L.control.layers(baseMaps).addTo(map);
          // baseMaps["dark_all"].addTo(map);

          const L = window.L;

          map.value = L.map(map.value, {
            renderer: L.canvas(),
            attributionControl: false, // 禁用归属信息
          }).setView(props.center, props.zoom);

          const baseMaps = getBaseMap(baseMapInfos);
          const layerControl = L.control.layers(baseMaps).addTo(map.value);
          baseMaps.dark_all.addTo(map.value);

  

          // map.value = L.map(map.value, {
          //   center: props.center,
          //   zoom: props.zoom,
          // });

          // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          //   maxZoom: 19,
          //   attribution: '© OpenStreetMap',
          // }).addTo(map.value);

        };
        document.head.appendChild(leafletScript);

        // 动态加载 Leaflet CSS
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
      }
    });

    onBeforeUnmount(() => {
      if (map.value) {
        map.value.remove();
      }
    });

    return { map };
  },
};
</script>

<style>
.leaflet-map {
  height: 600px;
  width: 100%;
}
</style>
