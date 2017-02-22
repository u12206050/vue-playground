import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const BACKEND_URL = 'http://velgriktig.no.wordpress.gerardl:7070'
const BACKEND_URL = 'http://160119-www.web.tornado-node.net'
const API_URL = BACKEND_URL + '/wp-json/o7/v1'

export default new Vuex.Store({
  strict: true,
  state: {
    api: {
      backend: BACKEND_URL,
      pages: API_URL + '/posts',
      posts: API_URL + '/posts',
      query: API_URL + '/query',
      menu: API_URL + '/menus',
      settings: API_URL + '/settings'
    }
  }
})
