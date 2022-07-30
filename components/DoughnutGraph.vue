<template>
  <div>
    <Doughnut
      :chart-options="Options"
      :chart-data="returnChartData()"
    />

    <center class="mt-3">
      <b>{{Number((numVisited/dataLength) * 100).toFixed(1)}} % ({{numVisited}} / {{dataLength}})</b>
    </center>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ArcElement} from 'chart.js'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Doughnut },
  props: ['dataLength', 'numVisited'],
  data() {
    return {
      data: {
        labels: ['訪問済み', '未訪問',],
        datasets: [
          {
            data: [10, 100],
            backgroundColor: ['#dc143c', '#c0c0c0'],
            borderColor: 'transparent'
          }
        ]
      },
      Options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontSize: 28,
        },
      },

    }
  },
  mounted() {
    console.log(this.dataLength)
    console.log(this.numVisited)
    const data = [this.numVisited, this.dataLength]
    console.log(data)
    this.data.datasets.data = data
  },
  methods: {
    returnChartData() {
      const returnData =  {
        labels: ['訪問済み', '未訪問',],
        datasets: [
          {
            data: [this.numVisited, this.dataLength-this.numVisited],
            backgroundColor: ['#dc143c', '#c0c0c0'],
            borderColor: 'transparent'
          }
        ]
      }

      return returnData
    },
  }
}
</script>
