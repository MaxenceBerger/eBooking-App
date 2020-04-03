import apiHeader from '../API/api-header.js'

export default {
  getAllRents () {
    return apiHeader.get('rent')
  },
  createRent (data) {
    return apiHeader.post('rent', data)
  }
}
