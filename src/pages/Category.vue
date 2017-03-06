<template>
  <transition name="fade">
    <div v-show="show" class="category-page container">
      <router-link tag="button" to="/category/posts" class="md-button md-raised md-primary">Posts</router-link>
      <router-link tag="button" to="/category/pages" class="md-button md-raised md-primary">Pages</router-link>
      <div v-if="loading || total" class="row">
          <h2>Ser alle <span>{{ title }}</span></h2>
          <card-section v-if="results" :cards="results"></card-section>
          <div class="loader" :class="{'active': loading}"></div>
      </div>
      <div v-else class="row none">
          <h3>{{ emptyMsg }}</h3>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      show: false,
      loading: false,
      category: '',
      results: []
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 10)
    this.category = this.$route.params.type
    this.load()
  },
  computed: {
    baseApi () {
      return this.$store.state.api.backend
    },
    total () {
      return this.results.length
    },
    title () {
      return (this.category + '').replace(/\b\w/g, l => l.toUpperCase())
    },
    emptyMsg () {
      if (this.category) return 'Fant ingenting for denne kategorien'
      return 'Velge et kategori'
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from)
      this.category = to.params.type
      this.load()
    }
  },
  methods: {
    load () {
      self.results = []
      if (this.category) {
        this.loading = true
        this.$http.get(this.baseApi + '/' + this.category)
        .then(response => {
          this.results = response.data
          this.loading = false
        })
        .catch(error => {
          console.warn('Posts error: ' + error.message || error.response.status)
          this.loading = false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/mixin";
.category-page {

  h3 {
    span {
        color: $red;
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
</style>
