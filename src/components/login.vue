<template>
  <div class="login" v-if="state == 'login'">
    <input type="text" v-model="username" placeholder="username">
    <input type="password" v-model="password" placeholder="password">
    <button v-if="password" v-on:click="submit">Login</button>
  </div>
  <div class="checking" v-else-if="state == 'checking'">
    <h3>Checking ...</h3>
  </div>
  <div class="response" v-else-if="state == 'response'">
    <div v-if="answer">
      <h3>{{ answer.answer }}</h3>
      <img v-bind:src="answer.image">
    </div>
    <button v-on:click="state = 'login'">Retry that</button>
  </div>
  <div class="error" v-else-if="state == 'error'">
    <p>Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      state: 'login',
      answer: null
    }
  },
  /* computed: {
    pass: function () {
      return this.password.split('').reverse().join('')
    }
  }, */
  methods: {
    submit: function () {
      this.answer = null
      this.state = 'checking'
      let self = this
      axios.get('https://yesno.wtf/api')
      .then(function (response) {
        console.log(response)
        self.answer = response.data
        self.state = 'response'
      })
      .catch(function (error) {
        self.error = error.response.status
        self.state = 'error'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 1px 1px 1px #999;
}

input:active, input:focus {
  border: 1px solid #41b883;
  outline: 0;
}

.response, .error {
  color: #fff;
  padding: 10px;
}

.response {
  background: lightgreen;
}

.error {
  background: lightcoral;
}
</style>
