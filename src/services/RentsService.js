import apiHeader from '../API/api-header.js'

export default {
  getRentsList () {
    return apiHeader.get('rent')
  },
  createRent (data) {
    return apiHeader.post('rent', data)
  },
  getRentDetail (idRent) {
    return apiHeader.get(`rent/${idRent}`)
  },
  updateRent (idRent, data) {
    return apiHeader.put(`rent/${idRent}`, data)
  },
  deleteRent (idRent) {
    return apiHeader.delete(`rent/${idRent}`)
  }
}
