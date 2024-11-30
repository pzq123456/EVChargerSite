<template>
    <Line :data="data" :options="options" id="my-chart-id" />
</template>
  
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Line } from 'vue-chartjs'


ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)

export default {
    name: 'LineChart',
    components: {
        Line
    },
    data() {
        return {
            data : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            },
            options: {
                responsive: true,
            }
        } 
    }
}

</script>
  