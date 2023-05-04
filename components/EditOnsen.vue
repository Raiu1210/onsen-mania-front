<template>
  <v-card flat>
    <v-card-group>
      <v-row justify="center" class="mt-3">
        <v-card v-for="(pref, index) in sortedData" :key="index" class="mt-2 mx-1">
          <v-card-title>{{ pref.pref }}</v-card-title>
          <v-card-text>
            <v-list>
                <v-list-item v-for="(item, index) in pref.items" :key="index">
                  <a @click="showPopup(item)">{{ item.name }}</a>
                </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card-group>

    <v-dialog v-model="popupVisible" max-width="80%">
      <v-card class="pa-5">
        <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Name" v-model="selectedData.name" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="URL" v-model="selectedData.url" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Address" v-model="selectedData.address" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Tel" v-model="selectedData.tel" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Open Time" v-model="selectedData.open_time" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Off Day" v-model="selectedData.off_day" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Parking" v-model="selectedData.parking" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Price" v-model="selectedData.price" />
          </v-col>
          <v-col cols="12">
            <v-textarea label="Caution" v-model="selectedData.caution" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field type="number" label="Latitude" v-model="selectedData.lat" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field type="number" label="Longitude" v-model="selectedData.lon" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Sauna" v-model="selectedData.sauna" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Pfef" v-model="selectedData.pref" :items="prefs"/>
          </v-col>
          <v-col cols="12">
            <v-checkbox label="Disabled" v-model="selectedData.disabled" />
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
      </v-form>

        <v-card-actions>
          <v-btn color="primary" @click="saveSelectedData">Save</v-btn>
          <v-btn color="primary" text @click="popupVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      onsenList: [],
      onsenDetail: {},
      baseURL: baseURL,
      popupVisible: false,
      selectedData: {},
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
    const res = await Api.get('onsen/onsen_list')
    this.onsenList = res['data']
  },
  methods: {
    reload() {
    },
    async showPopup(item) {
      const res = await Api.get('/onsen/onsen_detail', {
        params: {
          onsen_id: item.id,
        }
      })
      this.selectedData = res['data']
      this.popupVisible = true
    },
    async saveSelectedData() {
      const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))

      if(this.onsenImg) {
        var formdata = new FormData()
        formdata.append('file', this.onsenImg)
        const res = await apiInstance.post('/uploadfile', formdata)
        this.selectedData.image_path = res['data']['saved_file_path']
      }

      const postObj = {
        "id": this.selectedData.id,
        "name": this.selectedData.name,
        "url": this.selectedData.url,
        "address": this.selectedData.address,
        "tel": this.selectedData.tel,
        "open_time": this.selectedData.open_time,
        "off_day": this.selectedData.off_day,
        "parking": this.selectedData.parking,
        "price": this.selectedData.price,
        "caution": this.selectedData.caution,
        "sauna": this.selectedData.sauna,
        "image_path": this.selectedData.image_path,
        "lat": this.selectedData.lat,
        "lon": this.selectedData.lon,
        "pref": this.selectedData.pref,
        "disabled": this.selectedData.disabled
      }

      console.log(postObj)
      const res2 = await apiInstance.post('/onsen/update_onsen', postObj)

      // update view
      const res = await Api.get('onsen/onsen_list')
      this.onsenList = res['data']
      this.onsenImg = null
      this.popupVisible = false
    }
  },
  computed: {
    sortedData() {
      const groupedData = this.onsenList.reduce((groups, item) => {
        const group = groups[item.pref] || []
        group.push(item)
        groups[item.pref] = group
        return groups
      }, {})

      const sortedData = Object.keys(groupedData).sort().map(pref => {
        return {
          pref: pref,
          items: groupedData[pref].sort((a, b) => {
            return a.name.localeCompare(b.name)
          })
        }
      })

      return sortedData
    }
  },
  components: {
    ImgInputer
  }
}
</script>
