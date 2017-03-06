<template>
  <div class="page" v-if="node">
    <div v-if="blueBack" class="blue-back"></div>
    <div class="container">
      <md-layout md-gutter class="hero">
        <base-card :type="heroType" :data="hero"></base-card>
      </md-layout>
      <div class="pills" v-if="pill">
        <router-link v-for="link of pill.links" :to="link.url">{{link.title}}</router-link>
      </div>
      <md-layout md-gutter class="container">
        <md-layout class="content" v-if="node && node.body" md-flex-xsmall="100" md-flex-large="100">
          <div v-html="node.body"></div>
        </md-layout>
        <md-layout v-if="node && node.sections" md-flex-xsmall="100" md-flex-large="100">
          <dynamic-section :sections="node.sections"></dynamic-section>
        </md-layout>
      </md-layout>
      <div v-if="pill">
        <h3>Relaterte Artikler</h3>
        <card-section type="square" :cards="pill.siblings"></card-section>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicSection from 'components/DynamicSection'

export default {
  name: 'page',
  props: ['node'],
  data () {
    return {
      show: false
    }
  },
  components: {
    DynamicSection
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
    },
    menuData () {
      if (this.$store.state.sideMenu) {
        return JSON.parse(JSON.stringify(this.$store.state.sideMenu.data))
      }
    },
    pill () {
      if (this.node._entitytype === 'page') {
        if (this.menuData) {
          return this.searchLinks(this.menuData.links, this.node.uri)
        }
      }
    }
  },
  methods: {
    searchLinks (links, url) {
      let link = false
      if (links.forEach) {
        let siblings = []
        links.forEach(l => {
          if (l.url === url) {
            link = l
          } else {
            if (!link && l.links) {
              link = this.searchLinks(l.links, url)
              if (link) {
                return link
              }
            }
            delete l.links
            siblings.push(l)
          }
        })
        if (link && !link['siblings']) {
          link['siblings'] = siblings
        }
      }
      return link
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

    .pills {
      a {
        display: inline-block;
        color: #fff;
        background-color: $grey;
        border-radius: 40px;
        padding: 10px 20px;
        margin: 20px 10px;
        text-decoration: none;
        border: 1px solid $grey;
        transition: all 0.2s ease;

        &:hover {
          color: $title;
          background-color: #fff;
        }
      }
    }

    .content {
      padding: 20px;
    }

    .accordion {
      max-width: 900px;
    }
  }
}
</style>
