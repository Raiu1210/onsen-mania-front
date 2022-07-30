<template>
  <div>
    <v-card>
      <GmapMap
        ref="gmp"
        map-type-id="roadmap"
        :center="maplocation"
        :zoom="zoom"
        :style="styleMap"
        :options="mapOptions"
      >
        <GmapMarker
          v-for="(onsen, index) in onsenList"
          :key="index"
          :title="onsen.name"
          :position="{lat: onsen.lat, lng: onsen.lon}"
          :clickable="true"
          :draggable="false"
          @click="onClickMarker(index, onsen)"
        />
        <GmapInfoWindow
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <center style="color: #000">
            {{ marker.name }}
          </center>
        </GmapInfoWindow>
      </GmapMap>
    </v-card>

    <v-card class="mx-auto my-4" v-if="infoWinOpen">
      <v-img
        height="150"
        :src="`${baseURL}/thumbnails/` + marker['image_path']"
      ></v-img>
      <v-card-title>{{marker['name']}}</v-card-title>
      <v-card-text class="text--primary">
        <b>住所 :</b> {{onsenDetail['address']}}<br />
        <b>定休日 :</b> {{onsenDetail['off_day']}}<br />
        <b>営業時間 :</b> {{onsenDetail['open_time']}}<br />
        <b>駐車場 :</b> {{onsenDetail['parking']}}<br />
        <b>サウナ :</b> {{onsenDetail['sauna']}}<br />
      </v-card-text>

      <a class="tel-btn" :href="`tel:${onsenDetail['tel']}`">
        <v-btn color="success mb-3 ml-3" fab>
          <v-icon>mdi-phone-in-talk</v-icon>
        </v-btn>
      </a>
    </v-card>
  </div>
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import {createInstanceWithJWT, baseURL} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";


export default {
  data() {
    return {
      onsenList: [],
      onsenDetail: {},
      maplocation: { lat: 0, lng: 0 },
      zoom: 12,
      styleMap: {
        width: '100%',
        height: '400px',
      },
      mapOptions: {
        streetViewControl: false,
        styles: [],
      },
      infoOptions: {
        minWidth: 200,
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      marker: {},
      baseURL: baseURL
    }
  },
  async created() {
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      console.log("cookie is empty. go to login")
      this.$router.push('/login')
    }
  },
  async mounted() {
    const res = await Api.get('onsen/onsen_list')
    this.onsenList = res['data']

    const currentPosTmp = await this.getCurrentPosition()
    const currentPos = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude,
    }
    this.maplocation = currentPos
  },
  methods: {
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    async onClickMarker(index, marker) {
      this.$refs.gmp.panTo({lat: marker.lat, lng: marker.lon})
      this.infoWindowPos = {lat: marker.lat, lng: marker.lon}
      this.marker = marker
      this.infoWinOpen = true

      const res = await Api.get('/onsen/onsen_detail', {
        params: {
          onsen_id: marker.id,
        }
      })
      this.onsenDetail = res['data']
    },
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


<style scoped>
.tel-btn {
  text-decoration: none;
}
</style>
