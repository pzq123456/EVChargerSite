<template>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
        <counter />
    </Drawer>
    <button @click="toggleDrawer">Toggle Drawer</button>

    <LeafletMap />

</template>
  
<script setup>
    import { ref } from "vue";
    import Drawer from "@/components/Drawer.vue";
    import LeafletMap from '@/components/LeafletMap.vue';
    import counter from '@/components/counter.vue';

    let isDrawerOpen = ref(false);

    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };
</script>