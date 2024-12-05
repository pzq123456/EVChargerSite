import { baseMapInfos } from "./src/baseMaps.js";
import { getBaseMap} from "./src/utils.js";
import { initGeoJsonLayer } from "./src/geoJsonLayer.js";

import selectAndButtonControl from './src/controls/selectAndButton.js'; // 引入自定义控件

const toolbar = document.querySelector('.toolbar');

initGeoJsonLayer();

const colorsets = [
    ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'], // blue
    ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'], // blue-green
    ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'], // green
    ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'], // red
    ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'], // purple
    ['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704'], // orange
    ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'], // pink
];

const mapInstance = L.map("map",{
    zoomControl: false, // 禁用放大缩小控件
    renderer: L.canvas(), // canvas 渲染
}).setView([40.7128, -74.0060], 10);

const baseMaps = getBaseMap(baseMapInfos);

let layerControl = L.control.layers(baseMaps).addTo(mapInstance);

const C_geoJsonLayer = L.geoJsonLayer('Population Density',clickCallback);

function clickCallback(props) {
    console.log(props,this._legendName);
}

const C_Colors = colorsets[0];

C_geoJsonLayer.setColors(C_Colors);

layerControl.addOverlay(C_geoJsonLayer, 'Population Density');

baseMaps.dark_all.addTo(mapInstance);

C_us();

function C_us(){
    fetch('../../dataprocess/output/D/us.json')
        .then(response => response.json())
        .then(geoJsonData => {
            C_geoJsonLayer.updateData(geoJsonData, (d) => parseFloat(d.properties.V));

            const columns = C_geoJsonLayer.getColumns();

            C_geoJsonLayer.setColumn('area', C_Colors);

            const selectAndButtonControl = L.control.selectAndButton({
                columns: columns,
                buttonName: 'Show',
                info: 'Select a column to show',
                onButtonClick: function (selectedColumn) {
                    const index = columns.indexOf(selectedColumn);
                    const colorset = colorsets[index % colorsets.length];
            
                    C_geoJsonLayer.setColumn(selectedColumn, colorset);
                }
            });

            selectAndButtonControl.addTo(mapInstance);
        })
        .catch(error => {
            console.error('获取数据出错:', error);
        });
}