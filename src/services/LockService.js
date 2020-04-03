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
  }
}
