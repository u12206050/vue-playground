import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Page from 'components/Page'
const Login = resolve => require(['components/Login.vue'], resolve)
const Search = resolve => require(['components/SearchPage.vue'], resolve)

Vue.use(Router)

window.rootRouter = new Router({
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
      path: '/page/:slug',
      name: 'Page',
      component: Page
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    }
  ]
})

export default window.rootRouter
