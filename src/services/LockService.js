import apiHeader from '../API/api-header.js'

export default {
  unlockDoor () {
    return apiHeader.get('lock')
  },
  initLock (data) {
    return apiHeader.post('lock', data)
  },
  getKey () {
    return apiHeader.get('lock')
  },
  lockOpen (data) {
    return apiHeader.post('lock/open', data)
  },
  lockDelete (id) {
    return apiHeader.delete(`lock/${id}`)
  },
  getLock (id) {
    return apiHeader.get(`lock/${id}`)
  },
  lockClose (data) {
    return apiHeader.post('lock/close', data)
  }
}
