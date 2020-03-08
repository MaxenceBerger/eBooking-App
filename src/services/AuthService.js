import axios from 'axios'
import { apiUrl } from 'src/API/api-connect.js'

export function setLogin (data) {
  return axios.post(apiUrl() + 'auth/login', data)
}
