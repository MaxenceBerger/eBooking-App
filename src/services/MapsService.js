import apiHeaderMapBox from '../API/api-mapbox-header'

export default {
  getLongLatByAddress (fullAddress) {
    return apiHeaderMapBox.get(`mapbox.places/${fullAddress}.json?types=address&access_token=${process.env.VUE_APP_TOKEN_MAP_BOX}`)
  },
  getLongLatBycity (postalCodeAndCity) {
    return apiHeaderMapBox.get(`mapbox.places/${postalCodeAndCity}.json?country=FR&access_token=${process.env.VUE_APP_TOKEN_MAP_BOX}`)
  }
}
