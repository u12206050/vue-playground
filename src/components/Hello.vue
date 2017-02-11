<template>
  <transition name="slide">
    <div class="hello" v-if="show">
      <img src="../assets/logo.svg">
      <h1>{{ msg }}</h1>
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
  require(['./Login.vue'], resolve)
})

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Vue.js',
      viewLogin: false,
      show: false
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
