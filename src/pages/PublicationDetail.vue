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

    <div class="q-pa-xl">
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
                <q-item-label>La superficie est de {{ publication.rent.area }} m³</q-item-label>
              </q-item-section>
            </q-item>
          </q-item-section>
          <q-separator />
          <div class="text-h5 q-ma-lg">Description</div>
          <div class="text-weight-regular text-body2 text-justify q-ma-lg">{{ publication.rent.description }}</div>
        </div>
        <div class="col-12 col-md-4 column items-center">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-subtitle1 q-ma-sm q-mb-lg"> <strong>{{ publication.rent.price }} €</strong> la location</div>
              <q-separator />
              <q-item-section class="q-mt-lg">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="calendar_today" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Début</q-item-label>
                    <q-item-label>{{ publication.start_at }}</q-item-label>
                    <q-item-label caption>Fin</q-item-label>
                    <q-item-label>{{ publication.end_at }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-item-section>
            </q-card-section>

            <q-separator />
              <q-card-actions vertical>
                <q-btn color="secondary"
                       v-if="publication.rent.is_rented === false"
                       @click="dialog = true">
                  Reservation
                </q-btn>
                <q-btn color="secondary"
                       disable
                       v-if="publication.rent.is_rented === true">
                  Déjà Reservé
                </q-btn>
              </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="bg-teal text-white" >
          <div class="text-h6">Confirmation</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-mt-sm">Êtes-vous sûr de vouloir reserver ce bien ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Oui" color="teal" @click="reserveRent" v-close-popup />
          <q-btn flat label="Non" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import PublicationsService from '../services/PublicationsService'
import ReservationService from '../services/ReservationService'
import { date } from 'quasar'

const STATUS_CODE_401 = 401

export default {
  name: 'PublicationDetail',
  data: () => ({
    slide: 1,
    publication: null,
    idPublication: '',
    dialog: false
  }),
  methods: {
    getPublication () {
      PublicationsService.getPublish(this.$route.params.idPublication)
        .then(response => {
          this.publication = response.data.data
          this.publication.start_at = date.formatDate(response.data.data.start_at, 'DD/MM/YYYY')
          this.publication.end_at = date.formatDate(response.data.data.end_at, 'DD/MM/YYYY')
          this.idPublication = response.data.data._id
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
        this.getPublication()
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
<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
