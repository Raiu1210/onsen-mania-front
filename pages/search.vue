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

    <v-card class="mx-auto my-4">
      <v-img
        height="150"
        :src="'http://localhost:8000/thumbnails/' + marker['image_path']"
      ></v-img>

      <v-card-title>{{marker['name']}}</v-card-title>
      <v-card-text class="text--primary">
        {{marker['address']}} <br />
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
      marker: {}
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
    onClickMarker(index, marker) {
      this.$refs.gmp.panTo({lat: marker.lat, lng: marker.lon})
      this.infoWindowPos = {lat: marker.lat, lng: marker.lon}
      this.marker = marker
      this.infoWinOpen = true
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
