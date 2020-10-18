import store from '../store/index.js'
import router from '../router/index'
import apiHeader from '../API/api-header.js'

function getJwt () {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = document.cookie.split(';')

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=')

    if (cookiePair[0].trim() === 'jwt') {
      // Decode the cookie value and return
      const jwt = decodeURIComponent(cookiePair[1])

      return jwt
    }
  }

  return null
}

export default {
  setLogin (data) {
    return apiHeader.post('auth/login', data, { withCredentials: true })
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
  resetPassword (data) {
    return apiHeader.post('user/resetPassword', data)
  },
  logout () {
    store.dispatch('logout')
    router.back()
  },
  getJwt
}
