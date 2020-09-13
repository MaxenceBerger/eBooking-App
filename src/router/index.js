import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)
const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})
Router.beforeEach((to, from, next) => {
  to.matched.some(route => {
    if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
      next({ path: '/home' })
    } else {
      next()
    }
  })
})

export default Router
