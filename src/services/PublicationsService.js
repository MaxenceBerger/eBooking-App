import apiHeader from '../API/api-header.js'

export default {
  getAllPublish () {
    return apiHeader.get('publication')
  },
  publishProperty (data) {
    return apiHeader.post('publication', data)
  },
  getPublish (idPublication) {
    return apiHeader.get(`publication/${idPublication}`)
  },
  deletePublish (idPublication) {
    return apiHeader.delete(`publication/${idPublication}`)
  }
}
