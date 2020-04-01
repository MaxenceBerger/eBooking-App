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
      <h1>PublicationDetail</h1>
      <p>Info Publication : {{publication}}</p>
    </div>
    <q-btn color="primary" @click="reserveRent">Reservation</q-btn>
  </q-page>
</template>

<script>

import PublicationsService from '../services/PublicationsService'
import ReservationService from '../services/ReservationService'

const STATUS_CODE_401 = 401

export default {
  name: 'PublicationDetail',
  data: () => ({
    slide: 1,
    publication: null,
    idPublication: ''
  }),
  methods: {
    getPublication () {
      PublicationsService.getPublish(this.$route.params.idPublication)
        .then(response => {
          this.publication = response.data.data
          this.idPublication = response.data.data._id
          console.log(response.data.data.id)
        }).catch(e => {
          console.log(e)
        })
    },
    reserveRent () {
      ReservationService.setReservation({
        publication: this.idPublication
      }).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Votre réservation a bien été enregistré',
          position: 'top'
        })
      }).catch((error) => {
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
  }
}
</script>
