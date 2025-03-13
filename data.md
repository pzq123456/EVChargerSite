# Data Sets

> - [Subscribe](https://docs.google.com/forms/d/e/1FAIpQLSee3mhBgstlslpNp1UDsA4isU6-iz9m7eFLyJQVAOQuAHwDQg/viewform?usp=dialog) to our news letter for the latest data updates.

## 1. Global Public Electric Vehicle Charging Station (EVCS) Data in 2022

### 1.1 Data Description

<details>
  <summary>Details... </summary>


- **For** the US, we collected the location data of 46,548 EVCSs (with a sample rate of 87.02%) from the Alternative Fuels Data Center; 
- **For** China, we collected the location data of 73,114 EVCSs (with a sample rate of 65.64%) from the AMAP, one of the largest online mapping service providers in China. 
- **For** Europe, we collected the location data of 317,528 recharging points (with a sample rate of 48.78%) from the European Alternative Fuels Observatory. These recharging points can be further grouped into 95,133 EVCSs according to the fields of “location_unique_id” and “location_country” in the dataset. 

 </details>


 

### 1.2 Sample Data Download(2022)

You could request for the full dataset by sending us (global.ev.map@gmail.com) the <a><button onclick="window.open('./ApplicationForm.docx')">Data Request Form</button></a>.

<dataBtns :dataSrc="myData" />

## 2. Global Public Electric Vehicle Charging Station (EVCS) Data in 2024

### 1.2 Sample Data Download(2024)

You could request for the full dataset by sending us (global.ev.map@gmail.com) the <a><button onclick="window.open('./ApplicationForm.docx')">Data Request Form</button></a>.

<dataBtns :dataSrc="myData24" />

<script setup>
    import { ref } from 'vue';
    import { data } from '@/loader/csv.data.js';
    import { data as data24} from '@/loader/csv2.data.js';
    import dataBtns from '@/components/Databtns.vue';

    const myData = ref(data);
    const myData24 = ref(data24);

</script>

<style scoped>
    .row {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .col-md-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        padding: 0 15px;
        color: var(--vp-c-brand-1);
    }

    .btn-primary {
        border: 1px solid var(--vp-c-brand-3);
        border-radius: 4px;
    }

    .btn-primary:hover {
        background-color: var(--vp-c-brand-3);
        color: white;
    }

    .btn {
        width: 100%;
    }
</style>
