/*
  eslint no-param-reassign: ["error", { "props": false }]
 */

import { SET_USER, SET_ROLE, SET_TOKEN, SET_EMAIL } from '../../mutation-types'

const user = {
  state: {
    token: null,
    email: null,
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
    getEmail: state => state.email,
    getRole: state => state.role,
    getUser: state => state.data
  },
  mutations: {
    [SET_USER] (state, userObj) {
      state.data = userObj
    },
    [SET_EMAIL] (state, email) {
      state.email = email
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
      commit(SET_EMAIL, null)
      commit(SET_TOKEN, null)
    },
    updateUser ({ commit }, data) {
      commit(SET_USER, data)
    }
  }
}

export { user as default }
