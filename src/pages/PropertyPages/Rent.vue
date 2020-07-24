<template>
  <q-page class="column">
    <div class="bg-title-custom q-mb-xl" style="height: 400px;">
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
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="text-h5 text-secondary bg-title-custom rounded-borders-title">
                {{ reservation.rent.title }}
              </div>
              <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                {{ reservation.rent.price }} €/nuit
              </h4>
            </q-img>
          </router-link>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import ReservationService from '../../services/ReservationService'

export default {
  name: 'RentPage',

  data: () => ({
    reservationList: null
  }),
  methods: {
    getMyOwnReservation () {
      ReservationService.getAllReservation()
        .then(response => {
          this.reservationList = response.data.data
          console.log(response.data.data)
        })
        .catch(e => {
          console.log(e)
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
  .bg-title-custom
    background: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
