# Global Public Electric Vehicle Charging Data in 2022

- **For** the US, we collected the location data of 46,548 EVCSs (with a sample rate of 87.02%) from the Alternative Fuels Data Center; 
- **For** China, we collected the location data of 73,114 EVCSs (with a sample rate of 65.64%) from the AMAP, one of the largest online mapping service providers in China. 
- **For** Europe, we collected the location data of 317,528 recharging points (with a sample rate of 49.65%) from the European Alternative Fuels Observatory. 

These recharging points can be further grouped into 95,133 EVCSs according to the field of “evse_uid” in the dataset.
You can download the sample data here; You could request for the full dataset by sending us (global.ev.map@gmail.com) the application form. 



<dataTable />

<script setup>
    import dataTable from '@/layouts/dataTable.vue'
    import LeafletMap from '@/components/LeafletMap.vue';
</script>

<leafletMap />
