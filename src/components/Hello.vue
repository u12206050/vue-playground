<template>
  <div class="hello">
    <img src="../assets/logo.svg">
    <h1>{{ msg }}</h1>
    <transition name="bounce">
      <login v-if="viewLogin"></login>
    </transition>
    <md-button v-if="!viewLogin" class="md-raised md-dense" v-on:click.native="viewLogin = true">Show Login</md-button>
  </div>
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
      viewLogin: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
