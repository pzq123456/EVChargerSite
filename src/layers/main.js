// import L from './src/leaflet/LeafletWithGlobals.js';
import { initGeoJsonLayer } from "./geojsonlayer.js";
// import { initDom } from './utils.js';
import { baseMapInfos } from './baseMaps.js';
import { initCanvasLayer } from './canvaslayer.js';
import { getBaseMap } from './utils.js';

// components
import {CountrySwitcher} from "./components/country-switcher.js";

initCanvasLayer();
initGeoJsonLayer();

// 注册 Web Component
customElements.define('country-switcher', CountrySwitcher);
const switcher = document.querySelector('country-switcher');

// cache
let cnGeoJsonData = null;
let usGeoJsonData = null;
let euGeoJsonData = null;

function cn() {
    const animationDuration = 2000; // 动画时长 2 秒（以毫秒为单位）

    // 切换视角 leaflet 动画效果
    map.flyTo([35, 105], 4, {
        duration: animationDuration / 1000, // 传入秒
        easeLinearity: 0.5,
        animate: true
    });

    // 获取 CSV 和 GeoJSON 数据并进行处理
    const dataFetchPromise = Promise.all([
        fetch('data/cn_count.csv')
            .then(response => response.text())
            .then(csvData => new Promise((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    worker: true,
                    complete: (results) => resolve(results.data),
                    error: (error) => reject(error)
                });
            })),
        fetch('data/GeoJSON/cn_province.geojson').then(response => response.json()),
    ])
    .then(([csvData, geoJsonData, gridData]) => {
        // 创建 Worker 实例
        const worker = new Worker('workers/cngeojson.js');


        return new Promise((resolve, reject) => {
            // 向 Worker 发送 GeoJSON 和 CSV 数据
            worker.postMessage({ geoJsonData, csvData });

            // 当 Worker 任务完成时接收数据
            worker.onmessage = function (e) {
                const updatedGeoJson = e.data;

                cnGeoJsonData = updatedGeoJson; // 缓存数据

                // 终止 Worker
                worker.terminate();
                
                // 解析成功，返回结果
                resolve(updatedGeoJson);
            };

            // 捕获 Worker 错误
            worker.onerror = function (error) {
                worker.terminate();
                reject(error);
            };
        });

    });

    // 创建一个动画时长的 Promise
    const animationPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve('动画完成');
        }, animationDuration);
    });

    // 使用 Promise.race 来决定何时更新数据
    Promise.all([dataFetchPromise, animationPromise, fetch('data/cn_grid.json').then(response => response.json())])
        .then(([updatedGeoJson, _, gridData]) => {
            // 更新或渲染 GeoJSON 图层，确保动画结束后执行
            geoJsonLayer.updateData(updatedGeoJson);
            canvasLayer.appendGridJSON(gridData);
            // geoJsonLayer.updateInfoUpdate(cn_infoUpdate);
        })
        .catch(error => {
            console.error('获取数据或处理出错:', error);
        });
}


function us(){
    // 切换视角
    map.flyTo([37.8, -96], 4, {
        duration: 2,
        easeLinearity: 0.5,
        animate: true
    });

    Promise.allSettled([
        fetch('data/GeoJSON/us_states.json').then(response => response.json()),
        fetch('data/USApoints.csv').then(response => response.text()),
    ])
    .then(results => {
        // 处理结果
        const geoJsonResult = results[0];
        const csvResult = results[1];
        const gridResult = results[2];
    
        if (geoJsonResult.status === 'fulfilled') {
            geoJsonLayer.updateData(geoJsonResult.value);

            // cache data
            usGeoJsonData = geoJsonResult.value;

        } else {
            console.error('获取 GeoJSON 数据失败:', geoJsonResult.reason);
        }
    
        if (csvResult.status === 'fulfilled') {
            Papa.parse(csvResult.value, {
                header: true, // 如果 CSV 有表头，设置为 true
                dynamicTyping: true, // 自动将数字和布尔值转换为对应类型
                skipEmptyLines: true, // 跳过空行
                worker: true, // 使用 Web Worker 处理 CSV
    
                chunk: function(results, parser) {
                    canvasLayer.appendData(results.data, (d) => [parseFloat(d.Latitude), parseFloat(d.Longitude)]);
                    // console.log(canvasLayer._grid.grid);
                },
            });
        } else {
            console.error('获取 CSV 数据失败:', csvResult.reason);
        }
    })
    .catch(error => {
        console.error('总体请求出错:', error);
    });
}

