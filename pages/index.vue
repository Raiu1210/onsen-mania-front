<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>

    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import $cookies from "cookie-universal-nuxt";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  created() {
    console.log(this.$cookies.get("test"))

    console.log(this.$cookies.get("jwt-token"))
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      console.log("cookie is empty. go to login")
      this.$router.push('/login')
    }
  }
}
</script>
