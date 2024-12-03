// data\A\us_states.geojson
// dataprocess/output/D
import cn from '../../dataprocess/output/F/cn.json';
import us from '../../dataprocess/output/F/us.json';
import eu from '../../dataprocess/output/F/eu.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn,
            us,
            eu
        };
    }
}
