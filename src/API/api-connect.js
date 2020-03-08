import axios from 'axios'
const BASE_URL = `${process.env.VUE_APP_BASE_URL_EBOOKING}/api/`

export function apiConnect () {
  return axios.get(`${BASE_URL}publication`)
}
