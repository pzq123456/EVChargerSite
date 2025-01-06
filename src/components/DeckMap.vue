<template>
  <div id = "deck-map" > </div>
    <div id="control-panel">
      <div>
        <label>Radius</label>
        <input id="radius" type="range" min="1000" max="20000" step="1000" value="1000"></input>
        <span id="radius-value"></span>
      </div>
      <div>
        <label>Coverage</label>
        <input id="coverage" type="range" min="0" max="1" step="0.1" value="1"></input>
        <span id="coverage-value"></span>
      </div>
      <div>
        <label>Upper Percentile</label>
        <input id="upperPercentile" type="range" min="90" max="100" step="1" value="100"></input>
        <span id="upperPercentile-value"></span>
      </div>
      <div class="legned">
        <div style="background-color: rgb(1, 152, 189); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(73, 227, 206); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(216, 254, 181); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 237, 177); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 173, 84); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(209, 55, 78); width: 16.6666668%; height: 10px;"></div>
      </div>

      <div class="legnd-info">
        <span>Lower</span>
        <span>Higher</span>
      </div>
    </div>


  <!-- <div id="deck-map"></div> -->
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { data } from '@/loader/points.data.js';
const { eu, us, cn } = data; // data from csv


// deck-map
const deckmap = ref(null);

function loadDeckResources(callback) {
  return new Promise((resolve, reject) => {
    let resourcesLoaded = 0;
    const totalResources = 4;

    function resourceLoaded() {
      resourcesLoaded += 1;
      if (resourcesLoaded === totalResources) {
        let deckgl = callback();
        resolve(deckgl);
      }
    }

    function resourceFailed() {
      reject(new Error('Failed to load resources'));
    }

    // 加载 Deck JS
    const deckScript = document.createElement('script');
    deckScript.src = 'https://unpkg.com/deck.gl@^9.0.0/dist.min.js';
    deckScript.onload = resourceLoaded;
    deckScript.onerror = resourceFailed;
    document.head.appendChild(deckScript);

    // 加载 Maplibre CSS
    const maplibreCSS = document.createElement('link');
    maplibreCSS.rel = 'stylesheet';
    maplibreCSS.href = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css';
    maplibreCSS.onload = resourceLoaded;
    maplibreCSS.onerror = resourceFailed;
    document.head.appendChild(maplibreCSS);

    // 加载 Maplibre JS
    const maplibreScript = document.createElement('script');
    maplibreScript.src = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js';
    maplibreScript.onload = resourceLoaded;
    maplibreScript.onerror = resourceFailed;
    document.head.appendChild(maplibreScript);

    // 加载 D3 JS
    const d3Script = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
    d3Script.onload = resourceLoaded;
    d3Script.onerror = resourceFailed;
    document.head.appendChild(d3Script);
  });
}

// function getTooltip(object) {
//   if (!object) {
//     return null;
//   }
//   // const lat = object.position[1];
//   // const lng = object.position[0];
//   // const count = object.points.length;

//   console.log(object);  

//   return '0';
// }

// 编写一个测试函数 以确定是否成功加载资源
function test() {
    const {DeckGL, HexagonLayer} = deck;

    const deckgl = new DeckGL({
      container: 'deck-map',
      mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
      initialViewState: {
        longitude: 114,
        latitude: 36,
        zoom: 5,
        minZoom: 2,
        maxZoom: 10,
        pitch: 55
      },
      controller: true,
      cotainer: deckmap.value,
      // pickable: true,
      // getPosition: d => d,
      // getTooltip: getTooltip,
      getCursor: ({isHovering}) => isHovering ? 'pointer' : 'default',
    });

    const OPTIONS = ['radius', 'coverage', 'upperPercentile'];

    const COLOR_RANGE = [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]
    ];

    OPTIONS.forEach(key => {
        document.getElementById(key).oninput = renderLayer;
    });

    function renderLayer () {
        const options = {};
        OPTIONS.forEach(key => {
            const value = document.getElementById(key).value;
            document.getElementById(key + '-value').innerHTML = value;
            options[key] = Number(value);
        });

        const hexagonLayer = new HexagonLayer({
            id: 'heatmap',
            colorRange: COLOR_RANGE,
            data,
            elevationRange: [0, 1000],
            elevationScale: 250,
            extruded: true,
            getPosition: d => d,
            ...options
        });

        deckgl.setProps({
            layers: [hexagonLayer]
        });
    }

    let data = null;

    data = eu.map(d => [Number(d.lon), Number(d.lat)]);
    data = data.concat(us.map(d => [Number(d.lon), Number(d.lat)]));
    data = data.concat(cn.map(d => [Number(d.lon), Number(d.lat)]));

    renderLayer();

    return deckgl;

}

