<template>
  <div id="app">
    <md-toolbar class="header">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <md-layout md-align="end">
        <button v-on:click="menuOpen = 1"><md-icon>menu</md-icon></button>
      </md-layout>
    </md-toolbar>
    <side-menu :toggleMenu="menuOpen" v-on:state="menuOpen = arguments[0]"></side-menu>
    <img src="./assets/logo.svg">
    <router-view></router-view>
    <md-layout md-gutter class="footer">
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
import SideMenu from 'components/SideMenu'

export default {
  name: 'app',
  components: {
    'side-menu': SideMenu
  },
  data () {
    return {
      menuOpen: 0
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.md-theme-default.md-toolbar.header {
  background-color: #fff;
  color: #333;
  width: 100%;
  text-align: right;
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 60px;

  a {
    padding: 10px;
    display: inline-block;
    text-decoration: none;
    color: #2c3e50;

    &.router-link-active {
      background: #2c3e50;
      color: #ddd;
    }
  }
}

.footer {
  margin-top: 60px;
  box-shadow: 0 -1px 1px #ccc;

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
