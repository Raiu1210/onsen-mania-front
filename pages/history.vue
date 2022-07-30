<template>
  <div>
    <v-card
      class="mx-auto my-4"
      v-for="onsen in visited.slice(0, 20)"
      :key="onsen.id"
    >
      <v-img
        height="150"
        :src="'http://localhost:8000/thumbnails/' + onsen['image_path']"
      ></v-img>

      <v-card-title>{{onsen['name']}}</v-card-title>
      <v-card-text class="text--primary">
        {{onsen['address']}} <br />
        {{getTimeInfo(onsen['created_at'])}}にチェックインしました
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import {createInstanceWithJWT} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

export default {
  data() {
    return {
      onsenList: [],
      visited: []
    }
  },
  async created() {
    console.log(this.$cookies.get("jwt-token"))
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      this.$router.push('/login')
    }
    const res = await Api.get('onsen/onsen_list')
    this.onsenList = res['data']

    const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))
    const res2 = await apiInstance.get('users/my_visit')
    console.log(res2['data'])
    this.visited = res2['data']
    // users/my_visit
  },
  methods: {
    getTimeInfo(timeStr) {
      const dateInfo = timeStr.split('T')[0].split('-')
      return dateInfo[0] + '年' + dateInfo[1] + '月' + dateInfo[2] + '日'
    }
  }
}
</script>
