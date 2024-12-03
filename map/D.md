---
layout: page
---
# Appendix D: Spatial Distributions of the Housing Price Index of EVCSs at the City Level

<LeafletMap :mainScript :center="mapCenter" :zoom="mapZoom" ref="map" />


<script setup>
    import LeafletMap from '@/components/LeafletMap.vue';
    import { ref } from 'vue';

    import { baseMapInfos } from "@/layers/baseMaps.js";
    import { getBaseMap } from "@/layers/utils.js";
    import { initGeoJsonLayer } from "@/layers/geojsonlayer.js";

    import { data } from '@/loader/D.data.js';

    const infoUpdate = function (props, data) {
        // const name = 
        // 若 props 有 NAME_2 字段 或 cityname 字段，则显示该字段 二者只会出现一个

        const name = props ? props.NAME_2 || props.cityname : null;

    const contents = props
        ? `<b>${name}</b><br/>${props["mean_1500buffer-city"]} charging stations`
        : 'Hover over a state';
        this._div.innerHTML = `<h4>INFO</h4>${contents}`;

    };

    const colorsets = [
        ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'], // blue
        ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'], // blue-green
        ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'], // green
        ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'], // red
        ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'], // purple
        ['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704'], // orange
        ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'], // pink
    ];

    const mapCenter = ref([39.8283, -98.5795]);
    const mapZoom = ref(4);

    function mainScript(L, mapInstance) {

        initGeoJsonLayer();




        const baseMaps = getBaseMap(baseMapInfos);
        const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

        baseMaps.dark_all.addTo(mapInstance);

        const geoJsonLayer = L.geoJsonLayer(infoUpdate);

        const D_Colors = colorsets[6];
        geoJsonLayer.setColors(D_Colors);

        layerControl.addOverlay(geoJsonLayer, 'Appendix D');

        geoJsonLayer.addTo(mapInstance);
        geoJsonLayer.clear();
        const {cn, us} = data;
        geoJsonLayer.appendData(cn,(d) => parseFloat(d.properties["mean_1500buffer-city"]));
        geoJsonLayer.appendData(us,(d) => parseFloat(d.properties["mean_1500buffer-city"]));
        geoJsonLayer.update();


        // 添加比例尺
        L.control.scale({ position: 'bottomright' }).addTo(mapInstance);
    }



</script>
