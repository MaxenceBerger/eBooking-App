<template>
  <q-page class="column bg-white">
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <q-carousel
          swipeable
          animated
          v-model="slide"
          :fullscreen.sync="fullscreen"
          thumbnails
          infinite
      >
        <q-carousel-slide
            v-for="picture in pictures"
            :key="picture._id"
            v-bind="picture"
            :name="picture"
            :img-src="imageUrl + picture" >
        </q-carousel-slide>
        <q-carousel-slide v-if="this.slide === 'no-images'" name="'no-images'" :img-src="require('src/assets/images/default-house.jpg')" />
        <template v-slot:control>
          <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
          >
            <q-btn
                unelevated rounded dense
                class="q-pl-sm q-pr-sm bg-white-opacity-50 color-blue-custom"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                :label="fullscreen ? 'Quitter le plein écran' : 'Plein écran'"
                @click="fullscreen = !fullscreen"
            ></q-btn>
          </q-carousel-control>
        </template>
      </q-carousel>

      <div class="q-pt-xl">
        <div class="q-ml-lg">
          <div class="text-h4 font-Raleway color-blue-custom">{{ publication.rent.title }}</div>
          <div class="text-subtitle2 q-mb-xl font-Raleway color-blue-custom-opacity">{{ publication.rent.city }}, {{ publication.rent.country }}</div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8">
            <q-separator />
            <div class="text-h5 q-ma-lg font-Raleway color-blue-custom">Informations</div>
            <q-item-section class="q-ma-lg">
              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="supervised_user_circle" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="font-Raleway">La capacité maximum est de {{ publication.rent.capacity }} personnes</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="aspect_ratio" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="font-Raleway">La superficie est de {{ publication.rent.area }} m²</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
            <q-separator />
            <div class="text-h5 q-ma-lg font-Raleway color-blue-custom">Description</div>
            <div class="text-weight-regular text-body2 text-justify q-ma-lg font-Raleway">{{ publication.rent.description }}</div>
            <template class="q-ma-xl">
              <MglMap
                  style="width: 365px; height: 250px; margin-left: 25px; margin-bottom: 25px; margin-top: 25px"
                  :accessToken="accessToken"
                  :mapStyle.sync="mapStyle"
                  :center="coordinates"
                  :zoom="5"
                  @load="onMapLoad"
              >
              </MglMap>
            </template>
          </div>
          <div class="col-12 col-md-4 column items-center">
            <q-form>
              <q-dialog v-model="confirmReservation" persistent>
                <q-card class="my-card">
                  <q-card-section>
                    <div class="text-h6 q-ma-sm q-mb-lg font-Raleway">Indiquez vos dates de réservations</div>
                    <q-separator />
                    <q-item-section class="q-mt-lg">
                      <q-item>
                        <div class="row">
                          <div class="col-12">
                            <q-input
                                v-model="form.startAt"
                                label="Réservation du"
                                rounded
                                outlined
                                class="font-Raleway"
                                color="secondary"
                                :rules="[val => !!val || 'Une date est requise']"
                            >
                              <template v-slot:append>
                                <q-icon color="secondary" name="event">
                                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date mask="DD/MM/YYYY"
                                            v-model="form.startAt"
                                            :locale="myLocale"
                                            class="font-Raleway"
                                            color="secondary"
                                            :options="dateArray"
                                            today-btn minimal>
                                      <div class="row items-center justify-end q-gutter-sm">
                                        <q-btn label="OK" color="secondary" class="font-Raleway" flat v-close-popup />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                          <div class="col-12">
                            <q-input
                                v-model="form.finishAt"
                                label="Au"
                                rounded
                                outlined
                                class="font-Raleway"
                                color="secondary"
                                :rules="[val => !!val || 'Une date est requise']"
                            >
                              <template v-slot:append>
                                <q-icon color="secondary" name="event">
                                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date mask="DD/MM/YYYY"
                                            v-model="form.finishAt"
                                            :locale="myLocale"
                                            class="font-Raleway"
                                            color="secondary"
                                            :options="dateArray"
                                            today-btn minimal>
                                      <div class="row items-center justify-end q-gutter-sm">
                                        <q-btn label="OK" color="secondary" flat v-close-popup />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                        </div>
                      </q-item>
                    </q-item-section>
                  </q-card-section>
                  <q-separator />
                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Quitter" color="secondary" v-close-popup />
                    <q-btn flat label="Résarvation" color="secondary" @click="payementModal =true"/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-form>
          </div>
        </div>
      </div>

      <q-dialog
          @before-show="createPaymentIntent"
          @before-hide="cancelPaymentIntent"
          v-model="payementModal"
          persistent
      >
        <q-card class="bg-blue-grey-1" style="min-width: 400px">
          <q-card-section class="bg-teal text-white">
            <div class="text-h6 font-Raleway">Paiement de votre réservation</div>
          </q-card-section>
            <div class="q-pl-xl q-pr-xl q-pt-lg font-Raleway">
              <p>Vous souhaitez réserver
                <strong> "{{publication.rent.title}}" </strong>
                du
                <strong> {{form.startAt}} </strong>
                au
                <strong>{{form.finishAt}}</strong>
                pour
                <strong> {{ publication.rent.price }} €</strong>
                la nuitée.
              </p>
            </div>
          <q-card-section>
          </q-card-section>
          <q-card-section>
            <div class="q-pl-md q-pr-md">
              <form id="payment-form">
                <div id="card-element" class="bg-white q-pa-md"><!--Stripe.js injects the Card Element--></div>
                <p id="card-error" role="alert" class="font-Raleway"></p>
                <p class="result-message hidden">
                  Le paiement a été effectué avec succès
                  <a href="" target="_blank"></a>
                </p>
                <div class="q-mt-lg q-mb-lg">
                  <button id="submit" class="btn-custom font-Raleway text-white" style="background-color: #26A69A" @click.prevent="payWithCard">
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">PAIEMENT</span>
                  </button>
                  <button  class="btn-custom q-ml-md font-Raleway text-white" style="background-color: #C10015" @click="payementModal = false">
                    <span>ANNULER</span>
                  </button>
                </div>
              </form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="paymentConfirm" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 300px">
          <q-card-section class="bg-teal text-white">
            <div class="text-h6 font-Raleway">Confirmation de paiement</div>
          </q-card-section>

          <div v-if="isPaymentSuccess">
            <q-card-section class="text-center">
              <q-icon name="check_circle_outline" class="text-positive q-mt-lg" style="font-size: 4rem;" />
              <div class="font-Raleway q-mt-lg">Le paiement a été effectué avec succès</div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" @click="paymentConfirm = false" />
            </q-card-actions>
          </div>
          <div v-else>
            <q-card-section class="text-center">
              <q-icon name="highlight_off" class="text-negative q-mt-lg" style="font-size: 4rem;" />
              <div class="font-Raleway q-mt-lg">Le paiement a été refusé</div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" @click="paymentConfirm = false" />
            </q-card-actions>
          </div>
        </q-card>
      </q-dialog>
      <q-footer elevated class="bg-white color-blue-custom">
        <div class="row justify-around q-ma-sm">
          <div class="text-subtitle1 font-Raleway">
            <strong>{{ publication.rent.price }} €</strong> / par nuit
          </div>
          <q-btn color="secondary"
                 class="font-Raleway"
                 @click="confirmReservation = true"
          >
            Reservation
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </q-footer>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <q-carousel
          swipeable
          animated
          v-model="slide"
          :fullscreen.sync="fullscreen"
          thumbnails
          infinite
      >
        <q-carousel-slide
            v-for="picture in pictures"
            :key="picture._id"
            v-bind="picture"
            :name="picture"
            :img-src="imageUrl + picture" >
        </q-carousel-slide>
        <q-carousel-slide v-if="this.slide === 'no-images'" name="'no-images'" :img-src="require('src/assets/images/default-house.jpg')" />
        <template v-slot:control>
          <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
          >
            <q-btn
                unelevated rounded dense
                class="q-pl-sm q-pr-sm bg-white-opacity-50 color-blue-custom"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                :label="fullscreen ? 'Quitter le plein écran' : 'Plein écran'"
                @click="fullscreen = !fullscreen"
            ></q-btn>
          </q-carousel-control>
        </template>
      </q-carousel>

      <div class="q-pa-xl font-Raleway">
        <div class="text-h3">{{ publication.rent.title }}</div>
        <div class="text-subtitle2 q-mb-xl">{{ publication.rent.city }}, {{ publication.rent.country }}</div>
        <div class="row">
          <div class="col-12 col-md-8">
            <q-separator />
            <div class="text-h5 q-ma-lg">Informations</div>
            <q-item-section class="q-ma-lg">
              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="supervised_user_circle" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>La capacité maximum est de {{ publication.rent.capacity }} personnes</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="aspect_ratio" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>La superficie est de {{ publication.rent.area }} m²</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
            <q-separator />
            <div class="text-h5 q-ma-lg">Description</div>
            <div class="text-weight-regular text-body2 text-justify q-ma-lg">{{ publication.rent.description }}</div>
            <template class="q-ma-xl">
              <MglMap
                  style="width: 880px; height: 500px; margin-left: 25px; margin-top: 25px"
                  :accessToken="accessToken"
                  :mapStyle.sync="mapStyle"
                  :center="coordinates"
                  :zoom="5"
                  @load="onMapLoad"
              >
              </MglMap>
            </template>
          </div>
          <div class="col-12 col-md-4 column items-center">
            <q-form @submit="openPayementModal">
            <!--<q-form @submit="reserveRent">-->
              <q-card class="my-card bg-blue-grey-1" flat bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-ma-sm q-mb-lg"> <strong>{{ publication.rent.price }} €</strong> / par nuit</div>
                  <q-separator />
                  <q-item-section class="q-mt-lg">
                    <q-item>
                      <div class="row">
                        <div class="col-12">
                          <q-input
                              v-model="form.startAt"
                              label="Réservation du"
                              rounded
                              outlined
                              bg-color="white"
                              color="secondary"
                              :rules="[val => !!val || 'Une date est requise']"
                          >
                            <template v-slot:append>
                              <q-icon color="secondary" name="event">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                  <q-date mask="DD/MM/YYYY"
                                          v-model="form.startAt"
                                          :locale="myLocale"
                                          bg-color="white"
                                          color="secondary"
                                          :options="dateArray"
                                          today-btn minimal>
                                    <div class="row items-center justify-end q-gutter-sm">
                                      <q-btn label="OK" color="secondary" flat v-close-popup />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <div class="col-12">
                          <q-input
                              v-model="form.finishAt"
                              label="Au"
                              rounded
                              outlined
                              bg-color="white"
                              color="secondary"
                              :rules="[val => !!val || 'Une date est requise']"
                          >
                            <template v-slot:append>
                              <q-icon color="secondary" name="event">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                  <q-date mask="DD/MM/YYYY"
                                          v-model="form.finishAt"
                                          :locale="myLocale"
                                          bg-color="white"
                                          color="secondary"
                                          :options="dateArray"
                                          today-btn minimal>
                                    <div class="row items-center justify-end q-gutter-sm">
                                      <q-btn label="OK" color="secondary" flat v-close-popup />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </q-item>
                  </q-item-section>
                </q-card-section>
                <q-separator />
                <q-card-actions vertical>
                  <q-btn color="secondary"
                         type="submit">
                    Reservation
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-form>
            <q-dialog
                @before-show="createPaymentIntent"
                @before-hide="cancelPaymentIntent"
                v-model="payementModal"
                persistent
            >
              <q-card class="bg-blue-grey-1" style="min-width: 700px">
                <q-card-section class="bg-teal text-white">
                  <div class="text-h6 font-Raleway">Paiement de votre réservation</div>
                </q-card-section>
                <q-card-section>
                  <template>
                    <div class="q-pl-md q-pr-md q-pt-md">
                      <q-table
                          class="font-Raleway"
                          flat
                          :data="data"
                          :columns="columns"
                          row-key="name"
                          hide-bottom
                      />
                    </div>
                  </template>
                </q-card-section>
                <q-card-section>
                  <div class="q-pl-md q-pr-md">
                    <form id="payment-form">
                      <div id="card-element" class="bg-white q-pa-md"><!--Stripe.js injects the Card Element--></div>
                      <p id="card-error" role="alert" class="font-Raleway"></p>
                      <p class="result-message hidden">
                        Le paiement a été effectué avec succès
                        <a href="" target="_blank"></a>
                      </p>
                      <div class="q-mt-lg q-mb-lg">
                        <button id="submit" class="btn-custom font-Raleway text-white" style="background-color: #26A69A" @click.prevent="payWithCard">
                          <div class="spinner hidden" id="spinner"></div>
                          <span id="button-text">PAIEMENT</span>
                        </button>
                        <button  class="btn-custom q-ml-md font-Raleway text-white" style="background-color: #C10015" @click="payementModal = false">
                          <span>ANNULER</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
            <q-dialog v-model="paymentConfirm" persistent transition-show="scale" transition-hide="scale">
              <q-card style="width: 300px">
                <q-card-section class="bg-teal text-white">
                  <div class="text-h6 font-Raleway">Confirmation de paiement</div>
                </q-card-section>

                <div v-if="isPaymentSuccess">
                  <q-card-section class="text-center">
                    <q-icon name="check_circle_outline" class="text-positive q-mt-lg" style="font-size: 4rem;" />
                    <div class="font-Raleway q-mt-lg">Le paiement a été effectué avec succès</div>
                  </q-card-section>
                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" @click="paymentConfirm = false" />
                  </q-card-actions>
                </div>
                <div v-else>
                  <q-card-section class="text-center">
                    <q-icon name="highlight_off" class="text-negative q-mt-lg" style="font-size: 4rem;" />
                    <div class="font-Raleway q-mt-lg">Le paiement a été refusé</div>
                  </q-card-section>
                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" @click="paymentConfirm = false" />
                  </q-card-actions>
                </div>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>
