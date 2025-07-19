# Advanced Air Mobility (AAM) Social Media Text Data (2015 – 2024)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.


## 1. Data Description 
We collected social media data related to Advanced Air Mobility (AAM) from Twitter/X and Sina Weibo using Python-based web crawlers. The dataset includes posts from January 1, 2015, to December 31, 2024, covering keywords such as advanced air mobility, urban air mobility, eVTOL, drone taxis, urban aerial mobility, and leading AAM companies i.e., Joby Aviation and Guangzhou EHang. After data cleaning, the final dataset contains 220,552 Twitter/X posts and 69,965 Sina Weibo posts. This social media text dataset contains only the cleaned data alongside results from our AAM text mining research, including sentiment and topic analyses. The dataset includes detailed attributes including User ID, User Type, Nation, Year, Sentiment (categorized as Positive, Neutral, and Negative), Topic, and Theme (categorized as Passenger or Freight AAM), allowing social media or other relevant research and analysis. A sample of the dataset is available for download, allowing users to review the data structure and content.

## 2. Sample Data Download
> To request access to the social media text dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com 

<FileDownloader 
  :fileUrl='SocialMediaURL'
  buttonText="Download Sample Data" 
  fileName="sample Social Media Text Data.xlsx"
/>

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SocialMediaURL from '../../data/AAM/AAM_Social_Media_Text_Sample.xlsx?url';
</script>

<style scoped>

</style>
