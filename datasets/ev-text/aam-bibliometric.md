---
prev: false
next: false
---
# Advanced Air Mobility (AAM) Bibliometric Text Data (2015 – 2024)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

## 1. Data Description
We collected bibliometric text data from two leading academic databases, including Scopus and Web of Science, covering peer-reviewed journal articles as well as conference proceedings related to AAM. The dataset spans from January 1, 2015, to December 31, 2024, and was compiled using a comprehensive search query including terms such as advanced air mobility, urban air mobility, eVTOL, drone taxi, and related keywords. After removing duplicates, incomplete records, and irrelevant entries, the final dataset consists of 2,548 relevant journal articles. Abstracts were selected for analysis as they effectively summarize the key objectives, methods, and findings of the scholarly works, enabling insights into thematic trends and research priorities in the AAM field. This bibliometric text dataset contains only the cleaned data alongside results from our AAM text mining research, including sentiment and topic analyses. The dataset features detailed attributes such as Keyword, User Type, Nation, Year, Sentiment (categorized as Positive, Neutral, or Negative), Topic, and Theme (classified as Passenger or Freight AAM), facilitating bibliometric and related research analyses. A sample of the dataset is available for download, allowing users to review the data structure and content.

## 2. Sample Data Download
> To request access to the social media text dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com 

<FileDownloader 
  :fileUrl='BibliometricURL'
  buttonText="Download Sample Data" 
  fileName="sample Bibliometric Text Data.xlsx"
/>



<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import BibliometricURL from '../../data/AAM/AAM_Bibliometric_Text_Sample.xlsx?url';
</script>

<style scoped>

</style>
