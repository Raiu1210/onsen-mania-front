<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col cols="12">
        <v-card @click="$router.push('/checkin')">
          <v-img
            src="https://monaledge.com:8443/articleImages/1657950122775gahag-0072592460-1.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>チェックイン</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col cols="6">
        <v-card @click="$router.push('/search')">
          <v-img
            src="https://monaledge.com:8443/articleImages/1657950122784google-maps-new-interface1.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>探す</v-card-title>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card @click="$router.push('/stats')">
          <v-img
            src="https://monaledge.com:8443/articleImages/1657950122797feat202005_1_large.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>記録</v-card-title>
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
