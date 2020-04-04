import apiHeader from '../API/api-header.js'

export default {
  getRentsList () {
    return apiHeader.get('rent')
  },
  createRent (data) {
    return apiHeader.post('rent', data)
  }
}
