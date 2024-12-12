// data\A\us_states.geojson
// dataprocess/output/D
import cn from '../../dataprocess/output/D/cn.json';
import us from '../../dataprocess/output/D/us.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn : renameNormalizedFields(cn),
            us : renameNormalizedFields(us)
        };
    }
}

// mean_300buffer-city
// mean_500buffer-city
// mean_800buffer-city
// mean_1500buffer-city	
// mean_2000buffer-city

// 调用字段重命名函数 新的名称为 规范化后的名称
function renameNormalizedFields(geoJson) {
    let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
    updatedGeoJson.features.forEach(feature => {
        Object.keys(feature.properties).forEach(fieldName => {
            if (fieldName.startsWith('mean_')) {
                const normalizedFieldName = normalizeFieldName(fieldName);
                feature.properties[normalizedFieldName] = feature.properties[fieldName]; // 复制旧字段值到新字段
                delete feature.properties[fieldName]; // 删除旧字段
            }
        });
    });
    return updatedGeoJson;
}

// 字段规范化 移除字段前缀 mean_ 及后缀 -city 在数字后添加单位 m及空格
function normalizeFieldName(fieldName) {
    // return fieldName.replace('mean_', '').replace('-city', ' m ');
    //  mean_300buffer-city -> 300m buffer
    return fieldName.replace('mean_', '').replace('-city', '').replace('buffer', 'm buffer');
}