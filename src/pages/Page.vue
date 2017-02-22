<template>
  <div class="page" v-if="node">
    <div v-if="blueBack" class="blue-back"></div>
    <div class="container">
      <md-layout md-gutter class="hero">
        <base-card :type="heroType" :data="hero"></base-card>
      </md-layout>
      <md-layout md-gutter class="container">
        <md-layout v-if="node && node.body" md-flex-xsmall="100" md-flex-large="100">
          <div v-html="node.body"></div>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-large="100">
          <fact-box></fact-box>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-large="100">
          <accordion></accordion>
        </md-layout>
        <card-section v-if="node && node.sections" :cards="node.sections"></card-section>
      </md-layout>
      <div v-if="node && node.related_articles">
        <h3>Relaterte Artikler</h3>
        <card-section type="square" :cards="node.related_articles"></card-section>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from 'components/BaseCard'
import CardSection from 'components/CardSection'
import Accordion from 'components/Accordion'
import FactBox from 'components/FactBox'

export default {
  name: 'page',
  props: ['node'],
  data () {
    return {
      show: false
    }
  },
  components: {
    'base-card': BaseCard,
    'card-section': CardSection,
    'accordion': Accordion,
    'fact-box': FactBox
  },
  computed: {
    blueBack () {
      return this.node._entitytype === 'article'
    },
    hero () {
      return {
        title: this.node.title,
        excerpt: this.node.excerpt,
        image: this.node.image || this.node.featured_image,
        author: this.node.author
      }
    },
    heroType () {
      if (this.node._entitytype === 'blog') {
        return 'blog'
      }
      return 'full'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/mixin";

.page {
  .container {
    h3 {
      text-align: center;
    }
  }
}
</style>
