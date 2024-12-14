# EVChargerSite
EVChargerSite

<!-- ## 设计
### 1. 地图组件设计：
- 将地图组件化，并且使用vue重写地图控件
- 地图控件的功能：控制地图行为，包括加载数据、图层管理、底图切换等
  - 图层管理组件：拟模仿 ArcMap 的图层管理器，以树状列表的形式展示图层。同时集成底图切换功能，作为一个默认的、可关闭的图层。
- 地图工具组件：以插件的形式拓展地图的功能，包括测量、标注、搜索等功能
  - 测量工具：支持测量距离、面积
  - 地理范围选择工具：支持选择地理范围，用于数据筛选
  
- 控制流：
  - 地图控件->控制->
    - 地图组件的行为->地图组件汇报状态（例如用户当前选择区域等）
        -  ->外部组件读取地图汇报数据并渲染出来，或作进一步处理


## 用于升级 drawer 组件的参考代码
- https://github.com/element-plus/element-plus/tree/dev/packages/components/drawer

## 风场
> - https://github.com/electricitymaps/electricitymaps-contrib/blob/master/web/src/features/weather-layers/wind-layer/windy.ts
> - https://github.com/electricitymaps/electricitymaps-contrib/blob/master/web/src/api/getWeatherData.ts -->