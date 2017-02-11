<template>
  <md-layout md-gutter>
    <md-layout v-for="card of cards" md-flex-xsmall="100" :md-flex-large="lgsize(card)">
      <base-card :type="cardType(card)" :data="card"></base-card>
    </md-layout>
  </md-layout>
</template>

<script>
import BaseCard from './BaseCard'

export default {
  name: 'section',
  props: ['type', 'cards'],
  data () {
    return {
    }
  },
  components: {
    'base-card': BaseCard
  },
  methods: {
    lgsize (card) {
      if (this.type === 'square') return 50
      if (card._entitytype && card._entitytype === 'big_card') return 100
      return 50
    },
    cardType (card) {
      if (this.type) return this.type
      if (card._entitytype && card._entitytype === 'big_card') return 'square'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/mixin";

.md-layout {
  justify-content: center;
}

</style>
