import Axios from 'axios'
import store from '../store/index.js'
import { apiBaseUrl } from './api-base-url.js'

const apiHeader = Axios.create({
  baseURL: apiBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
})

export { apiHeader as default }

apiHeader.interceptors.request.use((configParam) => {
  const token = store.getters.getToken
  const config = configParam
  if (store.getters.isLoggedIn) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})
