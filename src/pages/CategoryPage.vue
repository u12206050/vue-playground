<template>
<div class="body">
  <div class="container">
    <h2 v-if="byline" v-html="byline" class="byline"></h2>
    <div class="row main">
      <card-section :cards="cards" type="preview"></card-section>
      <div class="loader" v-bind:class="{'active': loading}"></div>
      <button class="m-btn" v-if="!loading && tail < total" @click="page(curP+1)">Last ned flere {{tail}}/{{total}}</button>

    </div>
  </div>
</div>
</template>

<script>
import CardSection from 'components/CardSection'

export default {
  name: 'category-page',
  props: ['node'],
  data () {
    return {
      query: '',
      cards: [],
      ids: [],
      byline: false,
      loading: true,
      perPage: 5,
      curP: 1
    }
  },
  created () {
    this.loadNode()
  },
  components: {
    'card-section': CardSection
  },
  watch: {
    node: 'loadNode'
  },
  computed: {
    postApi () {
      return this.$store.state.api.posts
    },
    total () {
      return this.node ? this.node.count : 0
    },
    offset () {
      return (this.curP - 1) * this.perPage
    },
    tail () {
      return this.curP * this.perPage >= this.total ? this.total : this.curP * this.perPage
    }
  },
  methods: {
    loadNode () {
      if (this.node) {
        this.byline = this.node.term_byline || false
        this.ids = this.node.children || []
        this.page(1)
      }
    },
    page (p) {
      this.loading = true
      this.curP = p
      let getids = []
      for (let i = this.offset; i < this.tail; i++) {
        getids.push(this.ids[i])
      }
      this.$http.get(this.postApi + '/' + this.ids.join(','))
      .then(res => {
        this.cards = res.data
      })
      .catch(error => {
        console.warn('CategoryPage has error: ' + error.message || error.response.status)
      })
    }
  }
}
</script>
