<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col cols="8">
        <v-card>
          <v-img
            src="https://gahag.net/img/201604/04s/gahag-0072592460-1.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>温泉にチェックイン</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col cols="4">
        <v-card>
          <v-img
            src="https://alsheraz.com/wp-content/uploads/2021/01/google-maps-new-interface1.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>温泉を探す</v-card-title>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card>
          <v-img
            src="https://www.tac-school.co.jp/file/tac/tacnewsweb/images/feature/2020/feat202005_1_large.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>温泉巡りの記録</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import $cookies from "cookie-universal-nuxt";


export default {
  data() {
    return {
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }
  },
  created() {
    console.log(this.$cookies.get("jwt-token"))
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      console.log("cookie is empty. go to login")
      this.$router.push('/login')
    }
  }
}
</script>
