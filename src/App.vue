<template>
  <div id="app">
    <app-header></app-header>
    <side-menu></side-menu>
    <router-view></router-view>
    <app-footer></app-footer>
    <footer-menu :links="links" facebook="https://www.facebook.com/"></footer-menu>
  </div>
</template>

<script>
import Header from 'components/Header'
import SideMenu from 'components/SideMenu'
import Footer from 'components/Footer'
import FooterMenu from 'components/FooterMenu'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'side-menu': SideMenu,
    'app-footer': Footer,
    'footer-menu': FooterMenu
  },
  data () {
    return {
      links: [
        {
          url: '/',
          title: 'Home',
          external: false
        },
        {
          url: '/login',
          title: 'Login',
          external: false
        },
        {
          url: '/page/article',
          title: 'Article Template',
          external: false
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "./assets/mixin";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: $offwhite;
}
</style>
