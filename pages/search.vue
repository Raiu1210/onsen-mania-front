<template>
  <div>
    <center>
      <v-alert
        outlined
        type="warning"
        prominent
        border="left"
      >
        中心座標から半径50kmで検索をしています。初期位置から場所を変えた時は再検索ボタンを押してください
      </v-alert>

      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="loading"
      ></v-progress-circular>

      <v-card id="map">
        <l-map :zoom="zoom" :center="center" :preferCanvas="true" @update:center="centerUpdated">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker
            v-for="(onsen, index) in displayOnsen"
            :lat-lng="[onsen.lat, onsen.lon]"
            :key="index"
            @click="onClickMarker(index, onsen)"
          >
            <l-popup>
              <div class="primary--text">{{onsen.name}}</div>
            </l-popup>
          </l-marker>
        </l-map>
      </v-card>

      <v-btn depressed color="primary" class="ma-3" @click="reload">
        再検索
      </v-btn>
    </center>



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
      displayOnsen: [],
      onsenDetail: {},
      center: [35.6762, 139.6503],
      mapCenter: [],
      maplocation: { lat: 0, lng: 0 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 10,
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
      baseURL: baseURL,
      loading: false
    }
  },
  async created() {
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      console.log("cookie is empty. go to login")
      this.$router.push('/login')
    }
  },
  async mounted() {
    this.loading = true
    const res = await Api.get('onsen/onsen_list')
    this.onsenList = res['data']

    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          const currentPos = {
            lat: coords.latitude,
            lng: coords.longitude,
          }
          this.center = currentPos

          res['data'].forEach(onsen => {
            if(this.calcDistance(currentPos.lat, currentPos.lng, onsen.lat, onsen.lon) < 50) {
              this.displayOnsen.push(onsen)
            }
          })
        }.bind(this),
      )
    } else {
      console.log("can't get location")
    }

    this.loading = false
  },
  methods: {
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    async onClickMarker(index, marker) {
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
    centerUpdated (center) {
      this.mapCenter = center;
    },
    calcDistance(lat1, lng1, lat2, lng2) {
      const R = Math.PI / 180;
      lat1 *= R;
      lng1 *= R;
      lat2 *= R;
      lng2 *= R;
      return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    },
    reload() {
      this.loading = true
      this.displayOnsen = []
      const self = this
      this.onsenList.forEach(onsen => {
        if(self.calcDistance(self.mapCenter.lat, self.mapCenter.lng, onsen.lat, onsen.lon) < 50) {
          self.displayOnsen.push(onsen)
        }
      })
      this.loading = false
    }
  },
}
</script>


<style scoped>
.tel-btn {
  text-decoration: none;
}

#map{
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 400px;
}
</style>
