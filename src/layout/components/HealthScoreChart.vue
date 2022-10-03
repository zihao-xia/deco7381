<template>
    <div id="chart">
      <apexchart width="400" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
  name: 'HealthScoreChart',
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Team', 'Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4']
        },
        colors: ['#9CE3FC']
      },
      series: [
        {
          name: 'Health Score',
          data: [90, 100, 75, 80, 60]
        }
      ]
    }
  }
}
</script>

<style scoped>
#chart {
  margin-top: 40px;
}
</style>