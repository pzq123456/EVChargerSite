import cn from '../../dataprocess/output/E/cn.json';
import us from '../../dataprocess/output/E/us.json';
import eu from '../../dataprocess/output/E/eu.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn : renameNormalizedFields(cn),
            us : renameNormalizedFields(us),
            eu : renameNormalizedFields(eu)
        };
    }
}

// 调用字段重命名函数 新的名称为 规范化后的名称
function renameNormalizedFields(geoJson) {
    let updatedGeoJson = JSON.parse(JSON.stringify(geoJson));
    updatedGeoJson.features.forEach(feature => {
        Object.keys(feature.properties).forEach(fieldName => {
            // 若字段名中包含 buffer 则进行规范化
            if (fieldName.includes('buffer')) {
                const normalizedFieldName = normalizeFieldName(fieldName);
                feature.properties[normalizedFieldName] = feature.properties[fieldName]; // 复制旧字段值到新字段
                delete feature.properties[fieldName]; // 删除旧字段
            }
        });
    });
    return updatedGeoJson;
}

// Column	Value
// 1	300buffer-city	N.A.
// 2	500buffer-city	N.A.
// 3	800buffer-city	N.A.
// 4	1500buffer-city	N.A.
// 5	2000buffer-city	N.A.

// 字段规范化 移除字段前缀 mean_ 及后缀 -city 在数字后添加单位 m及空格
function normalizeFieldName(fieldName) {
       return fieldName.replace('-city', '').replace('buffer', 'm buffer');
}