/*
  eslint no-param-reassign: ["error", { "props": false }]
 */

import { SET_USER, SET_ROLE, SET_TOKEN } from '../../mutation-types'

const user = {
  state: {
    token: null,
    role: null
  },
  getters: {
    isLoggedIn: (state) => {
      let loggedIn = false
      if (state.token) {
        loggedIn = true
      }
      return loggedIn
    },
    getToken: state => state.token,
    getRole: state => state.role,
    getUser: state => state.data
  },
  mutations: {
    [SET_USER] (state, userObj) {
      state.data = userObj
    },
    [SET_ROLE] (state, role) {
      state.role = role
    },
    [SET_TOKEN] (state, token) {
      state.token = token
    }
  },
  actions: {
    logout ({ commit }) {
      commit(SET_USER, {})
      commit(SET_ROLE, null)
      commit(SET_TOKEN, null)
    },
    updateUser ({ commit }, data) {
      commit(SET_USER, data)
    }
  }
}

export { user as default }
