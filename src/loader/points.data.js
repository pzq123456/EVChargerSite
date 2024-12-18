import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

function sampleData(data, percentage = 40) {
  const sampleSize = Math.floor((percentage / 100) * data.length);
  const sampled = data.sort(() => Math.random() - 0.5).slice(0, sampleSize);  // 随机排序并取前 sampleSize 行
  return sampled;
}

export default {
  watch: ['../../data/points/cn.csv', '../../data/points/eu.csv', '../../data/points/us.csv'],
  load(watchedFiles) {
    const cnData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });
    const euData = parse(fs.readFileSync(watchedFiles[1], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });
    const usData = parse(fs.readFileSync(watchedFiles[2], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });

    return {
      cn: sampleData(cnData),
      eu: sampleData(euData),
      us: sampleData(usData),
    };
  },
};