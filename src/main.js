// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'

import App from './App'
import router from './router'

Vue.use(Vuex)
Vue.use(VueMaterial)

/* eslint-disable no-new */
var root = new Vue({
  router,
  template: '<App/>',
  components: { App }
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app')
})
