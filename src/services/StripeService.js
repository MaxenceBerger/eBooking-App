import apiHeader from '../API/api-header.js'

export default {
  paymentIntent (data) {
    return apiHeader.post('stripe/create-payment-intent', data)
  },
  sendClientSecret (data) {
    return apiHeader.post('stripe/check-payment-status', data)
  }
}
