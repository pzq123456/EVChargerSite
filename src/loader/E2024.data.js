import cn from '../../dataprocess/output/E/cn_2024.json';
import us from '../../dataprocess/output/E/us_2024.json';
import eu from '../../dataprocess/output/E/eu_2024.json';

// example.data.js
export default {
    load() {
        // 将两个json文件合并
        return {
            cn : cn,
            us : us,
            eu : eu
        };
    }
}