import { Stastics } from "./stastics.js";

export function initGeoJsonLayer() { // 这一步只是 向L注册了一个新的类，但是并没有实例化

    L.GeoJsonLayer = L.Layer.extend({

        initialize: function (lagendName = "Legend", clickCallback = null) {

            this._stastics = new Stastics(); // 单值统计
            this._colors = DefaultColors;
            this._data = DefaultGeoJson;
            this._getVal = (d) => parseInt(d.properties.count);
            this._legendName = lagendName;

            if (clickCallback) {
                console.log('clickCallback')
                this._clickCallback = clickCallback;
            }
        },

        setColumn: function (column, colors = DefaultColors) {
            // 在数据传入后 设置统计及显示的列

            this._getVal = (d) => parseFloat(d.properties[column]);
            this._stastics.clear();
            this._stastics.append(this._data.features, this._getVal);

            this._legendName = column;

            this._colors = colors;

            if (this._legend){
                this._legend.update();
            }

            if (this._geoJson) {
                this._geoJson.clearLayers();
                this._geoJson.addData(this._data);
                this._legend.update();
            }
        },
        
        getColumns: function (
            filter = (d) => !isNaN(parseInt(this._data.features[0].properties[d])) && d !== 'area' && !d.includes('zscore') // 去除 area 和含有 zscore 的列
        ) {
            return Object.keys(this._data.features[0].properties).filter(filter);
        }, 
        
        setColors: function (colors) {
            this._colors = colors;
            if (this._legend){
                this._legend.update();
            }
        },

        _getColor: function (d) {
            return this._stastics.mapValue2Color(d, false, this._colors);
        },

        _style: function (feature) {
            // 若值严格为0 则表示无数据 使用灰色填充 表示没有数据
            if (this._getVal(feature) === 0) {
                return {
                    weight: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: 'gray'
                };
            }else{
                return {
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7,
                    fillColor: this._getColor(this._getVal(feature))
                };
            }

        },

        clear: function () {
            // this = null;

            this._data.features = [];
            this._stastics.clear();
            if (this._geoJson) {
                this._geoJson.clearLayers();
            }
            if (this._legend) {
                this._legend._container.innerHTML = '';
            }

        },

        update() {
            if(this._stastics){
                this._stastics.update();
            }

            if(this._legend){
                this._legend.update();
            }

            if(this._geoJson){
                this._geoJson.eachLayer((layer) => {
                    layer.setStyle(this._style(layer.feature));
                });
            }

            // this._stastics.print();
        },

        updateData: function (data, getVal = (d) => parseInt(d.properties.count)) {
            this._data = data;
            this._stastics.clear();
            this._stastics.append(data.features, getVal);
            this._getVal = getVal;
            if (this._geoJson) {
                this._geoJson.clearLayers();
                this._geoJson.addData(data);
                this._legend.update();
            }

        },

        appendData: function (data, getVal = (d) => parseInt(d.properties.count)) {
            this._data.features = this._data.features.concat(data.features);
            this._stastics.append(data.features, getVal);
            this._getVal = getVal;

            if (this._geoJson) {
                this._geoJson.addData(data);
                this._legend.update();
            }
        },

        onAdd: function (map) {
            this._map = map;
            this._createLegend();

            this._geoJson = L.geoJson(this._data, {
                style: this._style.bind(this),
                onEachFeature: this._onEachFeature.bind(this)
            });

            // set onEachFeature
            this._geoJson.addTo(this._map);
            this._legend.addTo(this._map);

            // console.log(this._geoJson)
        },

        onRemove: function (map) {
            map.removeLayer(this._geoJson);
            map.removeControl(this._legend);
            this.clear();
        },

        _onEachFeature: function (feature, layer) {
            layer.on({
                mouseover: this._highlightFeature.bind(this),
                mouseout: this._resetHighlight.bind(this),
                click: this._zoomToFeature.bind(this)
            });
        },

        _highlightFeature: function (e) {
            const layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            layer.bringToFront();
        },

        _resetHighlight: function (e) {
            this._geoJson.resetStyle(e.target);
        },

        _zoomToFeature: function (e) {
            this._map.fitBounds(e.target.getBounds());
            if (this._clickCallback) {
                this._clickCallback(e.target.feature.properties);
            }
        },

        _createLegend: function () {
            let legend = L.control({position: 'bottomleft'});

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

            // const grades = this._stastics.getGradesFixed(this._colors.length); // 等间距
            const grades = this._stastics.getGrades(this._colors.length, 1);

            const colors = [];

            const divTitle = L.DomUtil.create('div', 'legend-title', div);
            divTitle.innerHTML = addLineBreaks(this._legendName);

            labels.push(divTitle.outerHTML);

            for (let i = 0; i < grades.length - 1; i++) {
                colors.push(this._stastics.mapValue2Color(grades[i], false, this._colors));
            }

            for (let i = 0; i < grades.length - 1; i++) {
                from = bigNumberFormat(grades[i]);
                to = bigNumberFormat(grades[i + 1]);
                labels.push(`<i style="background:${colors[i]}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
            }

            // 灰色表示没有数据
            labels.push(`<i style="background:gray"></i> N.A.`);
            div.innerHTML = labels.join('<br>');
            return div;
        },

    });

    L.geoJsonLayer = function (data, grades, colors, infoUpdate) {
        return new L.GeoJsonLayer(data, grades, colors, infoUpdate);
    }
}

const DefaultGeoJson = {
    "type": "FeatureCollection",
    "features": []
}

const DefaultColors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b', '#003d19', '#003617', '#003015', '#002b13', '#002611', '#00200f', '#001b0d', '#00160b']

// 帮助函数 当数字过大时，将数字转化为科学计数法
// 例如 1000000 -> 1e6
function bigNumberFormat(num) {
    if (num < 1e3) {
        return num;
    } else if (num < 1e6) {
        return (num / 1e3).toFixed(1) + 'K';
    } else if (num < 1e9) {
        return (num / 1e6).toFixed(1) + 'M';
    } else {
        return (num / 1e9).toFixed(1) + 'B';
    }
}

// 帮助函数 分词添加换行符 例如 'Population Density' -> 'Population<br />Density'
function addLineBreaks(str) {

    // return str.split(' ').join('<br />');

    // 同时支持将 '-' 及 '_' 替换为 '<br />'

    return str.split(/[-_ ]/).join('<br />');
}

// onRemove: function (map) {
//     if (this.options.pane) {
//         this.getPane().removeChild(this._canvas);
//     }else{
//         map.getPanes().overlayPane.removeChild(this._canvas);
//     }

//     map.off('moveend', this._reset, this);

//     if (map.options.zoomAnimation) {
//         map.off('zoomanim', this._animateZoom, this);
//     }
// },