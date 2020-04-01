import apiHeader from '../API/api-header.js'

export default {
  getAllPublish () {
    return apiHeader.get('publication')
  },
  getPublish (idPublication) {
    return apiHeader.get(`publication/${idPublication}`)
  }
}
