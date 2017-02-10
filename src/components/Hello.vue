<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button v-if="!viewLogin" v-on:click="viewLogin = true">Show Login</button>
    <!--login v-if="viewLogin"></login-->
  </div>
</template>

<script>
// import Vue from 'vue'

// Vue.component('login', function (resolve) {
//   require(['./login.vue'], resolve)
// })

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
