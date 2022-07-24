<template>
  <h1>Search</h1>
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
    // console.log(this.$cookies.get("jwt-token"))
    // if(typeof this.$cookies.get("jwt-token") === "undefined") {
    //   console.log("cookie is empty. go to login")
    //   this.$router.push('/login')
    // }
  }
}
</script>
