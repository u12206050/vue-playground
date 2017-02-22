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
          <md-button v-if="!loading && tail < total" @click.native="page()">Vis flere</md-button>
      </div>
      <div v-else class="row none">
          <h3>Søket ditt for: <span>{{query}}</span>, ga ingen treff. Prøv på nytt med et annet søkeord.</h3>
      </div>
    </div>
  </transition>
</template>

<script>
import InputBox from 'components/InputBox'

export default {
  name: 'search-page',
  data () {
    return {
      show: false,
      query: '',
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
    }, 10)
    this.query = this.$route.params.query
    this.startSearch()
  },
  components: {
    'input-box': InputBox
  },
  watch: {
    '$route' (to, from) {
      this.query = this.$route.params.query
      this.startSearch()
    }
  },
  computed: {
    postApi () {
      return this.$store.state.api.posts
    },
    searchApi () {
      return this.$store.state.api.query
    },
    total () {
      return this.ids.length
    },
    offset () {
      return (this.curP - 1) * this.perPage
    },
    tail () {
      return this.curP * this.perPage >= this.total ? this.total : this.curP * this.perPage
    }
  },
  methods: {
    newSearch (_query) {
      this.$router.push({name: 'Search', params: {query: _query}})
    },
    startSearch () {
      if (this.query) {
        this.loading = true
        this.ids = []
        this.results = []
        this.$http.get(this.searchApi + '/' + this.query)
        .then(res => {
          this.ids = res.data
          this.getResults(1)
        })
        .catch(error => {
          console.warn('SearchPage has error: ' + error.message || error.response.status)
          this.loading = false
        })
      }
    },
    getResults (p) {
      this.loading = true
      this.curP = p
      let getids = []
      for (let i = this.offset; i < this.tail; i++) {
        getids.push(this.ids[i])
      }
      this.$http.get(this.postApi + '/' + getids.join(','))
      .then(res => {
        var list = []
        Object.keys(res.data).forEach(e => {
          if (res.data.hasOwnProperty(e)) {
            list.push(res.data[e])
          }
        })

        this.results.push(...list)
        this.loading = false
      })
      .catch(error => {
        console.warn('SearchPage has error: ' + error.message || error.response.status)
        this.loading = false
      })
    },
    page (pageNum) {
      if (!this.loading && this.tail < this.total) {
        this.getResults(pageNum || this.curP + 1)
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
