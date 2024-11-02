<template>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
        <slot>  </slot>
    </Drawer>
    <button @click="toggleDrawer">Toggle Drawer</button>

    <LeafletMap />

</template>
  
<script>
    import Drawer from "./components/Drawer.vue";
    import LeafletMap from './components/LeafletMap.vue';

    export default {
    name: "App",
    components: {
        Drawer,
        LeafletMap,
    },

    data() {
        return {
            isDrawerOpen: false,
        };
    },

    methods: {
            toggleDrawer() {
                this.isDrawerOpen = !this.isDrawerOpen;
            },

            closeDrawer() {
                this.isDrawerOpen = false;
            },
        },
    };
</script>