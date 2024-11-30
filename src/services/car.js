// 法律条文或政策检索服务
import { data } from '@/loader/car.data.js';

// // 匹配 选择区域国家名 与 数据中的国家名 匹配结果返回 data 中的数据 若无匹配则返回 null
// export function getRegionData(regionName) {
//     // data 是一个 json 文件 国家名作为键值
//     return data[regionName] || null;
// }

export function getCarData(regionName) {
    // 同时将 data.labels 附上
    let res =  {
        data: data[regionName] || null,
        labels: data.labels
    }

    // 若 data 为null 则返回 null
    if (!res.data) {
        return null;
    }else{
        return res;
    }
}
