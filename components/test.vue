<template>
  <div>
    <LeafletMap :center="[51.505, -0.09]" :zoom="13" />
  </div>
</template>

<script>
import LeafletMap from './LeafletMap.vue';

export default {
  components: {
    LeafletMap
  }
};
</script>
