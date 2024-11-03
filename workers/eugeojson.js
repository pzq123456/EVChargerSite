self.onmessage = function (e) {
    const { geoJsonData, csvData } = e.data;

    // 调用 addColumn2GeoJson 函数
    let updatedGeoJson = addColumn2GeoJson(geoJsonData, csvData, eu_match, 'count');
    updatedGeoJson = renameGeoJsonField(updatedGeoJson, 'NAME', 'name');

    // 计算完成后，将结果发回主线程
    self.postMessage(updatedGeoJson);
};

function addColumn2GeoJson(geoJson, data, match_fn = cn_match, columnName = "count") {
    let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
    updatedGeoJson.features = updatedGeoJson.features.filter((feature, index) => {
        const matchedValue = match_fn(feature.properties, data);
        if (matchedValue !== undefined && matchedValue !== null) {
            feature.properties[columnName] = matchedValue;
            return true; // 保留匹配成功的要素
        }
        return false; // 移除匹配失败的要素
    });
    return updatedGeoJson;
}


function eu_match(feature, data) {
    const matchedRow = data.find(row => row.COUNTRY === feature.NAME);
    return matchedRow ? matchedRow.count : null;
}

function renameGeoJsonField(geoJson, oldFieldName, newFieldName) {
    let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
    updatedGeoJson.features.forEach(feature => {
        if (feature.properties.hasOwnProperty(oldFieldName)) {
            feature.properties[newFieldName] = feature.properties[oldFieldName]; // 复制旧字段值到新字段
            delete feature.properties[oldFieldName]; // 删除旧字段
        }
    });
    return updatedGeoJson;
}
