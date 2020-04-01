import apiHeader from '../API/api-header.js'

export default {
  getUser () {
    return apiHeader.get('user')
  },
  setUserUpdate (data) {
    return apiHeader.put('user/update', data)
  },
  updatePassword (data) {
    return apiHeader.put('user/updatePassword', data)
  }
}
