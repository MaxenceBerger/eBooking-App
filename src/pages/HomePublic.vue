<template>
  <q-layout>
<!-- MOBILE -->
    <q-page-container v-if="this.$q.platform.is.mobile">
      <div class="q-gutter-md">
        <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="white"
            navigation
            padding
            arrows
            fullscreen
            autoplay
            height="300px"
            class="bg-secondary text-white shadow-1 rounded-borders q-mb-lg"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center" img-src="../assets/images/slide-01-mobile.jpg">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center" img-src="../assets/images/slide-02-mobile.jpg">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center" img-src="../assets/images/slide-03-mobile.jpg" >
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center bg-white">
            <div class="q-mt-md text-center">
              <q-img
                  class="q-mb-xl"
                  src="../assets/images/logo_eBooking.svg"
                  style="width: 100%"
                  native-context-menu
              />
              <q-btn
                  class="q-ma-sm"
                  :to="{ name: 'LoginPage' }"
                  color="secondary"
                  rounded outlined>
                Connexion
              </q-btn>
              <q-btn
                  class="q-ma-sm"
                  :to="{ name: 'RegisterPage' }"
                  color="secondary"
                  rounded outlined>
                Inscription
              </q-btn>
              <q-img
                  class="q-mt-xl"
                  src="../assets/images/bg_connection_screen.svg"
                  style="width: 100%"
                  native-context-menu
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </q-page-container>
<!-- /MOBILE -->
<!-- DESKTOP -->
    <q-page-container>
      <div class="q-gutter-md">
        <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="white"
            navigation
            padding
            arrows
            autoplay
            height="300px"
            class="bg-secondary text-white shadow-1 rounded-borders q-mb-lg"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/mountains.jpg">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/parallax2.jpg" >
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/quasar.jpg">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md text-center">
              <q-btn
                  class="q-ma-lg"
                  :to="{ name: 'LoginPage' }"
                  color="secondary"
                  rounded outlined>
                Connexion
              </q-btn>
              <q-btn
                  class="q-ma-lg"
                  :to="{ name: 'RegisterPage' }"
                  color="secondary"
                  rounded outlined>
                Inscription
              </q-btn>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <q-page class="q-ml-xl q-mr-xl items-center">
        <h4>Quelques biens en location pous vous !</h4>
          <q-card
            class="my-card q-mt-lg"
            v-for="publication in publicationsList"
            :key="publication._id"
            v-bind="publication"
          >
            <q-card-section class="bg-purple text-white">
              <div class="text-h6">Id: {{ publication._id }}</div>
              <div class="text-subtitle2">par {{ publication.rent }}</div>
            </q-card-section>
            <q-card-actions align="around">
              <p>Begin at: {{ publication.start_at }}</p>
              <p>End at: {{ publication.end_at }}</p>
            </q-card-actions>
          </q-card>
        </q-page>
    </q-page-container>
<!-- /DESKTOP -->
  </q-layout>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'

export default {
  name: 'HomePublicPage',

  data: () => ({
    publicationsList: null,
    slide: 'style',
    lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
  }),
  methods: {
    getPublications () {
      PublicationsService.getAllPublish()
        .then(response => {
          this.publicationsList = response.data.data
        }).catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getPublications()
  }
}
</script>
