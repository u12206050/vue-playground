<template>
  <div class="page">
    <div class="loader" :class="{'ready': !show}"></div>
    <div class="container" :class="{'ready': show}">
      <div class="blue-back"></div>
      <md-layout md-gutter class="hero">
        <base-card type="full" :data="hero"></base-card>
      </md-layout>
      <md-layout md-gutter class="container">
        <md-layout md-flex-xsmall="100" md-flex-large="100">
          <fact-box></fact-box>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-large="100">
          <accordion></accordion>
        </md-layout>
        <card-section v-if="page && page.sections" :cards="page.sections"></card-section>
      </md-layout>
      <div v-if="page && page.related_articles">
        <h3>Relaterte Artikler</h3>
        <card-section type="square" :cards="page.related_articles"></card-section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BaseCard from './BaseCard'
import CardSection from './CardSection'
import Accordion from './Accordion'
import FactBox from './FactBox'

export default {
  name: 'page',
  data () {
    return {
      show: false,
      uri: this.$route.params.slug,
      page: null,
      hero: null
    }
  },
  components: {
    'base-card': BaseCard,
    'card-section': CardSection,
    'accordion': Accordion,
    'fact-box': FactBox
  },
  created () {
    this.loadPage()
  },
  watch: {
    '$route' (to, from) {
      this.uri = this.$route.params.slug
      this.loadPage()
    }
  },
  methods: {
    loadPage () {
      var self = this
      self.show = false
      setTimeout(() => {
        axios.get('http://demo3388642.mockable.io/posts/' + this.uri)
        .then(function (response) {
          if (response.data) {
            self.page = response.data
            self.hero = {
              title: self.page.title,
              excerpt: ' ',
              image: self.page.image
            }
          }
          self.show = true
        })
        .catch(function (error) {
          console.warn('Loading page error: ' + error.message || error.response.status)
          self.show = true
        })
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/mixin";

.page {
  .loader {
    height: 0;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(../assets/loader.gif);
    transition: all 1s ease;

    &.ready {
      height: 450px;
    }
  }

  .container {
    .blue-back {
      opacity: 0;
      transition: opacity 1.5s ease;
    }
    &.ready {
      .blue-back {
        opacity: 1;
      }
    }
    h3 {
      text-align: center;
    }
  }
}
</style>
