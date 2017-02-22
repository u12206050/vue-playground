<template>
  <div>
    <div class="page-loader" v-bind:class="{ active: !view }"></div>
    <component v-bind:is="view" :node="node">
    </component>
    <div class="page-info" v-if="loading">
      {{loading}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('Page', function (resolve) {
  require(['./Page.vue'], resolve)
})
Vue.component('LandingPage', function (resolve) {
  require(['./LandingPage.vue'], resolve)
})
Vue.component('CategoryPage', function (resolve) {
  require(['./CategoryPage.vue'], resolve)
})
import NotFound from './NotFound'

export default {
  data () {
    return {
      uri: false,
      node: null,
      view: null
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    postApi () {
      return this.$store.state.api.posts
    },
    loading () {
      return this.uri ? 'Loading ' + this.uri + '...' : ''
    }
  },
  components: {
    // LandingPage: LandingPage,
    NotFound: NotFound
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.node = null
      this.view = null
      this.uri = this.$route.path
      this.$http.get(this.postApi + this.$route.path)
      .then(res => {
        if (res.data) {
          this.node = res.data
          switch (this.node._entitytype) {
            case 'post':
              this.view = 'Page'
              break
            case 'landing_page':
              this.view = 'LandingPage'
              break
            case 'category':
              this.view = 'CategoryPage'
              break
            default: this.view = 'Page'
          }
        } else {
          this.view = 'NotFound'
        }
        setTimeout(() => {
          this.uri = false
        }, 500)
      })
      .catch(error => {
        console.warn('Loading page error: ' + error.message || error.response.status)
        this.view = 'NotFound'
        setTimeout(() => {
          this.uri = false
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss">
.page-loader {
  height: 0;
  display: block;
  position: relative;
  background-size: 100%;
  background-position: center !important;
  background-color: #fff;
  background-image: url(../assets/loader-purple.gif);
  background-repeat: no-repeat;
  background-size: initial;
  transition: height 0.2s ease;

  .active {
    height: 100%;
  }
}

.page-info {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.8);
  color: #fff;
  padding: 4px;
  font-size: 12px;
}
</style>
