// data\A\europe.geojson
import data from '../../data/A/europe.json';

// example.data.js
export default {
    load() {
      return data
    }
}


// import fs from 'node:fs';
// import { parse } from 'csv-parse/sync';

// export default {
//   watch: ['../../data/eu_count.csv', '../../data/GeoJSON/europe.geojson'],
//   load(watchedFiles) {
//     // 读取和解析 GeoJSON 数据
//     const geoJson = JSON.parse(fs.readFileSync(watchedFiles.find(file => file.endsWith('.geojson')), 'utf-8'));

//     // 读取和解析 CSV 数据
//     const csvFile = watchedFiles.find(file => file.endsWith('.csv'));
//     const csvData = parse(fs.readFileSync(csvFile, 'utf-8'), {
//       columns: true,
//       skip_empty_lines: true,
//     });

//     // 调用 addColumn2GeoJson 函数
//     // let updatedGeoJson = addColumn2GeoJson(geoJsonData, csvData, eu_match, 'count');
//     // updatedGeoJson = renameGeoJsonField(updatedGeoJson, 'NAME', 'name');
//     let updatedGeoJson = addColumn2GeoJson(geoJson, csvData, eu_match, 'count');
//     updatedGeoJson = renameGeoJsonField(updatedGeoJson, 'NAME', 'name');

//     // 保存更新后的 GeoJSON 数据
//     saveLocalFile(JSON.stringify(updatedGeoJson), 'europe.geojson');
    
//     return updatedGeoJson;
//   },
// };

// // 存一份 tmp 里
// function saveLocalFile(data, filename) {
//     fs.writeFileSync(`tmp/${filename}`, data);
// }
// function addColumn2GeoJson(geoJson, data, match_fn = cn_match, columnName = "count") {
//     let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
//     updatedGeoJson.features = updatedGeoJson.features.filter((feature, index) => {
//         const matchedValue = match_fn(feature.properties, data);
//         if (matchedValue !== undefined && matchedValue !== null) {
//             feature.properties[columnName] = matchedValue;
//             return true; // 保留匹配成功的要素
//         }
//         return false; // 移除匹配失败的要素
//     });
//     return updatedGeoJson;
// }


// function eu_match(feature, data) {
//     const matchedRow = data.find(row => row.COUNTRY === feature.NAME);
//     return matchedRow ? matchedRow.count : null;
// }

// function renameGeoJsonField(geoJson, oldFieldName, newFieldName) {
//     let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
//     updatedGeoJson.features.forEach(feature => {
//         if (feature.properties.hasOwnProperty(oldFieldName)) {
//             feature.properties[newFieldName] = feature.properties[oldFieldName]; // 复制旧字段值到新字段
//             delete feature.properties[oldFieldName]; // 删除旧字段
//         }
//     });
//     return updatedGeoJson;
// }
    