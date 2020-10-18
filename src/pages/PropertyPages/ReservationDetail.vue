<template>
  <q-page class="column bg-white">
    <template v-if="this.$q.platform.is.mobile" >
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
            <q-separator />
            <div class="text-h5 q-ma-lg font-Raleway color-blue-custom">Coordonnées</div>
              <div class="q-ma-lg">
                <div class="text-weight-regular text-body2 font-Raleway">{{ publication.rent.address }}</div>
                <div class="text-weight-regular text-body2 font-Raleway">{{ publication.rent.postalCode }} {{ publication.rent.city }}</div>
                <div class="text-weight-regular text-body2 font-Raleway">{{ publication.rent.country }}</div>
              </div>
            <template class="q-ma-xl">
              <MglMap
                  style="width: 365px; height: 250px; margin-left: 25px; margin-bottom: 25px; margin-top: 25px"
                  :accessToken="accessToken"
                  :mapStyle.sync="mapStyle"
                  :center="coordinates"
                  :zoom="5"
                  @load="onMapLoad"
              >
                <MglMarker :coordinates="coordinates" color="red" />
              </MglMap>
            </template>
            <q-separator />
            <div class="text-h5 q-ma-lg font-Raleway color-blue-custom">Récapitulatif de votre réservation</div>
            <div class="q-ma-lg">
              <q-item-section class="q-mt-lg items-center">
                <div class="text-weight-regular text-body2 font-Raleway">
                  Vous avez réservé cette location pour un total de
                  <strong>{{ reservation.rent.fullPrice }} €</strong>
                  soit
                  <strong>{{ publication.rent.price }} €</strong>
                  par nuit.
                </div>
                <div class="q-mt-lg q-mb-lg">
                  <div class="text-weight-regular text-body2 font-Raleway">
                    <q-icon color="secondary" class="q-mr-sm" name="calendar_today" style="font-size: 2em" />
                    Réservation du <strong>{{ reservation.start_at }}</strong>
                    au <strong>{{ reservation.end_at }}</strong>
                  </div>
                </div>
              </q-item-section>
            </div>
          </div>
          <div class="col-12 col-md-4 column items-center">
            <q-btn  class="full-width no-rounded-borders font-Raleway"
                    color="negative"
                    @click="dialog = true">
              Annulation de ma réservation
            </q-btn>
          </div>
        </div>
      </div>
      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section class="bg-teal text-white" >
            <div class="text-h6 font-Raleway">Confirmation</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <span class="q-mt-sm font-Raleway">Êtes-vous sûr de vouloir annuler la reservation de ce bien ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Oui" class="font-Raleway" color="teal" @click="deleteRent" v-close-popup />
            <q-btn flat label="Non" color="teal" class="font-Raleway" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
            <q-separator />
            <div class="text-h5 q-ma-lg">Coordonnées</div>
            <div class="text-weight-regular text-body2 q-ml-lg">{{ publication.rent.address }}</div>
            <div class="text-weight-regular text-body2 q-ml-lg">{{ publication.rent.postalCode }} {{ publication.rent.city }}</div>
            <div class="text-weight-regular text-body2 q-ml-lg"></div>
            <div class="text-weight-regular text-body2 q-ml-lg">{{ publication.rent.country }}</div>
            <template class="q-ma-xl">
              <MglMap
                  style="width: 880px; height: 500px; margin-left: 25px; margin-top: 25px"
                  :accessToken="accessToken"
                  :mapStyle.sync="mapStyle"
                  :center="coordinates"
                  :zoom="5"
                  @load="onMapLoad"
              >
                <MglMarker :coordinates="coordinates" color="red" />
              </MglMap>
            </template>
          </div>
          <div class="col-12 col-md-4 column items-center">
            <q-card class="my-card bg-blue-grey-1" flat bordered>
              <q-card-section>
                <q-item-label class="text-subtitle1 q-ma-sm"> <strong>{{ reservation.rent.fullPrice }} €</strong> aux total</q-item-label>
                <q-item-label caption class="text-subtitle1 q-ma-sm q-mb-lg"> <strong>{{ publication.rent.price }} €</strong> / nuit</q-item-label>
                <q-separator />
                <q-item-section class="q-mt-lg">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="calendar_today" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>Début</q-item-label>
                      <q-item-label>{{ reservation.start_at }}</q-item-label>
                      <q-item-label caption>Fin</q-item-label>
                      <q-item-label>{{ reservation.end_at }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-item-section>
              </q-card-section>

              <q-separator />
              <q-card-actions vertical>
                <q-btn color="negative"
                       @click="dialog = true">
                  Annulation
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
            <span class="q-mt-sm">Êtes-vous sûr de vouloir annuler la reservation de ce bien ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Oui" color="teal" @click="deleteRent" v-close-popup />
            <q-btn flat label="Non" color="teal" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </q-page>
</template>

<script>

import ReservationService from '../../services/ReservationService'
import PublicationsService from '../../services/PublicationsService'
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker } from 'vue-mapbox'
import { date } from 'quasar'
import MapsService from 'src/services/MapsService'

export default {
  name: 'ReservationDetail',
  components: {
    MglMap,
    MglMarker
  },
  data: () => ({
    accessToken: process.env.VUE_APP_TOKEN_MAP_BOX,
    mapStyle: process.env.VUE_APP_MAP_STYLE_MAP_BOX,
    fullAddress: null,
    coordinates: {
      lng: -1.5137635,
      lat: 46.3873197
    },
    slide: 1,
    fullscreen: false,
    reservation: null,
    idReservation: '',
    publication: null,
    idPublication: '',
    pictures: null,
    dialog: false,
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
  }),
  methods: {
    getReservation () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.getReservation(this.$route.params.idReservation)
        .then(response => {
          this.reservation = response.data.data
          this.idReservation = response.data.data.id
          this.idPublication = response.data.data.publication._id
          this.pictures = response.data.data.publication.rent.pictures
          this.slide = response.data.data.publication.rent.pictures[0]
          this.reservation.start_at = date.formatDate(response.data.data.start_at, 'DD/MM/YYYY')
          this.reservation.end_at = date.formatDate(response.data.data.end_at, 'DD/MM/YYYY')
          this.getPublication()
          this.$q.loading.hide()
        }).catch(() => {
          this.$q.loading.hide()
        })
    },
    getPublication () {
      PublicationsService.getPublish(this.idPublication)
        .then(response => {
          this.publication = response.data.data
          this.publication.rent.city = response.data.data.rent.city.charAt(0).toUpperCase() + response.data.data.rent.city.substring(1).toLowerCase()
          this.fullAddress = `${response.data.data.rent.address.toLowerCase()}+${response.data.data.rent.postalCode.toLowerCase()}+${response.data.data.rent.city.toLowerCase()}+${response.data.data.rent.country.toLowerCase()}`
          this.getLongLatByAddress()
        }).catch(() => {
        })
    },
    getLongLatByAddress () {
      MapsService.getLongLatByAddress(this.fullAddress)
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
        zoom: 17,
        speed: 1
      })
    },
    deleteRent () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      ReservationService.deleteReservation(this.$route.params.idReservation)
        .then(() => {
          this.$q.loading.hide()
          this.$router.push({ name: 'RentPage' })
          this.$q.notify({
            type: 'positive',
            message: 'Votre réservation a bien été supprimé',
            position: 'top'
          })
        })
        .catch(() => {
          this.$q.loading.hide()
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
  .no-rounded-borders
    border-radius: 0px
  .fullscreen
    .q-carousel__slide
      background-size: contain
      background-repeat: no-repeat
      background-color: rgb(45, 64, 78)
</style>
