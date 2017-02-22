import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'pages/Hello'
import BasePage from 'pages/BasePage'
import NotFound from 'pages/NotFound'
const Login = resolve => require(['components/Login.vue'], resolve)
const Search = resolve => require(['pages/SearchPage.vue'], resolve)
const Category = resolve => require(['pages/Category.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/category/:type?',
      name: 'Category',
      component: Category
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
    },
    {
      path: '**',
      component: BasePage
    }
  ]
})
