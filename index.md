---

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Global EV Data Initiative"
  tagline: "An open electric vehicle data initiative that aims to collect, analyse, visualize and share data on the electric vehicle market, policy and charging infrastructure across the globe."
  image:
    src: "/logo.png"
    alt: "Global EV Data"



features:
  - title: "Map"
    details: "We visualize various spatial EV data and the analysis results through interactive maps."
    link: /map
    icon: 🌍

  - title: "Data"
    details: "We collect global EV policy, market, and charging facility data from various data sources and share the EV datasets upon request."
    link: /data
    icon: 🔄

  - title: "Publications"
    details: "We update regularly the latest research outputs using the global EV data as the main data sources."
    link: /publications
    icon: 📚


---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #1b8c59 30%, #19df9d); /* 更新为新主题色 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg,rgba(27, 140, 89, 0.41) 50%,rgba(25, 223, 157, 0.54) 50%); /* 更新为新主题色 */
  --vp-home-hero-image-filter: blur(44px);
  
  --vp-c-brand-1: #1b8c59; /* 新主题色 */
  --vp-c-brand-2: #19df9d; /* 新主题色 */
  --vp-c-brand-3: #30923f; /* 新主题色 */
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>