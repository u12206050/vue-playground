<template>
  <div id="app">
    <app-header></app-header>
    <side-menu name="Hovedmeny"></side-menu>
    <router-view></router-view>
    <app-footer></app-footer>
    <footer-menu :links="links" :facebook="fb_address"></footer-menu>
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
  computed: {
    footer () {
      if (this.$store.state.siteSettings) {
        return this.$store.state.siteSettings.footer || {}
      }
      return {}
    },
    links () {
      return this.footer.links || []
    },
    fb_address () {
      return this.footer.facebook_link || ''
    }
  },
  created () {
    this.$http.get(this.$store.state.api.settings)
    .then(res => {
      this.$store.registerModule('siteSettings', {
        namespaced: true,
        state: res.data
      })
    })
    .catch(error => {
      console.warn('Unable to load site settings. Site is not in functioning order')
      console.warn('Error: ' + error.message || error.response.status)
    })
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
