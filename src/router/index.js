import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Page from 'components/Page'
import NotFound from 'components/NotFound'
const Login = resolve => require(['components/Login.vue'], resolve)
const Search = resolve => require(['components/SearchPage.vue'], resolve)

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
      path: '/page/:slug',
      name: 'Page',
      component: Page
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