function eu(){
    const animationDuration = 2000; // 动画时长 2 秒（以毫秒为单位）

    map.flyTo([50, 10], 4, {
        duration: animationDuration / 1000, // 传入秒
        easeLinearity: 0.5,
        animate: true
    });

    // 获取 CSV 和 GeoJSON 数据并进行处理
    const dataFetchPromise = Promise.all([
        fetch('data/eu_count.csv')
            .then(response => response.text())
            .then(csvData => new Promise((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    worker: true,
                    complete: (results) => resolve(results.data),
                    error: (error) => reject(error)
                });
            })),
        fetch('data/GeoJSON/europe.geojson')
            .then(response => response.json())
        ])
        .then(([csvData, geoJsonData]) => {
            // 创建 Worker 实例
            const worker = new Worker('workers/eugeojson.js');

            return new Promise((resolve, reject) => {
                // 向 Worker 发送 GeoJSON 和 CSV 数据
                worker.postMessage({ geoJsonData, csvData });

                // 当 Worker 任务完成时接收数据
                worker.onmessage = function (e) {
                    const updatedGeoJson = e.data;

                    euGeoJsonData = updatedGeoJson; // 缓存数据

                    // 终止 Worker
                    worker.terminate();
                    
                    // 解析成功，返回结果
                    resolve(updatedGeoJson);
                };

                // 捕获 Worker 错误
                worker.onerror = function (error) {
                    worker.terminate();
                    reject(error);
                };
            });
        });

    // 创建一个动画时长的 Promise
    const animationPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve('动画完成');
        }, animationDuration);
    });

    // 使用 Promise
    Promise.all([dataFetchPromise, animationPromise, fetch('data/eu_grid.json').then(response => response.json())])
        .then(([updatedGeoJson, _, gridData]) => {
            // 更新或渲染 GeoJSON 图层，确保动画结束后执行
            geoJsonLayer.updateData(updatedGeoJson);
            canvasLayer.appendGridJSON(gridData);
            // geoJsonLayer.updateInfoUpdate(eu_infoUpdate);
        })
        .catch(error => {
            console.error('获取数据或处理出错:', error);
        });
}

// initDom(document.getElementById('map')); // set the map size to the screen size

let map = L.map('map',
    {
        renderer: L.canvas(),
        attributionControl: false // 禁用归属信息
    }
).setView([37.8, -96], 4);

let baseMaps = getBaseMap(baseMapInfos);
let layerControl = L.control.layers(baseMaps).addTo(map);
baseMaps["dark_all"].addTo(map);

function customPopupRenderer(info){
    // ID,City,State,Station Name,Latitude,Longitude
    return `<div>
        <h3>Info</h3>
        <p>Latitude: ${info.Latitude}</p>
        <p>Longitude: ${info.Longitude}</p>
        <p>City: ${info.City}</p>
        <p>State: ${info.State}</p>
        <p>Station Name: ${info["Station Name"]}</p>
    </div>`;
}



const infoUpdate = function (props, data) {
    const contents = props ? `<b>${props.name}</b><br />${props.count} charging stations` : 'Hover over a state';
    this._div.innerHTML = `<h4>US EV Charging Stations</h4>${contents}`;
}
// const cn_infoUpdate = function (props, data) {
//     const contents = props ? `<b>${props.pr_name}</b><br />${props.count} charging stations` : 'Hover over a state';
//     this._div.innerHTML = `<h4>China EV Charging Stations</h4>${contents}`;
// }

// const eu_infoUpdate = function (props, data) {
//     const contents = props ? `<b>${props.NAME}</b><br />${props.count} charging stations` : 'Hover over a state';
//     this._div.innerHTML = `<h4>Europe EV Charging Stations</h4>${contents}`;
// }

const geoJsonLayer = L.geoJsonLayer(infoUpdate);
const canvasLayer = L.canvasLayer(customPopupRenderer);

layerControl.addOverlay(geoJsonLayer, 'State Station Count');
layerControl.addOverlay(canvasLayer, 'Charging Stations');

// layerControl.expand();
geoJsonLayer.addTo(map);
// canvasLayer.addTo(map);

// C_us();

// function C_us(){
//     // data\GeoJSON\C\C_us.geojson
//     fetch('data/GeoJSON/C/C_us.geojson')
//         .then(response => response.json())
//         .then(geoJsonData => {
//             console.log('获取数据成功:', geoJsonData);
//             geoJsonLayer.updateData(geoJsonData, (d) => parseFloat(d.properties.V));
//             console.log('geoJsonLayer:', geoJsonLayer);
//         })
//         .catch(error => {
//             console.error('获取数据出错:', error);
//         });
// }

// const c_US_infoUpdate = function (props, data) {
//     const contents = props ? `<b>${props.NAME_1}-${props.NAME_2}</b><br />${props.V} (density)` : 'Hover over a state';
//     this._div.innerHTML = `<h4>population density</h4>${contents}`;
// }

switcher.setCountries([
    {
        name: 'USA',
        callback: us
    },
    {
        name: 'China',
        callback: cn
    },
    {
        name: 'Europe',
        callback: eu
    },
    {
        name: 'global',
        callback: () => {
            map.flyTo([0, 0], 2, {
                duration: 2,
                easeLinearity: 0.5,
                animate: true
            });

            if (usGeoJsonData) {
                geoJsonLayer.appendData(usGeoJsonData);
            }

            if (cnGeoJsonData) {
                geoJsonLayer.appendData(cnGeoJsonData);
            }

            if (euGeoJsonData) {
                geoJsonLayer.appendData(euGeoJsonData);
            }
        }
    }
]);