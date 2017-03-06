<template>
  <div class="search-page container">
    <md-card class="hero">
        <input-box placeholder="Filtrere" icon="search" v-on:onChange="filter"></input-box>
    </md-card >
    <div class="row results">
        <h3 v-if="keyword">Filtrering på: <span>{{keyword}}</span></h3>
        <card-section :cards="filtered" type="square"></card-section>
        <div class="loader" :class="{'active': !allYrker.length}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'yrker-page',
  data () {
    return {
      keyword: '',
      results: []
    }
  },
  computed: {
    yrkerApi () {
      return this.$store.state.api.api_url + '/nsr/yrker'
    },
    allYrker () {
      if (this.$store.state.yrker) {
        return this.$store.state.yrker.data || []
      } return []
    },
    filtered () {
      let q = this.keyword.toLowerCase()
      if (!q) return this.allYrker
      return this.allYrker.filter(item => {
        return item.title.toLowerCase().indexOf(q) > -1
      })
    }
  },
  created () {
    if (!this.$store.state.yrker) {
      this.$store.registerModule('yrker', {
        namespaced: true,
        state: {
          data: null
        },
        mutations: {
          loadData (state, data) {
            if (data) {
              state.data = data.sort((a, b) => {
                return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
              })
            }
          }
        }
      })
      this.$http.get(this.yrkerApi)
      .then(res => {
        this.$store.commit('yrker/loadData', res.data)
      })
      .catch(error => {
        console.warn('Loading yrker data has error: ' + error.message || error.response.status)
      })
    }
  },
  methods: {
    filter (val) {
      this.keyword = val
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
