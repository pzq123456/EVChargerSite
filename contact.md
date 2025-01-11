# Contact Us

## ✉️Email: 
- global.ev.map@gmail.com
## 🏫Address: 
- Room ZN618, 6/F, North Wing, Block Z, Phase 8, 181 Chatham Road South, The Hong Kong Polytechnic University, Hung Hom, Kowloon, Hong Kong, China

<!-- ## 网站用户访问统计 -->

## 📊 User Access Statistics Map
> Letest 28 days user access statistics map



<iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/346c47ef-9107-40d6-885e-c3e4cfdfaec6/page/QvocE" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>


<!-- <LeafletMap :mainScript :center="mapCenter" :zoom="mapZoom" ref="map" />

<script setup>
    import LeafletMap from '@/components/LeafletMap.vue';
    import { ref } from 'vue';
    // 22.306481835980076, 114.17925285551138
    const mapCenter = ref([22.306481835980076, 114.17925285551138]);
    const mapZoom = ref(20);

    function mainScript(L, mapInstance, layerControl) {
        initGeoJsonLayer();
        initSelectAndButtonControl();

        const F_geoJsonLayer = L.geoJsonLayer('300m buffer (density)', clickCallback);

        const colors = colorsets[0];
        F_geoJsonLayer.setColors(colors);

        // layerControl.addOverlay(F_geoJsonLayer, 'Appendix F');
        F_geoJsonLayer.clear();

        F_geoJsonLayer.addTo(mapInstance);


        const {cn, us, eu} = data;
        F_geoJsonLayer.appendData(us,(d) => parseFloat(d.properties["300m buffer (density)"]));
        F_geoJsonLayer.appendData(eu,(d) => parseFloat(d.properties["300m buffer (density)"]));
        F_geoJsonLayer.appendData(cn,(d) => parseFloat(d.properties["300m buffer (density)"]));

        F_geoJsonLayer.setColumn('300m buffer (density)', colors);

        F_geoJsonLayer.update();

        const columns = F_geoJsonLayer.getColumns();

        const selectAndButtonControl = L.control.selectAndButton({
            columns: columns,
            buttonName: 'Show',
            info: 'Select a column to show',
            onButtonClick: function (selectedColumn) {
                const index = columns.indexOf(selectedColumn);
                F_geoJsonLayer.setColumn(selectedColumn, colors);
            }
        });

        selectAndButtonControl.addTo(mapInstance);

        return F_geoJsonLayer;
    }
</script> -->