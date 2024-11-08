<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ 'January', 'February', 'March' ],
          datasets: [ {
             data: [40, 20, 12, 34, 56, 23, 45],
             backgroundColor: '#f87979',
            } ],
          
        },
        chartOptions: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Bar Chart',
              color: 'gray'
            },
            legend: {
              display: true,
              color: 'white'
            }
          }
        }
      }
    }
  }
  </script>