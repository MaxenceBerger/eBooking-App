import apiHeader from '../API/api-header.js'

export default {
  getAllReservation () {
    return apiHeader.get('reservation')
  },
  setReservation (data) {
    return apiHeader.post('reservation', data)
  },
  getReservation (idReservation) {
    return apiHeader.get(`reservation/${idReservation}`)
  },
  deleteReservation (idReservation) {
    return apiHeader.delete(`reservation/${idReservation}`)
  }
}
