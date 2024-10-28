---

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Global EV Data"
  text: "A map and a database"
  tagline: "An open electric vehicle data initiative for sharing the latest and historical information on the electric vehicle market, policy and charging infrastructure across the globe."
  image:
    src: "/logo.png"
    alt: "Global EV Data"

  actions:
    - theme: brand
      text: Get Started
      link: /about
    - theme: alt
      text: Learn More
      link: /about

features:
  - title: "Global Coverage"
    details: Three main regions are covered (the US, Europe, and China_.
    link: /about
    icon: 🌍
  - title: "Timely Updates"
    details: "The database is updated every month."
    link: /about
    icon: 🔄
  - title: "Web based visualization & analysis"
    details: "The map is interactive and can be used for analysis."
    link: /about
    icon: 📊

---

<script setup>
  import test from './components/test.vue'
</script>

<test />