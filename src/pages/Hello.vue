<template>
  <transition name="slide">
    <div class="hello" v-if="show">
      <img src="../assets/logo.svg">
      <h1>{{ msg }}</h1>
      <router-link tag="button" to="/page/article" class="md-button md-raised">Article Example <md-ink-ripple /></router-link><br/>
      <router-link tag="button" to="/page/blog" class="md-button md-raised">Blog Example <md-ink-ripple /></router-link><br/>
      <transition name="bounce">
        <login v-if="viewLogin"></login>
      </transition>
      <md-button v-if="!viewLogin" class="md-raised md-dense" v-on:click.native="viewLogin = true">Show Login</md-button>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

Vue.component('login', function (resolve) {
  require(['../components/Login.vue'], resolve)
})

export default {
  name: 'hello',
  data () {
    return {
      viewLogin: false,
      show: false
    }
  },
  computed: {
    msg () {
      return this.$store.state.sideMenu && this.$store.state.sideMenu.open ? 'Menu Opened' : 'Welcome'
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 50)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
