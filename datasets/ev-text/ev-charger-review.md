---
prev: false
next: false
---
# Global EV Public Charging Station Review Data (2015-2024)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.


## 1. Data Description 
We collected reviews from users of charging stations on the PlugShare and Baidu Maps platforms. The dataset spans from January 1, 2015, to December 31, 2024. From Baidu Maps and PlugShare platforms, we obtained geo-location and review information for 287,193 charging stations in mainland China, 61,631 in the USA, and 185,480 in Europe (defined here as the 27 EU member states, plus the United Kingdom, Norway, Liechtenstein, Iceland, and Switzerland). The data was cleaned and then processed through sentiment and topic analyses (For details, please refer to our research work). It contains detailed attributes, including charging station ID, review timestamp, topic classification, and corresponding sentiment (positive, neural, and negative). A sample of the dataset is available for download to allow users to review the data structure and content.

## 2. Sample Data Download
> To request access to the social media text dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com 

<FileDownloader 
  :fileUrl='SampleDataURL'
  buttonText="Download Sample Data" 
  fileName="Sample_data_china.csv"
/>

[**Back to the dataset list**](/datasets/index.md)

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SampleDataURL from '../../data/AAM/Sample_data_china.csv?url';
    // data/AAM/Sample_data_china.csv
</script>

<style scoped>

</style>
