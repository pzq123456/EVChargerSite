// data\A\us_states.geojson
// dataprocess/output/D
import cn from '../../dataprocess/output/D/cn_2024.json';
import us from '../../dataprocess/output/D/us_2024.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn : cn,
            us : us
        };
    }
}