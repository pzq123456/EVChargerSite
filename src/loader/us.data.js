// data\A\us_states.geojson
import data from '../../data/A/us_states.json';

// example.data.js
export default {
    load() {
      return data
    }
}




// // data\GeoJSON\us_states.json
// import us from '../../data/GeoJSON/us_states.json'
// import fs from 'node:fs';

// // example.data.js
// export default {
//     load() {
//       // return us

//       // 读取和解析 GeoJSON 数据
//       const geoJson = us;

//       // 为每一个要素添加属性 ISO2 = "US"
//       let properties = geoJson.features.map(feature => {
//         feature.properties.ISO2 = "US";
//         return feature.properties;
//       });

//       // save

//       saveLocalFile(geoJson, 'us_states.geojson');

//       // 返回更新后的 GeoJSON 数据
//       return geoJson;
//     }
// }

// // 存一份 tmp 里
// function saveLocalFile(data, filename) {
//   fs.writeFileSync(`tmp/${filename}`, JSON.stringify(data));
// }
