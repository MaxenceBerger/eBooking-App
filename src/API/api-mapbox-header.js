import Axios from 'axios'
import { apiMapBoxBaseUrl } from './api-mapbox-base-url.js'

const apiMapBoxHeader = Axios.create({
  baseURL: apiMapBoxBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
})
export { apiMapBoxHeader as default }
