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
      <div class="col-12 q-mt-xl">
        <div class="row justify-center">
          <q-card
            class="my-card rounded-borders q-mb-xl col-4"
            v-for="reservation in reservationList"
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
            </router-link>
          </q-card>
        </div>
      </div>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom q-mb-xl" style="height: 400px;">
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
      <div class="col-12">
        <div class="row">
          <q-card
            class="my-card rounded-borders q-ml-xl q-mr-xl q-mb-xl col-4"
            v-for="reservation in reservationList"
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
                    {{ reservation.rent.price }} €
                  </h4>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                  <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ reservation.rent.title }}
                  </div>
                  <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ reservation.rent.price }} €
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
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
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
    background: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
