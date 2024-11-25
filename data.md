# Global Public Electric Vehicle Charging Data in 2022

- **For** the US, we collected the location data of 46,548 EVCSs (with a sample rate of 87.02%) from the Alternative Fuels Data Center; 
- **For** China, we collected the location data of 73,114 EVCSs (with a sample rate of 65.64%) from the AMAP, one of the largest online mapping service providers in China. 
- **For** Europe, we collected the location data of 317,528 recharging points (with a sample rate of 49.65%) from the European Alternative Fuels Observatory. 

These recharging points can be further grouped into 95,133 EVCSs according to the field of “evse_uid” in the dataset.
You can download the sample data here; You could request for the full dataset by sending us (global.ev.map@gmail.com) the application form. 


---
<dataTable />

<script setup>
    import dataTable from '@/layouts/dataTable.vue'
    import LeafletMap from '@/components/LeafletMap.vue';

    import { baseMapInfos } from "@/layers/baseMaps.js";
    import { getBaseMap } from "@/layers/utils.js";
    import { initGeoJsonLayer } from "@/layers/geojsonlayer.js";

    import { data as eu } from '@/loader/eu.data.js';
    import { data as us } from '@/loader/us.data.js';
    import { data as cn } from '@/loader/cn.data.js';

    function mainScript(L, mapInstance) {
        initGeoJsonLayer();
        const baseMaps = getBaseMap(baseMapInfos);
        const layerControl = L.control.layers(baseMaps).addTo(mapInstance);

        baseMaps.dark_all.addTo(mapInstance);

        const geoJsonLayer = L.geoJsonLayer(infoUpdate);

        layerControl.addOverlay(geoJsonLayer, 'Administrative divisions');

        geoJsonLayer.addTo(mapInstance);

        geoJsonLayer.appendData(eu);
        geoJsonLayer.appendData(us);
        geoJsonLayer.appendData(cn);

        // 添加比例尺
        L.control.scale({ position: 'bottomright' }).addTo(mapInstance);
    }

    const infoUpdate = function (props, data) {
        const contents = props
            ? `<b>${props.name}</b><br />${props.count} charging stations`
            : 'Hover over a state';
        this._div.innerHTML = `<h4>INFO</h4>${contents}`;
    };
</script>
---
<leafletMap :mainScript/>

> Data Preview in the **map** above.
