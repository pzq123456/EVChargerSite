import { defineConfig } from 'vitepress'
import { themeConfig } from './themeConfig'
import { viteConfig } from './viteConfig'

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
  ],
  markdown: {
    math: true
  }
  // appearance.initialValue = 'dark',
  // appearance.darkMode = true,
  // appearance : "force-dark",
})
