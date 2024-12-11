# Data Sets

## 1. Global Public Electric Vehicle Charging Data in 2022
### 1.1 Data Description
- **For** the US, we collected the location data of 46,548 EVCSs (with a sample rate of 87.02%) from the Alternative Fuels Data Center; 
- **For** China, we collected the location data of 73,114 EVCSs (with a sample rate of 65.64%) from the AMAP, one of the largest online mapping service providers in China. 
- **For** Europe, we collected the location data of 317,528 recharging points (with a sample rate of 49.65%) from the European Alternative Fuels Observatory. These recharging points can be further grouped into 95,133 EVCSs according to the field of “evse_uid” in the dataset. 
 

### 1.2 Sample Data Download

You could request for the full dataset by sending us (global.ev.map@gmail.com) the <a><button onclick="window.open('./ApplicationForm.docx')">Data Request Form</button></a>.

<div class="row">
    <div class="col-md-4">
        <button @click="downloadeu" class="btn btn-primary">Download EU Data</button>
    </div>
    <div class="col-md-4">
        <button @click="downloadus" class="btn btn-primary">Download US Data</button>
    </div>
    <div class="col-md-4">
        <button @click="downloadcn" class="btn btn-primary">Download CN Data</button>
    </div>
</div>



<script setup>
    import { data as eu } from '@/loader/eu.data.js';
    import { data as us } from '@/loader/us.data.js';
    import { data as cn } from '@/loader/cn.data.js';



    const downloadeu = () => {
        const data = JSON.stringify(eu);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'eu.data.json';
        a.click();
    }

    const downloadus = () => {
        const data = JSON.stringify(us);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'us.data.json';
        a.click();
    }

    const downloadcn = () => {
        const data = JSON.stringify(cn);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cn.data.json';
        a.click();
    }

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
