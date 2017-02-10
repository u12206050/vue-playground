import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import CardSection from 'components/CardSection'
const Login = resolve => require(['components/Login.vue'], resolve)

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
    },
    {
      path: '/section',
      name: 'Section',
      component: CardSection
    }
  ]
})
