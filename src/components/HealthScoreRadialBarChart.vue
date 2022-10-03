<template>
    <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'HealthScoreRadialBarChart',
  data() {
    return {
      chartOptions: {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
                size: '65%'
            }
          }
        },
        labels: ['Score'],
        colors: ['#7AC756']
      },
      series: [65]
    }
  }
}
</script>