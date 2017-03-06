import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'keen-ui/src/bootstrap'

import App from './App'
import router from './router'

if (typeof window !== 'undefined') window.eventBus = new Vue()

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

import App from './App'
import router from './router'

(function () { 'use strict'
  var createApp = function () {
    // ---------------------
    // BEGIN NORMAL APP CODE
    // ---------------------
    // Main Vue instance must be returned and have a root
    // node with the id "app", so that the client-side
    // version can take over once it loads.
    return new Vue({
      router,
      template: '<App/>',
      components: { App }
    })
    // -------------------
    // END NORMAL APP CODE
    // -------------------
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)