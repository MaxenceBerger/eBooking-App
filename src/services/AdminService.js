import apiHeader from '../API/api-header.js'

export default {
  getUser () {
    return apiHeader.get('admin/users')
  },
  getUserRegistLastWeek () {
    return apiHeader.get('admin/lastWeekUsers')
  },
  getReservationList () {
    return apiHeader.get('admin/reservations')
  },
  getReservationLastWeek () {
    return apiHeader.get('admin/lastWeekReservations')
  },
  updateUser (idUser, data) {
    return apiHeader.put(`admin/userEdit/${idUser}`, data)
  }
}
