// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueHead from 'vue-head'
import 'keen-ui/src/bootstrap'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './stores'

Vue.use(VueMaterial)
Vue.use(VueHead)

Vue.prototype.$http = axios

Vue.material.registerTheme('default', {
  primary: {
    color: 'light-blue',
    hue: 600
  },
  accent: {
    color: 'pink',
    hue: 300
  },
  warn: 'red',
  background: {
    color: 'grey',
    hue: 100
  }
})

Vue.component('BaseCard', require('components/BaseCard.vue'))
Vue.component('CardSection', require('components/CardSection.vue'))
Vue.component('InputBox', require('components/InputBox.vue'))

/* eslint-disable no-new */
var root = new Vue({
  router,
  store,
  template: '<app/>',
  components: { App }
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app')
})