<script>
import moment from 'moment'
import PublicationsService from '../../services/PublicationsService'
import ReservationService from '../../services/ReservationService'
import MapsService from 'src/services/MapsService'
import Mapbox from 'mapbox-gl'
import { MglMap } from 'vue-mapbox'

import StripeService from 'src/services/StripeService'

const STATUS_CODE_401 = 401
// eslint-disable-next-line no-undef
const stripe = Stripe(process.env.VUE_APP_PUBLIC_KEY_STRIPE)

var orderComplete = function (paymentIntentId) {
  loading(false)
  document
    .querySelector('.result-message a')
    .setAttribute(
      'href',
      'https://dashboard.stripe.com/test/payments/' + paymentIntentId
    )
  document.querySelector('.result-message').classList.remove('hidden')
  document.querySelector('button').disabled = true
}
var showError = function (errorMsgText) {
  loading(false)
  var errorMsg = document.querySelector('#card-error')
  errorMsg.textContent = errorMsgText
  setTimeout(function () {
    errorMsg.textContent = ''
  }, 4000)
}
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('button').disabled = true
    document.querySelector('#spinner').classList.remove('hidden')
    document.querySelector('#button-text').classList.add('hidden')
  } else {
    document.querySelector('button').disabled = false
    document.querySelector('#spinner').classList.add('hidden')
    document.querySelector('#button-text').classList.remove('hidden')
  }
}

