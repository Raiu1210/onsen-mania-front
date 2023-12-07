<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="display-2 text-center">日本全国 温泉巡りの旅へ</h1>
          <p class="subtitle-1 text-center">
            温泉マニアは、温泉好きの温泉好きによる温泉好きのためのアプリです
          </p>
          <v-row justify="center">
            <!-- App Storeのダウンロードボタン -->
            <a href="https://apps.apple.com/jp/app/%E6%B8%A9%E6%B3%89%E3%83%9E%E3%83%8B%E3%82%A2/id6449859396" target="_blank" class="ma-2">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" class="store-badge">
            </a>

            <!-- Google Playのダウンロードボタン -->
            <a href="https://apps.apple.com/jp/app/%E6%B8%A9%E6%B3%89%E3%83%9E%E3%83%8B%E3%82%A2/id6449859396" target="_blank" class="ma-2">
              <img src="https://lh3.googleusercontent.com/q1k2l5CwMV31JdDXcpN4Ey7O43PxnjAuZBTmcHEwQxVuv_2wCE2gAAQMWxwNUC2FYEOnYgFPOpw6kmHJWuEGeIBLTj9CuxcOEeU8UXyzWJq4NJM3lg=s0" alt="Download on the App Store" class="store-badge">
            </a>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- 機能紹介セクション -->
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="/map-view.jpeg"
              alt="Feature description"
            ></v-img>
            <v-card-title>簡単検索</v-card-title>
            <v-card-text>地図から簡単に全国の温泉を探すことができます。赤いピンは未訪問で青いピンが訪問済み</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="/record-view.jpeg"
              alt="Feature description"
            ></v-img>
            <v-card-title>記録</v-card-title>
            <v-card-text>温泉に訪れたことを記録しておくことで、「あの日いった温泉なんだっけ？」といったときに役立ちます</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="/stats-view.jpeg"
              alt="Feature description"
            ></v-img>
            <v-card-title>コンプ率</v-card-title>
            <v-card-text>各都道府県ごとに温泉のコンプ率が表示されます。目指せ日本一の温泉マニア</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '温泉マニア',
      meta: [
        // ページ固有のメタディスクリプション
        {
          hid: 'description',
          name: 'description',
          content: '温泉マニアは、温泉好きの温泉好きによる温泉好きのためのアプリです'
        },
        // ソーシャルメディア共有用のOGタグなど
      ]
    };
  },
  data() {
    return {
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }
  },
}
</script>


<style scoped>
.store-badge {
  height: 40px; /* または適切なサイズに調整 */
  width: auto; /* 幅は自動的に調整される */
}
</style>
