import apiHeader from '../API/api-header.js'

export default {
  getAllRents () {
    return apiHeader.get('rent')
  },
  setRent () {
  //  return apiHeader.post('rent')
    console.log('ÇA MARCHE !!!')
  }
}
