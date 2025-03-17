import cn from '../../dataprocess/output/F/cn_2024.json';
import us from '../../dataprocess/output/F/us_2024.json';
import eu from '../../dataprocess/output/F/eu_2024.json';

export default {
    load() {
        return {
            cn: cn,
            us: us,
            eu: eu
        };
    }
}