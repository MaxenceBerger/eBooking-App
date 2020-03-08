import axios from 'axios'
import { apiUrl } from 'src/API/api-connect.js'

export function getAllPublish () {
  return axios.get(apiUrl() + 'publication')
}
