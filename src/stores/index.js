import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const BACKEND_URL = 'http://velgriktig.no.wordpress.gerardl:7070'
const BACKEND_URL = 'http://160119-www.web.tornado-node.net'
const SITE_URL = 'http://velgriktig.no'
const API_URL = BACKEND_URL + '/wp-json/o7/v1'

const API = {
  state: {
    backend: BACKEND_URL,
    site: SITE_URL,
    api_url: API_URL,
    pages: API_URL + '/posts',
    posts: API_URL + '/posts',
    query: API_URL + '/query',
    menu: API_URL + '/menus',
    settings: API_URL + '/settings'
  }
}

const PageResource = {
  namespaced: true,
  state: {
    LOADING: -1,
    NOT_FOUND: 404,
    TIMED_OUT: 500,
    cache: {}
  },
  mutations: {
    save (state, data) {
      if (data.uri) {
        Vue.set(state.cache, data.uri, data.page)
      }
      Vue.set(state.cache, data.id, data.page)
    },
    notify (state, status) {
      if (status.uri) {
        Vue.set(state.cache, status.uri, status.code)
      }
    }
  },
  actions: {
    load ({ commit, state }, uri) {
      if (uri) {
        commit('notify', {uri: uri, code: -1})

        let timer = setTimeout(() => {
          commit('notify', {uri: uri, code: state.TIMED_OUT})
        }, 5000)

        axios.get(API.state.api_url + uri)
        .then(res => {
          clearTimeout(timer)
          if (res.data) {
            let page = res.data
            page.uri = page.uri || page.url || page.slug

            commit('save', {
              id: page.id,
              uri: uri,
              page: page
            })
          } else {
            commit('notify', {uri: uri, code: state.NOT_FOUND})
          }
        })
        .catch(error => {
          clearTimeout(timer)
          console.warn('Loading page error: ' + error.message || error.response.status)
          commit('notify', {uri: uri, code: state.NOT_FOUND})
        })
      }
    },
    loadMultiple ({ commit, state }, ids) {
      axios.get(API.state.pages + '/' + ids.join(','))
      .then(res => {
        let data = res.data
        ids.forEach(id => {
          if (data[id]) {
            let page = data[id]
            page.uri = page.uri || page.url || page.slug
            commit('save', {
              id: id,
              uri: '/posts/' + page.uri,
              page: page
            })
          } else {
            commit('notify', {uri: id, code: state.NOT_FOUND})
          }
        })
      })
      .catch(error => {
        console.warn('SearchPage has error: ' + error.message || error.response.status)
        this.loading = false
      })
    }
  }
}

export default new Vuex.Store({
  strict: true,
  state: {
    currentPage: null
  },
  mutations: {
    setActivePage (state, page) {
      state.currentPage = page
    }
  },
  modules: {
    api: API,
    pages: PageResource
  }
})
