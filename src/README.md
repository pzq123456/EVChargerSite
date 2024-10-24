# EVChargerMap

## 行政区划 geojson 数据源
- CN : https://github.com/GaryBikini/ChinaAdminDivisonSHP
- EU : https://github.com/leakyMirror/map-of-europe
## 充电桩空间分布地图
1. 充电桩点状空间分布
2. 指标空间单元分布，最好可以分级呈现（国家、省级、市），点开查看细节
3. 政策坐在城市层级（次要）
4. 数据筛选分类（功率、交流电）

## 性能优化
1. 点数据： 充电桩数据（美国）大约有6W条，如果直接使用 Leaflet 的 Marker 进行绘制，会导致页面明显卡顿（甚至崩溃）。存在两种性能优化方案，
   1. 使用 Leaflet.MmarkerCluster 插件：该插件会动态对图中展示的 Marker 进行优化显示，例如将密度过大的区域简化为一个标识了数据和颜色的单一的Dom图标。
      - 优点：可以一定程度上缓解绘制巨量数据点的性能问题，同时保留了Dom事件监听能力（不用自己写碰撞检测算法来确定当前活跃点）。
      - 缺点：
        - 仍然存在性能问题，对于1W条向上的数据点，简化它们需要一定的时间，会造成页面明显卡顿。
        - 插件结构相对复杂，短时间难以掌握有效细节，因此很难Debug及优化。
    2. 使用 Canvas 图层（推荐）：Canvas绘制数据点，6W 数据点不会造成页面明显卡顿。
       - 优点：自由度高，性能足够
       - 缺点：
         - 需要自行实现所有的交互功能，例如鼠标悬停检测、候选点空间筛选等，这些交互支撑算法实现的不好也会导致明显的页面卡顿。
         - 绘制的API为 Canvas 的二维上下文，偏底层，与Dom的CSS不同。
## 数据结构
1. 充电站 ：市，省/州，国家，充电枪数目，充电接口类型

```js
charger: GeoJSON

lat : ,
lon : ,

properties
{
    id: 1,
    power : ,
    attribute : ,
    name : 
}

```

## 需要保留的字段
ID,
City,
State,
Station Name,
Latitude,
Longitude,

https://observablehq.com
## 底图
> - see : https://github.com/CartoDB/basemap-styles

```js
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">Carto</a>'
    }).addTo(map);
```

- 底图有如下样式参数。
```
light_all,
dark_all,
light_nolabels,
light_only_labels,
dark_nolabels,
dark_only_labels,
rastertiles/voyager,
rastertiles/voyager_nolabels,
rastertiles/voyager_only_labels,
rastertiles/voyager_labels_under
```


## plugin
- https://github.com/joker-x/Leaflet.geoCSV
- https://github.com/Leaflet/Leaflet.markercluster/tree/master
- https://github.com/robertleeplummerjr/Leaflet.glify
- https://blog.sumbera.com/2014/06/08/leaflet-webgl-many-points-rendering/
## References
- https://www.cnblogs.com/wangsongbai/p/13444667.html