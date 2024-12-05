// data\GeoJSON\us_states.json
// import flag from '../../data/timezone/flag.csv'
import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

// example.data.js
export default {
    watch: ['../../data/timezone/flag.csv'],
    load(watchedFiles) {
        // const csvData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
        //     columns: true,
        //     skip_empty_lines: true,
        // });

        // 修改为 以 name 为 key 的对象

        const csvData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
            columns: true,
            skip_empty_lines: true,
        }).reduce((acc, cur) => {
            acc[cur.name] = cur;
            return acc;
        }
        , {});
        

        return csvData;
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