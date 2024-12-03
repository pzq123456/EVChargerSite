// data\A\us_states.geojson
// dataprocess/output/D
import cn from '../../dataprocess/output/C/cn.json';
import us from '../../dataprocess/output/C/us.json';
import eu from '../../dataprocess/output/C/eu.json';

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
