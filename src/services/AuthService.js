import store from '../store/index.js'
import router from '../router/index'
import apiHeader from '../API/api-header.js'

export default {
  setLogin (data) {
    return apiHeader.post('auth/login', data)
  },
  setRegister (data) {
    return apiHeader.post('auth/register?=', data)
  },
  confirmRegister (data) {
    return apiHeader.post('auth/verify-otp', data)
  },
  resendConfirmRegister (data) {
    return apiHeader.post('auth/resend-verify-otp', data)
  },
  logout () {
    store.dispatch('logout')
    router.back()
  }
}
