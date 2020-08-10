<template>
  <q-page class="column">
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="font-Raleway text-white">Déverrouiller votre porte</h5>
          </div>
          <div class="col-4">
            <q-img
              class="q-mt-lg"
              fade
              src="../assets/images/Mobile-unlock.png"
              style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ml-md q-mr-md q-mb-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Vous avez la possibilité de déverrouiller votre porte avec votre smartphone
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row justify-center">
          <q-card
              class="my-card rounded-borders q-mb-xl col-4"
              v-for="reservation in reservationList"
              :key="reservation._id"
              v-bind="reservation"
          >
            <div v-if="reservation.publication.rent.pictures[0]">
              <q-img class="rounded-borders" :src="imageUrl + reservation.publication.rent.pictures[0]" style="height: 233px; width: 350px">
                <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                  {{ reservation.rent.title }}
                </div>
                <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                  {{ reservation.rent.price }} €
                </h5>
              </q-img>
            </div>
            <div v-else>
              <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                  {{ reservation.rent.title }}
                </div>
                <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                  {{ reservation.rent.price }} €
                </h5>
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-blue-custom text-white font-Raleway">
                    L'anonnce n'a pas pu charger correctement
                  </div>
                </template>
              </q-img>
            </div>
            <q-card-actions align="right">
              <q-btn flat round color="secondary" icon="vpn_key" @click="openDoor(reservation._id)" />
              <q-btn flat round color="red" icon="lock" @click="lockDoor(reservation._id)"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>

import LockService from '../services/LockService'
import ReservationService from 'src/services/ReservationService'
// import { QSpinnerGrid } from 'quasar'

export default {
  name: 'UnlockPage',
  data: () => ({
    reservationList: null,
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
  }),
  methods: {
    openDoor (id) {
      LockService.lockOpen({
        reservation: id
      })
    },
    lockDoor (id) {
      // this.$q.loading.show({
      // spinnerColor: 'secondary',
      // backgroundColor: '#2d404e'
      // })
      this.$q.loading.show({
        message: 'First message. Gonna change it in 3 seconds...'
      })
      LockService.lockClose({
        reservation: id
      })
        .then(() => {
          this.timer = setTimeout(() => {
            this.$q.loading.show({
              // spinner: QSpinnerGrid,
              // spinnerColor: 'red',
              messageColor: 'white',
              message: '<q-icon name="warning" />',
              backgroundColor: 'secondary'
            })

            this.timer = setTimeout(() => {
              this.$q.loading.hide()
              // eslint-disable-next-line no-void
              this.timer = void 0
            }, 2000)
          }, 2000)
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    getMyOwnReservation () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.getAllReservation()
        .then(response => {
          this.$q.loading.hide()
          this.reservationList = response.data.data
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    }
  },
  mounted () {
    this.getMyOwnReservation()
  }
}
</script>
<style lang="sass" scoped>
  .text-shadow
    text-shadow: 1px 1px 6px black
  .rounded-borders
    border-radius: 15px
  .rounded-borders-title
    border-radius: 15px 0
  .bg-blue-custom
    background: rgb(45, 64, 78)
  .my-card
    width: 100%
    max-width: 350px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
