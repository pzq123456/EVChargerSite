---
layout: page
---
# Spatial Distributions of the Level of Population Coverage of EVCSs at the City Level

<Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
    <cityDetails />
</Drawer>

<button @click="toggleDrawer" :class="{ open: isDrawerOpen, close: !isDrawerOpen }" id="toggle">
</button>

<LeafletMap :mainScript :center="mapCenter" :zoom="mapZoom" ref="map" />


<script setup>
    import LeafletMap from '@/components/LeafletMap.vue';
    import { ref, watch } from 'vue';
    import { initGeoJsonLayer } from "@/layers/geojsonlayer.js";

    import { data } from '@/loader/C.data.js';
    import Drawer from "@/components/Drawer.vue";
    import cityDetails from "@/layouts/cityDetails.vue";

    import { useCityStore } from '@/stores/cityStore';
    import { computed } from 'vue';


    const cityStore = useCityStore();

    const selectedCity = computed(() => cityStore.selectedCity);

    const colorsets = [
        ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'], // blue
        // ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'], // blue-green
        // ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'], // green
        // ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'], // red
        // ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'], // purple
        // ['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704'], // orange
        // ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'], // pink
    ];

    const mapCenter = ref([39.8283, -98.5795]);
    const mapZoom = ref(4);

    let isDrawerOpen = ref(false);

    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };

    // 只要 selectedRegion 不为空就打开抽屉
    watch(selectedCity, (newVal) => {
        if (newVal) {
            isDrawerOpen.value = true;
        }
    });

    const clickCallback = function (properties) {
        if (properties){
            cityStore.updateSelectedCity(properties);
            cityStore.updateSelectedColumn(this._legendName);
        } else {
            cityStore.updateSelectedCity(null);
            cityStore.updateSelectedColumn(null);
        }
    };

    function mainScript(L, mapInstance, layerControl) {

        initGeoJsonLayer();

        const geoJsonLayer = L.geoJsonLayer('Population Coverage of EVCSs', clickCallback);

        const D_Colors = colorsets[0];
        geoJsonLayer.setColors(D_Colors);

        layerControl.addOverlay(geoJsonLayer, 'Population Coverage of EVCSs');
        geoJsonLayer.clear();

        geoJsonLayer.addTo(mapInstance);

        const {cn, us, eu} = data;
        geoJsonLayer.appendData(cn,(d) => parseFloat(d.properties.V));
        geoJsonLayer.appendData(us,(d) => parseFloat(d.properties.V));
        geoJsonLayer.appendData(eu,(d) => parseFloat(d.properties.V));
        geoJsonLayer.update();

        return geoJsonLayer;
    }

</script>


<style scoped>
    h1 {
        font-size: 2em;
        text-align: center;
        margin: 0.67em 0;
        color: var(--vp-c-brand-1);
    }

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
