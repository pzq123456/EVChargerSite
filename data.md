# Data Sets

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

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


## 3. Advanced Air Mobility (AAM) Social Media Text Data (2015 – 2024)
### 3.1 Data Description 
We collected social media data related to Advanced Air Mobility (AAM) from Twitter/X and Sina Weibo using Python-based web crawlers. The dataset includes posts from January 1, 2015, to December 31, 2024, covering keywords such as advanced air mobility, urban air mobility, eVTOL, drone taxis, urban aerial mobility, and leading AAM companies i.e., Joby Aviation and Guangzhou EHang. After data cleaning, the final dataset contains 220,552 Twitter/X posts and 69,965 Sina Weibo posts.

### 3.2 Sample Data Download
To request the full social media text dataset, please send the completed Data Request Form to global.ev.map@gmail.com 

## 4. Advanced Air Mobility (AAM) Bibliometric Text Data (2015 – 2024)
### 4.1 Data Description
We collected bibliometric text data from two leading academic databases, including Scopus and Web of Science, covering peer-reviewed journal articles as well as conference proceedings related to AAM. The dataset spans from January 1, 2015, to December 31, 2024, and was compiled using a comprehensive search query including terms such as advanced air mobility, urban air mobility, eVTOL, drone taxi, and related keywords. After removing duplicates, incomplete records, and irrelevant entries, the final dataset consists of 2,548 relevant journal articles. Abstracts were selected for analysis as they effectively summarize the key objectives, methods, and findings of the scholarly works, enabling insights into thematic trends and research priorities in the AAM field.

### 4.2 Sample Data Download
To request the full bibliometric text dataset, please send the completed Data Request Form to: global.ev.map@gmail.com 



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
