import { defineConfig } from 'vitepress'
import { themeConfig } from './themeConfig'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "EVChargerSite",
  description: "EVCharger Site",
  themeConfig: themeConfig,
  base: '/EVChargerSite/',
})
