<template>
  <q-page class="column">
    <div>
      <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>
    <div class="q-pa-md">
      <h1>ReservationDetail</h1>
      <p>Info Reservation : {{reservation}}</p>
    </div>
    <q-btn color="red" @click="deleteRent">Delete</q-btn>
  </q-page>
</template>

<script>

import ReservationService from '../services/ReservationService'

export default {
  name: 'ReservationDetail',
  data: () => ({
    slide: 1,
    reservation: null,
    idReservation: ''
  }),
  methods: {
    getReservation () {
      ReservationService.getReservation(this.$route.params.idReservation)
        .then(response => {
          this.reservation = response.data.data
          this.idReservation = response.data.data.id
          console.log(response.data.data.id)
        }).catch(e => {
          console.log(e)
        })
    },
    deleteRent () {
      ReservationService.deleteReservation(this.$route.params.idReservation)
        .then(() => {
          this.$router.push({ name: 'RentPage' })
          this.$q.notify({
            type: 'positive',
            message: 'Notre réservation a bien été supprimé',
            position: 'top'
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Oups, il semble que nous rencontrons des problèmes sur votre réservation',
            icon: 'report_problem',
            position: 'top'
          })
        })
    }
  },
  created () {
    this.getReservation()
  }
}
</script>
