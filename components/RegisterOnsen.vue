<template>
  <v-card flat>
    <v-row justify="center" align="center" class="mt-3">
      <v-col cols="1">
        <p>name</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.name" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>url</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.url" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>address</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.address" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>tel</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.tel" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>open_time</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.open_time" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>off_day</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.off_day" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>parking</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.parking" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>price</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.price" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>caution</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.caution" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>sauna</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo v-model="onsenRegisterObj.sauna" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>lat</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo type="number" v-model="onsenRegisterObj.lat" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>lon</p>
      </v-col>
      <v-col cols="10">
        <v-text-field solo type="number" v-model="onsenRegisterObj.lon" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <p>pref</p>
      </v-col>
      <v-col cols="10">
        <v-select
          v-model="onsenRegisterObj.pref"
          :items="prefs"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <img-inputer
        v-model="onsenImg"
        theme="light"
        size="large"
        placeholder="ファイルをここにドラッグする"
        bottom-text="クリックで画像を再選択"
      />
    </v-row>


    <v-row justify="center" align="center">
      <v-col cols="1">
        <v-btn
          class="ma-2"
          color="success"
          @click="addOnsen()"
        >
          追加
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import {axiosInstance as Api} from '~/myModules/api'
import {createInstanceWithJWT, baseURL} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

export default {
  data() {
    return {
      onsenImg: null,
      onsenRegisterObj: {
        name       : "",
        url        : "",
        address    : "",
        tel        : "",
        open_time  : "",
        off_day    : "",
        parking    : "",
        price      : "",
        caution    : "",
        sauna      : "",
        image_path : "",
        lat        : 0.0,
        lon        : 0.0,
        pref       : "",
      },
      prefs: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県"
      ]
    }
  },
  async created() {
    if(typeof this.$cookies.get("jwt-token") === "undefined") {
      console.log("cookie is empty. go to login")
      this.$router.push('/login')
    }
  },
  methods: {
    async addOnsen() {
      const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))

      // upload img
      var formdata = new FormData()
      formdata.append('file', this.onsenImg)
      const res = await apiInstance.post('/uploadfile', formdata)
      this.onsenRegisterObj.image_path = res['data']['saved_file_path']

      const res2 = await apiInstance.post('/onsen/add_onsen', this.onsenRegisterObj)
      alert(res2['data']['message'])
      location.reload()
    },
  },
  components: {
    ImgInputer
  }
}
</script>



