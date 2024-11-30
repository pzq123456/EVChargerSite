// data\A\cn_province.geojson
import data from '../../data/A/cn_province.json'

// example.data.js
export default {
    load() {
      return data
    }
}



// 以下是动态生成数据的代码
// // data\GeoJSON\us_states.json
// // import eu from '../data/GeoJSON/europe.geojson'
// // import eu_count from '../data/eu_count.csv'
// import fs from 'node:fs';
// import { parse } from 'csv-parse/sync';

// export default {
//   watch: ['../../data/cn_count.csv', '../../data/GeoJSON/cn_province.geojson'],
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
//     let updatedGeoJson = addColumn2GeoJson(geoJson, csvData);
//     updatedGeoJson = renameGeoJsonField(updatedGeoJson, 'pr_name', 'name');

//     // 保存更新后的 GeoJSON 数据
//     saveLocalFile(JSON.stringify(updatedGeoJson), 'cn_province.geojson');

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
//             feature.properties.ISO2 = "CN";
//             return true; // 保留匹配成功的要素
//         }
//         return false; // 移除匹配失败的要素
//     });
//     return updatedGeoJson;
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

// // 简单的前缀匹配或字符匹配算法
// function cn_match(feature, data, minMatchLength = 2) {
//     // console.log(feature, data);
//     const target = feature.pr_name;
//     let matchedIndex = -1;

//     // 遍历数据列表
//     for (let i = 0; i < data.length; i++) {
//         const state = data[i].State;
//         // console.log(data[i]);

//         // 1. 前缀匹配
//         if (state.startsWith(target.slice(0, minMatchLength))) {
//             matchedIndex = i;
//             break; // 找到前缀匹配，直接返回
//         }

//         // 2. 字符匹配
//         let matchCount = 0;
//         for (let j = 0; j < state.length; j++) {
//             if (target.includes(state[j])) {
//                 matchCount++;
//             }
//             if (matchCount >= minMatchLength) {
//                 matchedIndex = i;
//                 break; // 一旦达到最小匹配字符数，退出遍历
//             }
//         }
//         if (matchedIndex !== -1) break; // 如果已经找到匹配的，退出主循环
//     }

//     return data[matchedIndex].count;
// }

