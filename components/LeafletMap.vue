<template>
  <div ref="map" id = "map" class="leaflet-map"></div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
      nextTick(() => {
        map.value = L.map('map', {
          center: props.center,
          zoom: props.zoom,
        });
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        }).addTo(map.value);
      });
    });

    onBeforeUnmount(() => {
      map.value.remove();
    });

    return { map };
  },
};
</script>

<style>
.leaflet-map {
  height: 600px;  /* 根据需要调整高度 */
  width: 100%;   /* 根据需要调整宽度 */
}
</style>
