import apiHeader from '../API/api-header.js'

export default {
  unlockDoor () {
    return apiHeader.get('lock')
  }
}
