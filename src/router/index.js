import Vue from 'vue'
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
    const user = localStorage.getItem('user')
    if (to.meta.requiresAuth && user === null) {
      next({ path: '/home' })
    } else {
      next()
    }
  })
})

export default Router
