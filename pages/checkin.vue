<template>
  <div>
    <h2>現在地付近の温泉</h2>
    <v-card
      class="mx-auto my-12"
      v-for="onsen in nearOnsenList.slice(0, 20)"
      :key="onsen.id"
      @click="checkinConfirm(onsen)"
    >
      <v-img
        height="250"
        :src="`${baseURL}/thumbnails/` + onsen['image_path']"
      ></v-img>

      <v-card-title>{{onsen['name']}}</v-card-title>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          「{{selectedOnsen.name}}」にチェックインしますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="checkin()"
          >
            チェックイン
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          「{{selectedOnsen.name}}」にチェックインしました!
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="gotoMain()"
          >
            OK
          </v-btn>
          <v-btn
              class="ma-2"
              fab
              dark
              color="blue"
              @click="share('twitter')"
            >
              <v-icon dark>
                mdi-twitter
              </v-icon>
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import {createInstanceWithJWT, baseURL} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

export default {
  data() {
    return {
      lat: 35.6762,
      lon: 139.6503,
      onsenList: [],
      nearOnsenList: [],
      dialog: false,
      dialog2: false,
      selectedOnsen: {},
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

    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          this.lat = coords.latitude;
          this.lon = coords.longitude;

          for(let i = 0; i<this.onsenList.length; i++) {
            this.onsenList[i]['distance'] = this.calcDistance(this.onsenList[i]['lat'], this.onsenList[i]['lon'], this.lat, this.lon)
          }
          this.nearOnsenList = this.onsenList.sort(function(a, b) {
            return (a.distance< b.distance) ? -1 : 1;
          })
        }.bind(this),
      )
    } else {
      console.log("can't get location")
    }
  },
  methods: {
    calcDistance(lat1, lng1, lat2, lng2) {
      // console.log(lat2, lng2)
      const R = Math.PI / 180;
      lat1 *= R;
      lng1 *= R;
      lat2 *= R;
      lng2 *= R;
      return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    },
    checkinConfirm(onsen) {
      this.dialog = true
      this.selectedOnsen = onsen
      console.log(onsen.id)
    },
    async checkin() {
      const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))

      const postObj = {
        onsen_id: this.selectedOnsen.id
      }
      const res = await apiInstance.post('/users/checkin', postObj)
      this.dialog = false

      if(res['data']['result'] == 0) {
        this.dialog2 = true
      }
    },
    gotoMain() {
      this.dialog2 = false
      this.$router.push('/')
    },
    share(sns) {
      const shareUrl = `https://onsen-mania.com/`
      const text = `%E3%80%90${this.selectedOnsen.name}%E3%80%91に来たよ！ %0a%0a%20%23温泉マニア %20%23温泉 %20%23${this.selectedOnsen.name} %0a%0a`
      let href = ""
      switch( sns ) {
        case 'twitter':
            href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`
            break
        // case 'facebook':
        //     href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
        //     break
        // case 'line':
        //     href = `https://social-plugins.line.me/lineit/share?url=${shareUrl}`
        //     break
      }
      window.open(href, '_blank') // 新規タブでSNSのシェアページを開く
      this.gotoMain()
    },
  }
}
</script>
