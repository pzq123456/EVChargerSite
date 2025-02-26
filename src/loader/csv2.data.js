import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

export default {
  watch: [
    '../../data/points/2024/cn2024.csv', 
    '../../data/points/2024/eu2024.csv', 
    '../../data/points/2024/us2024.csv'],
  load(watchedFiles) {

    // 仅仅保留前20行数据 保留表头
    const cnData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    }).slice(0, 20);

    const euData = parse(fs.readFileSync(watchedFiles[1], 'utf-8'), {
        columns: true,
        skip_empty_lines: true,
        }).slice(0, 20);

    const usData = parse(fs.readFileSync(watchedFiles[2], 'utf-8'), {
        columns: true,
        skip_empty_lines: true,
        }).slice(0, 20);
    
        // 添加表头 行 ID,Latitude,Longitude
        cnData.unshift({ID: 'ID', Latitude: 'Latitude', Longitude: 'Longitude'});
        euData.unshift({ID: 'ID', Latitude: 'Latitude', Longitude: 'Longitude'});
        usData.unshift({ID: 'ID', Latitude: 'Latitude', Longitude: 'Longitude'});


    return {
        cn: cnData,
        eu: euData,
        us: usData,
    };
  },
};