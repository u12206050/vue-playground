<template>
  <div>
    <div class="page-loader" v-bind:class="{ active: !view }"></div>
    <component v-bind:is="view" :node="node">
    </component>
    <div class="page-info" v-if="!view">
      Loading {{uri}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import Page from './Page'
import LandingPage from './LandingPage'
import NotFound from './NotFound'

Vue.component('CategoryPage', function (resolve) {
  require(['./CategoryPage.vue'], resolve)
})

export default {
  data () {
    return {
      uri: false,
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
    node () {
      if (this.$store.state.pages) {
        if (!this.$store.state.pages.cache[this.uri]) {
          this.$store.dispatch('pages/load', this.uri)
        }
        return this.$store.state.pages.cache[this.uri]
      }
      return null
    },
    seo_title () {
      return {
        inner: this.node ? this.node.title : '',
        complement: 'Velgriktig'
      }
    },
    seo_meta () {
      if (!this.node) return []
      let title = this.node.title
      let description = this.node.excerpt || this.node.content || ''
      let image = this.node.image || this.node.featured_image
      if (typeof image === 'object') {
        if (image.styles) {
          image = image.styles['article'] || image.src
        } else {
          image = image.src
        }
      }
      return [
        // { name: 'description', content: '123456789' },
        { n: 'application-name', c: 'Velgriktig' },
        { n: 'description', c: description }, // id to replace intead of create element
        { n: 'url', c: this.$store.state.api.site + this.node.uri },
        // Twitter
        { n: 'twitter:title', c: title },
        { n: 'twitter:description', c: description },
        // Google+ / Schema.org
        { itemprop: 'name', c: title },
        { itemprop: 'description', c: description },
        // Facebook / Open Graph
        // { property: 'fb:app_id', content: '123456789' },
        { p: 'og:title', c: title },
        { p: 'og:image', c: 'https://example.com/image.jpg' }
      ]
    }
  },
  components: {
    Page,
    LandingPage,
    NotFound
  },
  watch: {
    '$route': 'fetchData',
    node (_node) {
      if (typeof _node === 'object') {
        this.$store.commit('setActivePage', _node)
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

        this.$emit('updateHead')
      } else if (_node > 0) {
        this.view = 'NotFound'
      }
    }
  },
  methods: {
    fetchData () {
      this.view = null
      if (this.$route.params.yrker) {
        this.uri = '/nsr/yrker/' + this.$route.params.yrker
      } else {
        this.uri = '/posts/' + (this.$route.path || '/')
      }
    }
  },
  head: {
    title: function () {
      return this.seo_title
    },
    meta: function () {
      return this.seo_meta
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
