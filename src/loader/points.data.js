import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

export default {
  watch: ['../../data/points/cn.csv', '../../data/points/eu.csv', '../../data/points/us.csv'],
  load(watchedFiles) {

    // 仅仅保留前20行数据 保留表头
    const cnData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    })

    const euData = parse(fs.readFileSync(watchedFiles[1], 'utf-8'), {
        columns: true,
        skip_empty_lines: true,
        })

    const usData = parse(fs.readFileSync(watchedFiles[2], 'utf-8'), {
        columns: true,
        skip_empty_lines: true,
        })


    return {
        cn: cnData,
        eu: euData,
        us: usData,
    };
  },
};