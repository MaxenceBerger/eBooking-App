import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import user from './modules/authModule'

// import example from './modules'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'user',
  storage: localStorage
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    user: user
  },
  plugins: [
    vuexPersist.plugin
  ],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
