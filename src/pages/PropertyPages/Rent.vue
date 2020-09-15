<template>
  <q-page class="column">
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="items-end font-Raleway text-white">Mes Réservations</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Reservation.png"
                style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ml-md q-mr-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Retrouvez toutes vos réservations en un clic
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
        Aucune réservation a été effectué
      </q-banner>
      <div class="col-12 q-mt-xl">
        <div class="row justify-center">
          <q-card
            class="my-card rounded-borders q-mb-xl col-4"
            v-for="reservation in reservationList.slice(startLimit, endLimit)"
            :key="reservation._id"
            v-bind="reservation"
          >
            <router-link :to="{ path: '/reservation/'+reservation._id }">
              <div v-if="reservation.publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + reservation.publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ reservation.rent.title }}
                  </div>
                  <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ reservation.rent.fullPrice }} €
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
            </router-link>
          </q-card>
        </div>
        <div v-if="reservationLength !== 0" class="row q-pa-lg flex-center flex">
          <q-pagination
              v-model="current"
              color="secondary"
              :max="pages"
              :direction-links="true"
              @click="getPagination"
          />
        </div>
      </div>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom" style="height: 400px;">
        <div class="row q-ma-xl">
          <div class="col-9">
            <h3 class="items-end font-Raleway text-white">Mes Réservations</h3>
            <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
              Retrouvez toutes vos réservations en un clic
            </div>
          </div>
          <div class="col-3">
            <q-img
              fade
              src="../../assets/images/Reservation.png"
              style="max-width: 90%;"/>
          </div>
        </div>
      </div>
      <q-banner v-if="reservationLength === 0" class="bg-grey-3 text-weight-regular text-h6 text-justify text-grey-10 font-Raleway">
        <template v-slot:avatar>
          <q-img
              src="~assets/sad.svg"
              style="width:30vw;max-width:50px;"
          />
        </template>
        Aucune réservation a été effectué
      </q-banner>
      <div class="col-12 q-mt-xl">
        <div class="row flex-center flex">
          <q-card
            class="my-card rounded-borders q-ml-xl q-mr-xl q-mb-xl col-4"
            v-for="reservation in reservationList.slice(startLimit, endLimit)"
            :key="reservation._id"
            v-bind="reservation"
          >
            <router-link :to="{ path: '/reservation/'+reservation._id }">
              <div v-if="reservation.publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + reservation.publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ reservation.rent.title }}
                  </div>
                  <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ reservation.rent.fullPrice }} €
                  </h4>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                  <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ reservation.rent.title }}
                  </div>
                  <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ reservation.rent.fullPrice }} €
                  </h4>
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-blue-custom text-white font-Raleway">
                      L'anonnce n'a pas pu charger correctement
                    </div>
                  </template>
                </q-img>
              </div>
            </router-link>
          </q-card>
        </div>
        <div v-if="reservationLength !== 0" class="row q-pa-lg flex-center flex">
          <q-pagination
              v-model="current"
              color="secondary"
              :max="pages"
              :direction-links="true"
              @click="getPagination"
          />
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>

import ReservationService from '../../services/ReservationService'

export default {
  name: 'RentPage',

  data: () => ({
    reservationList: null,
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED,
    reservationLength: 0,
    limit: 5,
    pages: 1,
    startLimit: 0,
    endLimit: 5,
    current: 1
  }),
  methods: {
    getMyOwnReservation () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.getAllReservation()
        .then(response => {
          this.$q.loading.hide()
          this.reservationList = response.data.data
          this.reservationLength = response.data.data.length
          this.pages = Math.ceil(response.data.data.length / 5)
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    getPagination () {
      this.startLimit = (this.current * this.limit) - this.limit
      this.endLimit = (this.current * this.limit)
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
    background: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
