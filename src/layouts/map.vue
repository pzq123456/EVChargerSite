<template>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
        <counter />
    </Drawer>
    <button @click="toggleDrawer" :class="{ open: isDrawerOpen, close: !isDrawerOpen }" id="toggle">
        {{ isDrawerOpen ? "Close" : "Open" }}
    </button>

    <LeafletMap />

</template>
  
<script setup>
    import { ref } from "vue";
    import Drawer from "@/components/Drawer.vue";
    import LeafletMap from '@/components/LeafletMap.vue';
    import counter from '@/components/Counter.vue';
    import { useMapStore } from '@/stores/mapStore';
    import { computed, watch } from 'vue';

    const mapStore = useMapStore();


    const selectedRegion = computed(() => mapStore.selectedRegion);

    let isDrawerOpen = ref(false);

    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };

    // 只要 selectedRegion 不为空就打开抽屉
    watch(selectedRegion, (newVal) => {
        if (newVal) {
            isDrawerOpen.value = true;
        }
    });

</script>

<style scoped>

#toggle.open {
    background-color: #f44336;
}

/* button 区分 open 和 close */

#toggle.close {
    background-color: #4CAF50;
}

</style>