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

      <q-banner v-if="reservationList.length === 0" class="bg-grey-3 text-weight-regular text-h6 text-justify text-grey-10 font-Raleway">
        <template v-slot:avatar>
          <q-img
              src="~assets/sad.svg"
              style="width:30vw;max-width:50px;"
          />
        </template>
        Aucune porte n'est a déverrouiller
      </q-banner>
      <div class="col-12">
        <div class="row justify-center">
          <q-card
              class="my-card rounded-borders q-mt-xl col-4"
              v-for="reservation in reservationList"
              :key="reservation._id"
              v-bind="reservation"
          >
              <div v-if="reservation.publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + reservation.publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ reservation.rent.title }}
                  </div>
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
              <input v-model="isLock" id="inpLock" type="checkbox" @change="unlock(reservation._id)"/>
              <label class="btn-lock" for="inpLock">
                <svg width="36" height="40" viewBox="0 0 36 40">
                  <path class="lockb" d="M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z"></path>
                  <path class="lock" d="M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21"></path>
                  <path class="bling" d="M29 20L31 22"></path>
                  <path class="bling" d="M31.5 15H34.5"></path>
                  <path class="bling" d="M29 10L31 8"></path>
                </svg>
              </label>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>

import LockService from '../services/LockService'
import ReservationService from 'src/services/ReservationService'

export default {
  name: 'UnlockPage',
  data: () => ({
    isLock: true,
    reservationList: null,
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
  }),
  methods: {
    unlock (id) {
      if (this.isLock === true) {
        LockService.lockClose({
          reservation: id
        })
          .then(response => {
            console.log(response)
          })
          .catch(() => {
          })
      } else {
        LockService.lockOpen({
          reservation: id
        })
          .then(response => {
            console.log(response)
          })
          .catch(() => {
          })
      }
    },
    getLockStatus () {
      LockService.getKey(this.reservationList)
        .then(response => {
          console.log(response)
        })
    },
    getMyOwnReservation () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.getAllReservation()
        .then(() => {
          this.$q.loading.hide()
          this.getLockStatus()
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
.bg-image
  background-repeat: no-repeat
  background-size: cover
  background-position: center
.btn-lock
  position: absolute
  top: calc(50% - 32px)
  left: calc(50% - 32px)
  display: inline-block
  background: #2D404E
  width: 64px
  height: 64px
  box-sizing: border-box
  padding: 12px 0 0 18px
  border-radius: 50%
  cursor: pointer
  -webkit-tap-highlight-color: transparent
  svg
    fill: none
    transform: translate3d(0,0,0)
    .bling
      stroke: white
      stroke-width: 2.5
      stroke-linecap: round
      stroke-dasharray: 3
      stroke-dashoffset: 15
      transition: all .3s ease
    .lock
      stroke: white
      stroke-width: 4
      stroke-linejoin: round
      stroke-linecap: round
      stroke-dasharray: 36
      transition: all .4s ease
    .lockb
      fill: white
      fill-rule: evenodd
      clip-rule: evenodd
      transform: rotate(8deg)
      transform-origin: 14px 20px
      transition: all .2s ease

#inpLock
  display: none
  &:checked + label
    background: #4AA69A
    svg
      opacity: 1
      .bling
        animation: bling .3s linear forwards
        animation-delay: .2s
      .lock
        stroke-dasharray: 48
        animation: locked .3s linear forwards
      .lockb
        transform: rotate(0)
        transform-origin: 14px 22px
@keyframes bling
  50%
    stroke-dasharray: 3
    stroke-dashoffset: 12
  100%
    stroke-dasharray: 3
    stroke-dashoffset: 9
@keyframes locked
  50%
    transform: translateY(1px)
</style>
