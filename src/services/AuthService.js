import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index'
import { apiUrl } from 'src/API/api-connect.js'

export function setLogin (data) {
  return axios.post(apiUrl() + 'auth/login', data)
}

export function logout () {
  store.dispatch('logout')
  router.back()
}
