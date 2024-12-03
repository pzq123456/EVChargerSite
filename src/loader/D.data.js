// data\A\us_states.geojson
// dataprocess/output/D
import cn from '../../dataprocess/output/D/cn.json';
import us from '../../dataprocess/output/D/us.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn,
            us
        };
    }
}
