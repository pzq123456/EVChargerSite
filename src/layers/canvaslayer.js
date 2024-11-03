import { Stastics, Grid } from "./stastics.js";

export function initCanvasLayer() {

    L.CanvasLayer = L.Layer.extend({
        initialize: function () {
            this._data = [];
            this._originalData = [];
            this._stastics = new Stastics(); // 单值统计
            this._grid = new Grid(); // 网格
            // console.log(this._grid);
            this._customGetVal = null; // 自定义统计函数
            this._legend = null;
            this._colors = [
                '#f7fbff', '#deebf7', '#9ecae1', 
                '#6baed6', '#3182bd', '#08519c', '#08306b'
            ];
        },
        
        // 在添加图层到地图时调用
        onAdd: function (map) {
            this._map = map;

            // 创建 Canvas 元素
            this._canvas = L.DomUtil.create('canvas', 'leaflet-canvas-layer');
            var size = this._map.getSize();
            this._canvas.width = size.x;
            this._canvas.height = size.y;

            // 获取 Canvas 渲染上下文
            this._ctx = this._canvas.getContext('2d');

            // 把 Canvas 元素添加到地图的 overlayPane
            var overlayPane = this._map.getPane('overlayPane');
            overlayPane.appendChild(this._canvas);

            // 监听地图的视图变化事件（缩放、平移）
            this._map.on('mousemove', this._onMouseMove, this); // 监听鼠标移动事件
            this._map.on('zoom', this._onZoom, this); // 监听缩放事件
            this._map.on('click', this._onClick, this); // 添加点击事件

            this._hoveredPoint = null;

            this._createLegend();
            this._legend.addTo(this._map);
            // 绘制初始图形
            this._resetCanvas();
        },

        _onZoom: function () {
            this._resetCanvas();
        },

        _customPopupRenderer(info){
            return `<div>
                ${info.toString()}
            </div>`;
        },

        _resetData(){
            this._data = [];
            this._originalData = [];
            this._stastics.clear();
        },

        setData(data, getLatLng = function (d) { return d; }, getVal) {
            this._data = data.map(getLatLng);
            this._originalData = data;
            if(getVal){ // 如果有统计函数 才会进行统计
                this._stastics.append(data, getVal);
                this._customGetVal = getVal;
            }
            this._resetCanvas();
        },

        // 追加数据
        appendData(data, getLatLng = function (d) { return d; }, getVal) {
            // console.log(this._grid.getSparseGridArray());
            this._data = this._data.concat(data.map(getLatLng));
            this._originalData = this._originalData.concat(data);
            if(getVal){ // 如果有统计函数 才会进行统计
                this._stastics.append(data, getVal);
                this._customGetVal = getVal; 
            }else{
                this._grid.insertPoints(data.map(getLatLng));
                this._stastics.append(this._grid.getSparseGridArray(), (d) => d[2]);
            }
            this._resetCanvas();
            if(this._legend){
                this._legend.update();
            }
        },

        appendGridJSON(json){
            this._grid.insertJSON(json);
            this._stastics.appendGridData(this._grid);
            this._resetCanvas();
            if(this._legend){
                this._legend.update();
            }
        },

        // 点击事件处理函数
        _onClick: function (e) {
            let zoom = this._map.getZoom();

            if(zoom < 10){
                if (this._hoveredPoint) {
                    let latLng = this._grid.getSparseGridArray()[this._hoveredPointIndex];
    
                    // 创建并弹出 Popup，显示经纬度信息
                    let popup = L.popup({
                        maxWidth: 500, // 最大宽度
                        minWidth: 150, // 最小宽度
                        // maxHeight: 200, // 最大高度
                        autoPan: true, // 自动平移以确保 Popup 完全显示在视口内
                        autoPanPaddingTopLeft: L.point(10, 10), // 设置弹窗上方和左侧的平移边距
                        autoPanPaddingBottomRight: L.point(10, 10), // 设置弹窗下方和右侧的平移边距
                        className: 'custom-popup' // 添加自定义类名
                    })
                        .setLatLng(L.latLng(latLng[0], latLng[1])) // 设置 Popup 的经纬度坐标
                        .openOn(this._map);
                    

                    popup.setContent(
                        `<div>
                            lat: ${latLng[0]}<br>
                            lng: ${latLng[1]}<br>
                            value in grid: ${latLng[2]}
                        </div>`
                    );
                }
            }else{
                if (this._hoveredPoint) {
                    let latLng = this._data[this._hoveredPointIndex];
                    // 获取悬停点的经纬度
                    let info = this._originalData[this._hoveredPointIndex];
    
                    // 创建并弹出 Popup，显示经纬度信息
                    let popup = L.popup({
                        maxWidth: 500, // 最大宽度
                        minWidth: 150, // 最小宽度
                        // maxHeight: 200, // 最大高度
                        autoPan: true, // 自动平移以确保 Popup 完全显示在视口内
                        autoPanPaddingTopLeft: L.point(10, 10), // 设置弹窗上方和左侧的平移边距
                        autoPanPaddingBottomRight: L.point(10, 10), // 设置弹窗下方和右侧的平移边距
                        className: 'custom-popup' // 添加自定义类名
                    })
                        .setLatLng(latLng) // 设置 Popup 的经纬度坐标
                        .openOn(this._map);
                    
                    // 自定义 Popup 的内容
                    popup.setContent(this._customPopupRenderer(info));
                }
            }


        },

        // 鼠标移动事件处理函数
        _onMouseMove: function (e) {
            let zoom = this._map.getZoom();

            if (e.originalEvent.buttons !== 0) {
                return;
            }

            var latLng = this._map.containerPointToLatLng(L.point(e.containerPoint.x, e.containerPoint.y));
            var point = this._map.latLngToContainerPoint(latLng);

            if(zoom < 10){
                let { index, point: closestPoint } = this._findClosestPoint(point, this._grid.getSparseGridArray());
                if (closestPoint && this._distanceBetweenPoints(point, closestPoint) < 10) {
                    this._hoveredPoint = closestPoint;
                    this._hoveredPointIndex = index;
                } else {
                    this._hoveredPoint = null;
                }
            }
            // else{
            //     let { index, point: closestPoint } = this._findClosestPoint(point);
            //     if (closestPoint && this._distanceBetweenPoints(point, closestPoint) < 10) {
            //         this._hoveredPoint = closestPoint;
            //         this._hoveredPointIndex = index;
            //     } else {
            //         this._hoveredPoint = null;
            //     }
            // }
            // 重绘 Canvas
            this._resetCanvas();
        },

        setColors(colors){
            this._colors = colors;
            if(this._legend){
                this._legend.update();
            }
            this._resetCanvas();
        },

        // 在移除图层时调用
        onRemove: function (map) {
            // 移除 Canvas 元素
            L.DomUtil.remove(this._canvas);

            this._legend.remove();
            
            // 移除事件监听
            this._map.off('mousemove', this._onMouseMove, this);
            this._map.off('zoom', this._onZoom, this);
            this._map.off('click', this._onClick, this);
        },

        // 重绘 Canvas，当地图平移或缩放时调用
        _resetCanvas: function () {
            if(this._map){
                var topLeft = this._map.containerPointToLayerPoint([0, 0]);
                L.DomUtil.setPosition(this._canvas, topLeft);
                // 清空当前的 Canvas
                this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

                // 调用自定义的绘制逻辑
                this._drawCanvas();
            }
        },

        // 在 Canvas 上绘制自定义内容
        _drawCanvas: function () {
            let radius = 2;
            let zoom = this._map.getZoom();

            const grid = this._grid.getSparseGridArray();

            if(zoom < 10){
                // console.log(grid);
                grid.forEach((gridInfo) => {
                    let point = this._map.latLngToContainerPoint(L.latLng(gridInfo[0], gridInfo[1]));
                    let color = this._stastics.mapValue2Color(gridInfo[2], true, this._colors);

                    radius = Math.pow(2, zoom) / 64 * Math.log2(gridInfo[2] + 1) * 2;


                    this._ctx.beginPath();
                    this._ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, true);
                    // 绘制为正方形 以 point 为中心
                    // this._ctx.rect(point.x - radius, point.y - radius, radius * 2, radius * 2);
                    // 亮黄色
                    this._ctx.fillStyle = color;
                    this._ctx.fill();
                });

                if (this._hoveredPoint) {
                    let point = grid[this._hoveredPointIndex];
                    let latLng = L.latLng(point[0], point[1]);
                    let color = this._stastics.mapValue2Color(point[2], true, this._colors);
                    radius = Math.pow(2, zoom) / 64 * Math.log2(point[2] + 1) * 2;

                    this._ctx.beginPath();
                    this._ctx.arc(this._hoveredPoint.x, this._hoveredPoint.y, radius + 5, 0, 2 * Math.PI, true);
                    this._ctx.strokeStyle = 'yellow';
                    this._ctx.lineWidth = 5;
                    // 虚线
                    this._ctx.setLineDash([5, 5]);
                    this._ctx.stroke();
                    
                }
                
            }

            // else{
            //     // 并行绘制所有数据点
            //     this._data.forEach((latLng, index) => {
            //         let point = this._map.latLngToContainerPoint(latLng);

            //         let color = "white";

            //         if(this._customGetVal){
            //             let value = this._customGetVal(this._originalData[index]);
            //             color = this._stastics.mapValue2Color(value, true, this._colors);
            //         }

            //         this._ctx.beginPath();
            //         this._ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, true);
            //         // 亮黄色
            //         this._ctx.fillStyle = color;
            //         this._ctx.fill();
            //     });

            //     // 如果有鼠标悬停的点，绘制为蓝色高亮
            //     if (this._hoveredPoint) {
            //         this._ctx.beginPath();
            //         this._ctx.arc(this._hoveredPoint.x, this._hoveredPoint.y, radius + 5, 0, 2 * Math.PI, true);
            //         this._ctx.strokeStyle = 'yellow';
            //         this._ctx.lineWidth = 5;
            //         // 虚线
            //         this._ctx.setLineDash([5, 5]);
            //         this._ctx.stroke();
            //     }
            // }

        },

        // 查找最近的数据点
        _findClosestPoint: function (point, data = this._data) {
            let minDistance = Infinity;
            let closestPoint = null;
            let index = -1;

            for (let i = 0; i < data.length; i++) {

                // let latLng = data[i];
                let latLng = data[i].length > 2 ? [data[i][0], data[i][1]] : data[i];

                let candidate = this._map.latLngToContainerPoint(latLng);
                let distance = this._distanceBetweenPoints(point, candidate);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = candidate;
                    index = i;
                }
            }

            return { index, point: closestPoint };
        },

        // 计算两点之间的距离
        _distanceBetweenPoints: function (point1, point2) {
            var dx = point1.x - point2.x;
            var dy = point1.y - point2.y;
            return Math.sqrt(dx * dx + dy * dy);
        },

        _createLegend: function () {
            let legend = L.control({position: 'bottomright'});

            legend.onAdd = this._legendHelper.bind(this);

            legend.update = function () {
                this._legend._container.innerHTML = this._legendHelper().innerHTML;
            }.bind(this);

            return this._legend = legend;
        },

        _legendHelper: function () {
            const div = L.DomUtil.create('div', 'info legend');
            const labels = [];
            let from, to;

            const grades = this._stastics.getGrades(this._colors.length);
            const colors = [];
            labels.push('point level');

            for (let i = 0; i < grades.length - 1; i++) {
                colors.push(this._stastics.mapValue2Color(grades[i], true, this._colors));
            }

            for (let i = 0; i < grades.length - 1; i++) {
                from = Math.round(grades[i]);
                to = Math.round(grades[i + 1]);
                labels.push(`<i style="background:${colors[i]}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
            }

            div.innerHTML = labels.join('<br>');
            return div;
        }

        
    });

    // set options
    L.canvasLayer = function (customPopupRenderer) {
        let canvasLayer = new L.CanvasLayer();
        canvasLayer._customPopupRenderer = customPopupRenderer;
        return canvasLayer;
    };
}