let deckgl = null;

onMounted(() => {
    loadDeckResources(test).then((deck) => {
        deckgl = deck;
        // console.log('DeckGL loaded');
        // console.log(deckgl);
    });

});



onUnmounted(() => {
    // console.log(deck);

    deckgl.finalize();
    // // canvas 清理
    deckgl.canvas.remove();

    deckgl = null;

      // 清理资源
    document.head.removeChild(document.querySelector('link[href="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://d3js.org/d3.v5.min.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/deck.gl@^9.0.0/dist.min.js"]'));

    // <div class="" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"></div>

    // 清除上述的 div

    // document.body.removeChild(document.querySelector('div[class=""]'));


  });


function interpolatePoints(start, end, numPoints) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const interpolatedPoint = {
      longitude: start.longitude + t * (end.longitude - start.longitude),
      latitude: start.latitude + t * (end.latitude - start.latitude),
      zoom: start.zoom + t * (end.zoom - start.zoom),
      pitch: start.pitch + t * (end.pitch - start.pitch)
    };
    points.push(interpolatedPoint);
  }
  return points;
}

function generateFlightPath(locations, numIntermediatePoints) {
  let flightPath = [];
  for (let i = 0; i < locations.length; i++) {
    const start = locations[i];
    const end = locations[(i + 1) % locations.length];
    const interpolatedPoints = interpolatePoints(start, end, numIntermediatePoints);
    flightPath = flightPath.concat(interpolatedPoints);
  }
  return flightPath;
}

function flying(deckgl) {
  const locations = [
    {longitude: 116.4074, latitude: 39.9042, zoom: 4, pitch: 50},
    {longitude: -98.5795, latitude: 39.8283, zoom: 4, pitch: 50},
    {longitude: 8.6821, latitude: 50.1109, zoom: 4, pitch: 50}
  ];

  const flightPath = generateFlightPath(locations, 100);
  let index = 0;

  function fly() {
    const location = flightPath[index];
    deckgl.setProps({
      viewState: {
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: location.zoom,
        pitch: location.pitch
      }
    });

    index = (index + 1) % flightPath.length;
  }

  // 添加退出条件
  // 循环一次后即退出
  const timer = setInterval(fly, 120);
  setTimeout(() => {
    clearInterval(timer);
  }, 120 * flightPath.length);

}

</script>

<style scoped>

#control-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 12px;
  padding: 20px;
  z-index: 1;
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 5px;
  box-shadow: var(--vp-shadow-1); /* 使用阴影变量 */
  backdrop-filter: blur(8px); /* 添加背景模糊效果 */
}

label {
  display: inline-block;
  width: 140px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

input {
  width: 100px;
  padding: 5px;
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 3px;
  background-color: var(--vp-c-bg); /* 使用背景变量 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.legned {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 添加间距 */
}

.legnd-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

#deck-map {
  height: 78vh;
  width: 100%;
  z-index: 0;
  margin: 0 auto;
  border-radius: 5px; /* 添加圆角 */
  overflow: hidden; /* 隐藏溢出内容 */
}
</style>