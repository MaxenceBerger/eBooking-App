import apiHeader from '../API/api-header.js'

export default {
  getUser () {
    return apiHeader.get('user')
  },
  setUserUpdate () {
    return apiHeader.post('user/update')
  }
}