export default {
  name: 'PublicationDetail',
  components: {
    MglMap
  },
  data: () => ({
    // STRIPE
    totalDay: null,
    totalToPay: null,
    loading: false,
    publishableKey: process.env.VUE_APP_PUBLIC_KEY_STRIPE,
    token: null,
    charge: null,
    payementModal: false,
    paymentConfirm: false,
    isPaymentSuccess: null,
    columns: [
      { name: 'title', align: 'center', label: 'Nom de la location', field: 'title', sortable: false },
      { name: 'startAt', align: 'center', label: 'Début de séjour', field: 'startAt', sortable: false },
      { name: 'finishAt', align: 'center', label: 'Fin de séjour', field: 'finishAt', sortable: false },
      { name: 'totalDay', align: 'center', label: 'Nuitée(s)', field: 'totalDay', sortable: false },
      { name: 'totalToPay', align: 'center', label: 'Prix total', field: 'totalToPay', sortable: false }
    ],
    data: [
      {
        title: null,
        startAt: null,
        finishAt: null,
        totalDay: null,
        totalToPay: null,
        card: null,
        data: null
      }
    ],
    // MAP
    accessToken: process.env.VUE_APP_TOKEN_MAP_BOX,
    mapStyle: process.env.VUE_APP_MAP_STYLE_MAP_BOX,
    postalCodeAndCity: null,
    coordinates: {
      lng: 2.2096669,
      lat: 46.2321929
    },
    geoJsonLayer: {
      type: 'geojson',
      data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
    },
    slide: 1,
    fullscreen: false,
    confirmReservation: false,
    publication: {
      rent: {}
    },
    form: {
      idPublication: '',
      startAt: '',
      finishAt: ''

    },
    idPublication: '',
    dialog: false,
    today_date: '',
    dateArray: [],
    myLocale: {
      days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
      daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
      months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
      monthsShort: 'Janv_Fév_Mars_Avr_Mais_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split('_'),
      firstDayOfWeek: 1
    },
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED,
    countReservation: null
  }),
  methods: {
    createPaymentIntent: function () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      this.confirmReservation = false
      const ref = this
      StripeService.paymentIntent({
        source: this.source,
        idPublication: this.form.idPublication,
        startAt: moment.utc(this.form.startAt, 'DD/MM/YYYY').format(),
        finishAt: moment.utc(this.form.finishAt, 'DD/MM/YYYY').format()
      })
        .then((data) => {
          ref.data = data
          document.querySelector('button').disabled = true
          const elements = stripe.elements()
          const style = {
            base: {
              color: '#32325d',
              fontFamily: 'Arial, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#32325d'
              }
            },
            invalid: {
              fontFamily: 'Arial, sans-serif',
              color: '#fa755a',
              iconColor: '#fa755a'
            }
          }
          ref.card = elements.create('card', { style: style })
          // Stripe injects an iframe into the DOM
          ref.card.mount('#card-element')
          ref.card.on('change', function (event) {
            // Disable the Pay button if there are no card details in the Element
            document.querySelector('button').disabled = event.empty
            document.querySelector('#card-error').textContent = event.error ? event.error.message : ''
          })
          this.$q.loading.hide()
        })
    },
    cancelPaymentIntent () {
      this.card = null
    },
    payWithCard () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      loading(true)
      const card = this.card
      const clientSecret = this.data.data.clientSecret

      stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card
        }
      }).then((result) => {
        if (result.error) {
          this.payementModal = false
          this.isPaymentSuccess = false
          this.paymentConfirm = true
          showError(result.error.message)
          this.$q.loading.hide()
        } else {
          this.confirm(result.paymentIntent.id)
        }
      })
    },
    confirm (paymentIntent) {
      this.$q.loading.hide()
      StripeService.sendClientSecret({
        paymentIntent: paymentIntent
      })
        .then((result) => {
          if (result.error) {
            this.payementModal = false
            this.isPaymentSuccess = false
            this.paymentConfirm = true
            console.log('payment error')
            showError(result.error.message)
          } else {
            this.payementModal = false
            this.isPaymentSuccess = true
            this.paymentConfirm = true
            orderComplete(paymentIntent)
          }
        })
    },
    openPayementModal () {
      const oneDay = 24 * 60 * 60 * 1000
      const startAtFormat = moment(this.form.startAt, 'DD/MM/YYYY').format()
      const startAt = new Date(startAtFormat)
      const finishAtFormat = moment(this.form.finishAt, 'DD/MM/YYYY').format()
      const finishAt = new Date(finishAtFormat)
      this.totalDay = Math.round(Math.abs((startAt - finishAt) / oneDay))
      this.totalToPay = `${this.totalDay * this.publication.rent.price} €`
      this.amount = this.totalDay * this.publication.rent.price
      this.data[0].title = this.publication.rent.title
      this.data[0].startAt = this.form.startAt
      this.data[0].finishAt = this.form.finishAt
      this.data[0].totalDay = this.totalDay
      this.data[0].totalToPay = this.totalToPay
      this.payementModal = true
    },
    getPublication () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      PublicationsService.getPublish(this.$route.params.idPublication)
        .then(response => {
          const ReservationDateArray = []
          for (let i = 0; i < response.data.data.rent.reservations.length; i += 1) {
            let ReservationStartAt = moment(response.data.data.rent.reservations[i].from)
            const ReservationEndAt = moment(response.data.data.rent.reservations[i].to)
            while (ReservationStartAt <= ReservationEndAt) {
              ReservationDateArray.push(moment(ReservationStartAt).format('YYYY/MM/DD'))
              ReservationStartAt = moment(ReservationStartAt).add(1, 'days')
            }
          }
          const RentDateArray = []
          let RentStartAt = moment(response.data.data.start_at)
          const RentEndAt = moment(response.data.data.end_at)
          while (RentStartAt <= RentEndAt) {
            RentDateArray.push(moment(RentStartAt).format('YYYY/MM/DD'))
            RentStartAt = moment(RentStartAt).add(1, 'days')
          }
          function arrayDiff (RentDateArray, ReservationDateArray) {
            return [
              ...RentDateArray.filter(x => !ReservationDateArray.includes(x)),
              ...ReservationDateArray.filter(x => !RentDateArray.includes(x))
            ]
          }
          this.dateArray = arrayDiff(RentDateArray, ReservationDateArray)
          this.publication = response.data.data
          this.publication.rent.city = response.data.data.rent.city.charAt(0).toUpperCase() + response.data.data.rent.city.substring(1).toLowerCase()
          this.publication.start_at = moment(response.data.data.start_at).format('YYYY/MM/DD')
          this.publication.end_at = moment(response.data.data.end_at).format('YYYY/MM/DD')
          this.today_date = moment().format('YYYY/MM/DD')
          this.form.idPublication = response.data.data._id
          this.pictures = response.data.data.rent.pictures
          this.postalCodeAndCity = `${response.data.data.rent.postalCode.toLowerCase()}+${response.data.data.rent.city.toLowerCase()}+${response.data.data.rent.country.toLowerCase()}`
          this.getLongLatBycity()
          if (response.data.data.rent.pictures[0].length >= 1) {
            this.slide = response.data.data.rent.pictures[0]
          } else {
            this.slide = 'no-images'
          }
          this.$q.loading.hide()
        }).catch(() => {
          this.$q.loading.hide()
        })
    },
    getLongLatBycity () {
      MapsService.getLongLatBycity(this.postalCodeAndCity)
        .then(response => {
          this.coordinates.lng = response.data.features[0].center[0]
          this.coordinates.lat = response.data.features[0].center[1]
          this.mapbox = Mapbox
        })
        .catch(() => {
        })
    },
    async onMapLoad (event) {
      const asyncActions = event.component.actions
      await asyncActions.flyTo({
        center: this.coordinates,
        zoom: 12,
        speed: 1
      })
    },
    reserveRent () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.setReservation({
        publication: this.form.idPublication,
        start_at: moment(this.form.startAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        end_at: moment(this.form.finishAt, 'DD/MM/YYYY').format('YYYY-MM-DD')
      }).then(() => {
        this.$q.loading.hide()
        this.$q.notify({
          type: 'positive',
          message: 'Votre réservation a bien été enregistré',
          position: 'top'
        })
        this.confirmReservation = false
        this.getPublication()
      }).catch((error) => {
        this.$q.loading.hide()
        if (STATUS_CODE_401 === error.response.status) {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Oups, il semble que cette publication soit déjà reservé',
            icon: 'report_problem',
            position: 'top'
          })
        } else {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Oups, il semble que nous rencontrons des problèmes sur votre réservation',
            icon: 'report_problem',
            position: 'top'
          })
        }
      })
    }
  },
  created () {
    this.getPublication()
    this.map = null
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.bg-white-opacity-50
  background-color: rgba(255, 255, 255, 0.50)
.color-blue-custom
  color: rgb(45, 64, 78)
.color-blue-custom-opacity
  color: rgba(45, 64, 78, 0.5)
.font-Raleway
  font-family: 'Raleway', sans-serif
.font-Roboto
  font-family: 'Roboto', sans-serif
.fullscreen
  .q-carousel__slide
    background-size: contain
    background-repeat: no-repeat
    background-color: rgba(45, 64, 78, 1)
.btn-custom
  border: none
  border-radius: 5px
  padding: 5px 10px
</style>
