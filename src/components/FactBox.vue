<template>
  <md-card class="fact-box">
    <h3>{{ title }}</h3>
    <div class="body" v-html="content"></div>
  </md-card>
</template>

<script>
export default {
  name: 'fact-box',
  props: ['init'],
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    this.loadInit()
  },
  watch: {
    'init': this.loadInit
  },
  methods: {
    loadInit () {
      if (this.init) {
        this.title = this.init.title
        this.content = this.init.content
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
@import "../assets/mixin";

.md-theme-default.md-card.fact-box {
  background: #fff;
  color: #grey;
  margin: 10px;
  padding: 0;
  text-align: left;
  width: 600px;
  max-width: 100%;

  h3 {
    background: $grey;
    color: #fff;
    margin: 0;
    padding: 10px;
  }

  .body {
    padding: 10px;
  }
}
</style>
