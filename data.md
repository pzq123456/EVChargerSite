# Data Sets

> - [Subscribe](https://docs.google.com/forms/d/e/1FAIpQLSee3mhBgstlslpNp1UDsA4isU6-iz9m7eFLyJQVAOQuAHwDQg/viewform?usp=dialog) to receive the latest data updates.

## 1. Global Public Electric Vehicle Charging Station (EVCS) Data in 2024

### 1.1 Data Description

- For the US, we collected the location data of 69,677 EVCSs (with a sample rate of around 100%) from the Alternative Fuels Data Center;

- For China, we collected the location data of 159,199 EVCSs (with a sample rate of 69.15%) from the AMAP, one of the largest online mapping service providers in China.

- For Europe, we collected the location data of 226,253 EVCSs (with a sample rate of 69.56%) from the European Alternative Fuels Observatory and Open Charge Map.

### 1.2 Sample Data Download (2024)

> You could request for the full dataset by sending us (global.ev.map@gmail.com) the <a><button onclick="window.open('./ApplicationForm.docx')">Data Request Form</button></a>.

<dataBtns :dataSrc="myData24" />

## 2. Global Public Electric Vehicle Charging Station (EVCS) Data in 2022

### 2.1 Data Description

- For the US, we collected the location data of 46,548 EVCSs (with a sample rate of 87.02%) from the Alternative Fuels Data Center.

- For China, we collected the location data of 73,114 EVCSs (with a sample rate of 65.64%) from the AMAP, one of the largest online mapping service providers in China. 

- For Europe, we collected the location data of 95,133 EVCSs (with a sample rate of 48.78%) from the European Alternative Fuels Observatory.

### 2.2 Sample Data Download (2022)

> You could request for the full dataset by sending us (global.ev.map@gmail.com) the <a><button onclick="window.open('./ApplicationForm.docx')">Data Request Form</button></a>.

<dataBtns :dataSrc="myData" />

<script setup>
    import { ref } from 'vue';
    import { data } from '@/loader/csv.data.js';
    import { data as data24} from '@/loader/csv2.data.js';
    import dataBtns from '@/components/Databtns.vue';

    const myData = ref(data);
    const myData24 = ref(data24);

</script>

<style scoped>

</style>
