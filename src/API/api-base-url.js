import { Platform } from 'quasar'

const BASE_URL_MOBILE = `${process.env.VUE_APP_BASE_URL_MOBILE_EBOOKING}/api/`
const BASE_URL_EMULATOR = `${process.env.VUE_APP_BASE_URL_EMULATOR_EBOOKING}/api/`
const BASE_URL_WEB = `${process.env.VUE_APP_BASE_URL_WEB_EBOOKING}/api/`

export function apiBaseUrl () {
  if (Platform.is.mobile) {
    return BASE_URL_MOBILE
  } else if (Platform.is.cordova) {
    return BASE_URL_EMULATOR
  } else {
    return BASE_URL_WEB
  }
}
