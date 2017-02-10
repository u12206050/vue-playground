<template>
  <div class="footer">
    <md-layout md-gutter class="container">
      <md-layout md-flex-xsmall="100" md-flex-small="50">
        <h2>Essential Links</h2>
        <ul>
          <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
          <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
          <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
          <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
          <br>
          <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
        </ul>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="50">
        <h2>Ecosystem</h2>
        <ul>
          <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
          <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
          <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
          <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

.footer {
  width: 100%;
  position: relative;
  z-index: 3;
  display: block;
  background-color: $grey;
  color: #fff;
  margin-top: 60px;
  padding: 40px 100px;

  .container {
      max-width: 1200px;
      margin: 0 auto;
  }

  h1, h2 {
    font-weight: normal;
    width: 100%;
    text-align: center;
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
}
</style>
