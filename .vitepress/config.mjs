import { defineConfig } from 'vitepress';
import { themeConfig } from './themeConfig';
import { viteConfig } from './viteConfig';

import { createRssFile } from "./utils/rss"; // 引入 RSS 文件生成函数

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en',  // 设置默认语言为英文
  title: "Global EV Data Initiative",
  description: "An open electric vehicle data initiative for sharing the latest and historical information on the electric vehicle market, policy and charging infrastructure across the globe.",
  themeConfig: themeConfig,
  base: '/EVChargerSite',
  vite: viteConfig,
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-4706EZS57W' }
    ],
    [
      'script',
      {},
      `  window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4706EZS57W');`
    ],
    [
      'meta',
      { name: 'follow.it-verification-code', content: 'eM1sfu8zWECLCdCR4Evu' }
    ] // 添加 follow.it 验证码
  ],
  markdown: {
    math: true
  },
  
  buildEnd: createRssFile, // 在 build 结束后生成 RSS 文件

  // appearance.initialValue = 'dark',
  // appearance.darkMode = true,
  // appearance : "force-dark",
})