<template>
  <div>
    <v-card>
      <v-toolbar
        color="cyan"
        dark
        flat
      >
        <v-toolbar-title>管理画面</v-toolbar-title>

        <template v-slot:extension>
          <v-tabs
            v-model="itemId"
            align-with-title
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="itemId">
        <v-tab-item><RegisterOnsen /></v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import RegisterOnsen from '~/components/RegisterOnsen'

export default {
  data () {
    return {
      itemId: null,
      items: [
        'Add', 'Edit',
      ],
    }
  },
  methods: {
  },
  components: {
    RegisterOnsen,
  }
}
</script>
