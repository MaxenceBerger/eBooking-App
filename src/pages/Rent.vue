<template>
  <q-page class="column items-center">
    <h5 class="items-end">Mes Réservations</h5>
    <q-card
        class="my-card q-mb-lg rounded-borders"
        v-for="reservation in reservationList"
        :key="reservation._id"
        v-bind="reservation"
    >
      <router-link :to="{ path: '/reservation/'+reservation._id }">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="text-h5 text-secondary bg-title-custom rounded-borders-title">
            {{ reservation._id }}
          </div>
          <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
            49 {{ reservation.price }} €/nuit
          </h4>
        </q-img>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>

import ReservationService from '../services/ReservationService'

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
</style>
