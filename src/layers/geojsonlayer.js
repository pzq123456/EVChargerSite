import { Stastics } from "./stastics.js";

export function initGeoJsonLayer() { // 这一步只是 向L注册了一个新的类，但是并没有实例化

    L.GeoJsonLayer = L.Layer.extend({
        initialize: function (infoUpdate) {
            this._stastics = new Stastics(); // 单值统计
            // this._grades = grades;
            this._colors = DefaultColors;
            this._infoUpdate = infoUpdate;
            this._data = DefaultGeoJson;
            this._getVal = (d) => parseInt(d.properties.count);
        },

        setColors: function (colors) {
            this._colors = colors;
            this._legend.update();
        },

        _getColor: function (d) {
            return this._stastics.mapValue2Color(d, false, this._colors);
        },

        _style: function (feature) {
            return {
                weight: 1,
                opacity: 1,
                color: 'white',
                // dashArray: '3',
                fillOpacity: 0.7,
                fillColor: this._getColor(this._getVal(feature))
            };
        },

        updateData: function (data, getVal = (d) => parseInt(d.properties.count)) {
            this._data = data;
            this._stastics.clear();
            this._stastics.append(data.features, getVal);
            this._getVal = getVal;

            this._geoJson.clearLayers();
            this._geoJson.addData(data);
            this._legend.update();
        },

        appendData: function (data, getVal = (d) => parseInt(d.properties.count)) {
            this._data.features = this._data.features.concat(data.features);
            this._stastics.append(data.features, getVal);
            this._getVal = getVal;
            this._geoJson.addData(data);
            this._legend.update();
        },

        onAdd: function (map) {
            this._map = map;

            this._createInfo(this._infoUpdate);
            this._createLegend();
            this._info.addTo(this._map);

            this._geoJson = L.geoJson(this._data, {
                style: this._style.bind(this),
                onEachFeature: this._onEachFeature.bind(this)
            });

            // set onEachFeature
            this._geoJson.addTo(this._map);
            this._legend.addTo(this._map);
        },

        onRemove: function () {
            console.log('remove')
            this._map.removeLayer(this._geoJson);
            this._map.removeControl(this._info);
            this._map.removeControl(this._legend);
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
            // console.log(this._info)
            this._info.update(layer.feature.properties);
        },

        _resetHighlight: function (e) {
            this._geoJson.resetStyle(e.target);
            this._info.update();
        },

        _zoomToFeature: function (e) {
            this._map.fitBounds(e.target.getBounds());
        },

        _createInfo: function (infoUpdate = this._infoUpdate) {
            const info = L.control();
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            }
            info.update = function (props) {
                this._infoUpdate(props);
            }
            info.update = infoUpdate.bind(info);
            this._info = info;
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
            // console.log(grades);
            const colors = [];

            labels.push('area level');

            for (let i = 0; i < grades.length - 1; i++) {
                colors.push(this._stastics.mapValue2Color(grades[i], false, this._colors));
            }

            for (let i = 0; i < grades.length - 1; i++) {
                from = grades[i];
                to = grades[i + 1];
                labels.push(`<i style="background:${colors[i]}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
            }

            div.innerHTML = labels.join('<br>');
            return div;
        },

        updateInfoUpdate: function (infoUpdate) {
            this._infoUpdate = infoUpdate;
            this._info.update = infoUpdate.bind(this._info);
        }

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