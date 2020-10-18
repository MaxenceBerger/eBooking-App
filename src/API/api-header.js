import Axios from 'axios'
import { apiBaseUrl } from './api-base-url.js'
import AuthService from '../services/AuthService'

const removeUser = () => { localStorage.removeItem('user') }

const apiHeader = Axios.create({
  baseURL: apiBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
})

export { apiHeader as default }

apiHeader.interceptors.request.use((configParam) => {
  const token = AuthService.getJwt()
  const config = configParam

  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

apiHeader.interceptors.response.use((response) => {
  if (response.status === 401) {
    removeUser()
  }
  return response
}, (error) => {
  if (error.response.data.message === 'jwt expired') {
    removeUser()
  }
})
