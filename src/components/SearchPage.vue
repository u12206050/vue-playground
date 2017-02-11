<template>
  <transition name="fade">
    <div v-show="show" class="search-page container">
      <md-card class="hero">
          <input-box placeholder="Søk" icon="search" :init="query" v-on:onChange="newSearch"></input-box>
      </md-card >
      <div v-if="loading || total" class="row results">
          <h3>Søkeresultater for: <span>{{query}}</span></h3>
          <md-card v-for="result of results" md-with-hover>
            <transition name="slide">
              <router-link v-if="result" :to="result.url || result.uri">
                <md-card-header>
                  <div class="md-title">{{result.title}}</div>
                  <div class="md-subhead">{{result.excerpt || result.text}}</div>
                </md-card-header>
              </router-link>
            </transition>
          </md-card>
          <div class="loader" :class="{'active': loading}"></div>
          <md-button v-if="!loading && max < total" @click.native="page()">Vis flere</md-button>
      </div>
      <div v-else class="row none">
          <h3>Søket ditt for: <span>{{query}}</span>, ga ingen treff. Prøv på nytt med et annet søkeord.</h3>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import InputBox from 'components/InputBox'

export default {
  name: 'page',
  data () {
    return {
      show: false,
      searchApi: require('../settings.js').searchApi,
      query: this.$route.params.query,
      results: [],
      ids: [],
      loading: true,
      perPage: 5,
      curP: 1
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 500)
    this.startSearch()
  },
  components: {
    'input-box': InputBox
  },
  computed: {
    total () {
      return this.ids.length
    },
    max () {
      return this.curP * this.perPage >= this.total ? this.total : this.curP * this.perPage
    }
  },
  watch: {
    '$route' (to, from) {
      this.query = this.$route.params.query
      this.startSearch()
    }
  },
  methods: {
    newSearch (_query) {
      window.rootRouter.push({name: 'Search', params: {query: _query}})
    },
    startSearch () {
      this.loading = true
      this.ids = []
      this.results = []
      var self = this
      setTimeout(() => {
        axios.get(this.searchApi)
        .then(function (response) {
          self.ids = response.data
          self.getResults(1)
        })
        .catch(function (error) {
          console.warn('SideMenu has error: ' + error.message || error.response.status)
          self.loading = false
        })
      }, 100)
    },
    getResults (p) {
      this.loading = true
      this.curP = p
      console.log('total %s, max %s', this.total, this.max)
      let start = (this.curP - 1) * this.perPage
      let getids = []
      for (let i = start; i < this.max; i++) {
        getids.push(this.ids[i])
      }
      console.log('Getting results for %s', getids)
      var self = this
      setTimeout(() => {
        axios.get('http://demo3388642.mockable.io/posts')
        .then(function (response) {
          self.results.push(...response.data)
          self.loading = false
        })
        .catch(function (error) {
          console.warn('SideMenu has error: ' + error.message || error.response.status)
          self.loading = false
        })
      }, 1000)
    },
    page () {
      if (!this.loading && this.max < this.total) {
        this.getResults(this.curP + 1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/mixin";
.search-page {
  .hero {
    max-width: 400px;
    margin: 0 auto;

    .search {
      input {
        opacity: 1;
        width: calc(100% - 40px);
        padding: 10px;
        font-size: 16px;
        background: #fff;
        color: #404040;
        vertical-align: top;
        height: auto;
      }
      button {
        height: 40px;
        width: 40px;
        background: $blue;
        color: #fff;
      }
    }
  }

  h3 {
    span {
        color: $red;
    }
  }

  .results {

    .md-card {
      margin: 10px;
      a {
        &:hover {
          text-decoration: none;
        }
        .md-card-header {
          text-align: left;

          .md-subhead {
            color: #080808;
          }
        }
      }
    }

    .loader {
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-image: url(../assets/loader.gif);
      height: 0px;
      width: 100%;
      display: block;
      transition: 0.5s height ease-in;

      &.active {
          height: 100px;
      }
    }
  }
}
</style>
