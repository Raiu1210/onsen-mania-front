import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCmGKBQqWqQQhaOSQiq-bzsgTM4ar5FC_k',
    libraries: 'places',
  },
})
