import store from '../store/index.js'
import router from '../router/index'
import apiHeader from '../API/api-header.js'

export default {
  setLogin (data) {
    return apiHeader.post('auth/login', data)
  },
  logout () {
    store.dispatch('logout')
    router.back()
  }
}
