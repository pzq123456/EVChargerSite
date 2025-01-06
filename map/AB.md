---
layout: page
---
<DropDown :options="menu" defaultKey="AB"/>

<!-- <abmap /> -->
<deckMap />

<script setup>
    // import abmap from '@/layouts/map.vue'
    import deckMap from '@/components/DeckMap.vue'
    import { menu } from './menu.js';
    import DropDown from '@/components/Dropdown.vue';
</script>
