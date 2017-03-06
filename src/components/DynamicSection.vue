<template>
  <md-layout md-gutter>
    <md-layout v-for="section of view_sections" md-flex-xsmall="100" :md-flex-large="lgsize(section)"  :md-flex-xlarge="lgsize(section)">
      <component v-bind:is="view(section)" :init="section">
      </component>
    </md-layout>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <span slot="no-more">
        <hr/>
      </span>
    </infinite-loading>
  </md-layout>
</template>

<script>
import Vue from 'vue'

Vue.component('Accordion', function (resolve) { require(['./Accordion.vue'], resolve) })
Vue.component('FactBox', function (resolve) { require(['./FactBox.vue'], resolve) })

import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'dynamic-section',
  props: ['type', 'sections'],
  data () {
    return {
      view_sections: []
    }
  },
  components: {
    InfiniteLoading
  },
  watch: {
    sections (_sections) {
      this.view_sections = []
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  methods: {
    lgsize (section) {
      return 100
    },
    view (section) {
      if (section && section._entitytype) {
        console.log('Dynamic building:', section._entitytype)
        switch (section._entitytype) {
          case 'accordion': return 'Accordion'
          case 'fact-box': return 'FactBox'
          default: console.log('No component to match entitytype', section._entitytype)
        }
      }
      return ''
    },
    onInfinite () {
      if (this.view_sections.length === this.sections.length) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      } else {
        setTimeout(() => {
          let end = this.view_sections.length + 8
          end = end > this.sections.length ? this.sections.length : end
          for (let i = this.view_sections.length; i < end; i++) {
            this.view_sections.push(this.sections[i])
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
