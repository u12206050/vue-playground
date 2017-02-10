import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
const Login = resolve => require(['components/login.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
