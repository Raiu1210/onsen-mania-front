<template>
    <!-- ヒーローセクション -->
    <v-container>
    <v-card>
      <v-img :src="`${baseURL}/thumbnails/${onsen.image_path}`" class="white--text" height="200px">
        <v-card-title>{{ onsen.name }}</v-card-title>
      </v-img>

      <v-card-text>
        <div><strong>住所:</strong> {{ onsen.address }}</div>
        <div><strong>電話番号:</strong> {{ onsen.tel }}</div>
        <div><strong>営業時間:</strong> {{ onsen.open_time }}</div>
        <div><strong>休業日:</strong> {{ onsen.off_day }}</div>
        <div><strong>駐車場:</strong> {{ onsen.parking }}</div>
        <div><strong>料金:</strong> {{ onsen.price }}</div>
        <div><strong>サウナ:</strong> {{ onsen.sauna }}</div>
        <div v-if="onsen.url"><strong>ウェブサイト:</strong> <a :href="onsen.url">{{ onsen.url }}</a></div>
        <div><strong>注意事項:</strong> <span v-html="onsen.caution"></span></div>
      </v-card-text>
    </v-card>

    <v-alert type="info" class="mt-5" dense text>
      記載されている情報は調査時のもので、現在は変更されている可能性があります。情報の修正依頼はアプリから行えます
    </v-alert>
  </v-container>

  <!-- </v-app> -->
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import {baseURL} from '~/myModules/api'

export default {
  data() {
    return {
      baseURL: baseURL,
    }
  },
  async asyncData({ params }) {
    const res = await Api.get('/onsen/onsen_detail', {
        params: {
          onsen_id: params.onsen_id,
        }
      })
    return { onsen: res.data };
  },
  head() {
    return {
      title: `${this.onsen.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.onsen.name}の詳細情報： 住所:${this.onsen.address}, サウナ:${this.onsen.sauna}, tel:${this.onsen.tel}, 営業時間:${this.onsen.open_time}, 定休日:${this.onsen.off_day}, 注意事項:${this.onsen.caution}, 注意事項:${this.onsen.price} `
        },
        // 他のメタタグ...
      ]
    };
  }
}
</script>


<style>
.toolbar-link {
  cursor: pointer;
}
</style>
