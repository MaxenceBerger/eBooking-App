import Axios from 'axios'
import store from '../store/index.js'
import { apiBaseUrl } from './api-base-url.js'

const apiHeader = Axios.create({
  baseURL: apiBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
})
export { apiHeader as default }

apiHeader.interceptors.request.use((configParam) => {
  const user = localStorage.getItem('user')
  const token = store.getters.getToken
  const config = configParam

  if (user !== null) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})
apiHeader.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem('user')
  }
  return response
}, (error) => {
  if (error.response.data.message === 'jwt expired') {
    localStorage.removeItem('user')
  }
})
