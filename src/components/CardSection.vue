<template>
  <md-layout md-gutter>
    <md-layout v-for="card of view_cards" md-flex-xsmall="100" :md-flex-large="lgsize(card)"  :md-flex-xlarge="lgsize(card)">
      <base-card :type="cardType(card)" :data="card"></base-card>
    </md-layout>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <span slot="no-more">
        <hr/>
      </span>
    </infinite-loading>
  </md-layout>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'card-section',
  props: ['type', 'cards'],
  data () {
    return {
      view_cards: []
    }
  },
  components: {
    InfiniteLoading
  },
  watch: {
    cards (_cards) {
      this.view_cards = []
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  methods: {
    lgsize (card) {
      if (this.type === 'preview') return 50
      if (card._entitytype && card._entitytype === 'big_card') return 100
      return 50
    },
    cardType (card) {
      if (this.type) {
        if (this.type === 'preview') return 'square'
        return this.type
      }
      if (card._entitytype && card._entitytype === 'big_card') return 'preview'
    },
    onInfinite () {
      if (this.view_cards.length === this.cards.length) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      } else {
        setTimeout(() => {
          let end = this.view_cards.length + 8
          end = end > this.cards.length ? this.cards.length : end
          for (let i = this.view_cards.length; i < end; i++) {
            this.view_cards.push(this.cards[i])
          }
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }, 500)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/mixin";

.md-layout {
  justify-content: center;
  align-items: center;
}

</style>
