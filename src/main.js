// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'keen-ui/src/bootstrap'

import App from './App'
import router from './router'

window.eventBus = new Vue()

Vue.use(Vuex)
Vue.use(VueMaterial)

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

/* eslint-disable no-new */
var root = new Vue({
  router,
  template: '<App/>',
  components: { App }
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app')
})
