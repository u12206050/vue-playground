<template>
  <div class="page" v-if="node">
    <div v-if="blueBack" class="blue-back"></div>
    <div class="container">
      <md-layout md-gutter md-column-small md-row-large class="hero">
        <md-layout v-if="heroblock" md-flex-small="100"><base-card type="hero" :data="heroblock"></base-card></md-layout>
        <md-layout md-flex-large="33" v-if="ctablock"><cta-card :data="ctablock"></cta-card></md-layout>
      </md-layout>
      <md-layout md-gutter class="container">
        <card-section v-if="mainblocks" :cards="mainblocks" type="square"></card-section>
      </md-layout>
    </div>
  </div>
</template>

<script>
import BaseCard from 'components/BaseCard'
import CTACard from 'components/CTACard'
import CardSection from 'components/CardSection'
import Accordion from 'components/Accordion'
import FactBox from 'components/FactBox'

export default {
  name: 'landing-page',
  props: ['node'],
  data () {
    return {
      show: false,
      heroblock: null,
      ctablock: null,
      mainblocks: null
    }
  },
  created () {
    this.loadPage()
  },
  watch: {
    node: 'loadPage'
  },
  components: {
    'base-card': BaseCard,
    'cta-card': CTACard,
    'card-section': CardSection,
    'accordion': Accordion,
    'fact-box': FactBox
  },
  computed: {
    blueBack () {
      return this.node._entitytype === 'article'
    },
    heroType () {
      if (this.node._entitytype === 'blog') {
        return 'blog'
      }
      return 'full'
    }
  },
  methods: {
    loadPage () {
      this.heroblock = null
      this.ctablock = null
      if (this.node.hero_section) {
        this.node.hero_section.forEach(b => {
          switch (b._entitytype) {
            case 'hero_card':
              this.heroblock = b
              break
            case 'call_to_action_card':
              this.ctablock = b
              break
          }
        })
      }
      this.mainblocks = []
      this.node.content_section.forEach(b => {
        let def = {}
        if (b.related_object) {
          def = {
            title: b.related_object.title,
            excerpt: b.related_object.excerpt,
            image: b.related_object.featured_image
          }
        }
        this.mainblocks.push({
          _entitytype: b._entitytype,
          title: b.title || def.title,
          excerpt: b.excerpt || def.excerpt,
          image: b.image || def.image
        })
      })
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

    .hero {
      position: relative;
      padding: 0 5px;

      @media all and (max-width:960px) {
        > div {
          width: 100%;
          flex: none;
        }
      }
    }
  }
}
</style>
