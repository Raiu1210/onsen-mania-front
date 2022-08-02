<template>
  <div>
    <v-row
      justify="center" align-content="center"
    >
      <v-col cols=12>
        <v-card class="my-2">
          <v-toolbar class="white--text" color="deep-orange darken-1" flat>訪問回数</v-toolbar>

          <BarGraph class="mt-3" :chartData="chartData" />

          <center>
            <v-col cols=8>
              <v-select
                class="mt-3"
                :items="visitedYears"
                v-model="selectedYear"
                :label="selectedYear + '年'"
                solo
              ></v-select>
            </v-col>
          </center>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      justify="center" align-content="center"
    >
      <v-col cols=12>
        <v-card class="my-2" >
          <v-toolbar class="white--text" color="purple darken-1" flat>コンプ率</v-toolbar>

          <DoughnutGraph class="mt-3" :dataLength="onsenList.length" :numVisited="countUniqueVisit(visited)" />
          <center>
            <v-col cols=8>
              <v-select
                class="mt-3"
                :items="visitedYears"
                v-model="selectedYear"
                label="全国"
                solo
              ></v-select>
            </v-col>
          </center>
        </v-card>
      </v-col>
    </v-row>

    <center>
      <v-btn
        depressed
        color="primary"
        class="mx-2 my-2"
        @click="$router.push('/history')"
      >
        チェックインの履歴
      </v-btn>
    </center>
  </div>
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import {createInstanceWithJWT} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

// my component
import BarGraph from '~/components/BarGraph'
import DoughnutGraph from '~/components/DoughnutGraph'

export default {
  data() {
    return {
      onsenList: [],
      visited: [],
      visitedYears: [],
      selectedYear: 0,

      // stats area
      area: ['全国'],

      // input for monthly bar graph
      chartData: {}

    }
  },
  async created() {
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      this.$router.push('/login')
    }
    const res = await Api.get('onsen/onsen_list')
    this.onsenList = res['data']

    const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))
    const res2 = await apiInstance.get('users/my_visit')
    this.visited = res2['data']

    // get this year
    const timeObj = new Date()
    this.selectedYear = timeObj.getFullYear()
    this.calcMonthlyCount(timeObj.getFullYear())
    this.countVisitedYears()
  },
  methods: {
    getTimeInfo(timeStr) {
      const dateInfo = timeStr.split('T')[0].split('-')
      return dateInfo[0] + '年' + dateInfo[1] + '月' + dateInfo[2] + '日'
    },
    calcMonthlyCount(year) {
      let monthlyCount = {'1月':0,'2月':0,'3月':0,'4月':0,'5月':0,'6月':0,'7月':0,'8月':0,'9月':0,'10月':0,'11月':0,'12月':0}
      this.visited.forEach(function(visit) {
        const dateInfo = visit['created_at'].split('T')[0].split('-')
        if(dateInfo[0] != year) {
          return
        }
        monthlyCount[Number(dateInfo[1])+'月'] += 1
      })
      let chartData = {
        labels: Object.keys(monthlyCount),
        datasets: [{
          label: "温泉にチェックインした回数",
          backgroundColor: '#ff6600',
          data: Object.values(monthlyCount)
        }]
      }
      this.chartData = chartData
    },
    countVisitedYears() {
      let years = []
      this.visited.forEach(function(visit) {
        const dateInfo = visit['created_at'].split('T')[0].split('-')
        if(years.includes(Number(dateInfo[0])+'年')) {
          return
        }
        years.push(Number(dateInfo[0])+'年')
      })
      this.visitedYears = years
    },
    countUniqueVisit(visits) {
      console.log(visits)
      let visitedIds = []
      visits.forEach(function(visit) {
        if(!visitedIds.includes(visit['onsen_id'])) {
          visitedIds.push(visit['onsen_id'])
        }
      })
      return visitedIds.length
    }
  },
  components: {
    BarGraph,
    DoughnutGraph
  }
}
</script>
