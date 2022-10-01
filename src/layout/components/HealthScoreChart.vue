<template>
    <Bar :chart-data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'HealthScoreChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Team', 'Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'],
        datasets: [
          {
            label: 'Health Score',
            backgroundColor: '#82D1F6',
            data: [90, 100, 75, 80, 60]
          }
        ]
      }
    }
  }
}
</script>
