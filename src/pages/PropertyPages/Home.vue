<template>
  <q-page class="column">
    <div class="bg-blue-custom q-mb-xl" style="height: 400px;">
      <div class="row q-ma-xl">
        <div class="col-9">
          <h3 class="items-end font-Raleway text-white">Que diriez-vous<br>d'un séjour à {{ ramdomSuggestions }} ?</h3>
        </div>
        <div class="col-3">
          <q-img
            fade
            src="../../assets/images/Home.png"
            style="max-width: 85%;"/>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
          <q-card
            class="my-card rounded-borders q-ml-xl q-mr-xl q-mb-xl col-4"
            v-for="publication in publicationsList"
            :key="publication._id"
            v-bind="publication"
          >
            <router-link :to="{ path: '/publication/'+publication._id }">
              <div v-if="publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ publication.rent.price }} €
                  </h4>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                <!--<q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" style="height: 233px; width: 350px">-->
                  <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ publication.rent.price }} €
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
  </q-page>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'

export default {
  name: 'HomePage',

  data: () => ({
    slide: 1,
    publicationsList: null,
    rentsList: null,
    suggestions: ['Bordeaux', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Montpellier', 'Strasbourg', 'Lille'],
    ramdomSuggestions: '',
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
  }),
  methods: {
    getSuggestions () {
      this.ramdomSuggestions = this.suggestions[Math.floor(Math.random() * this.suggestions.length)]
      this.urlImg = 'img/Bordeaux.jpg'.toString()
      this.getPublications()
      console.log(this.urlImg)
    },
    getPublications () {
      // PublicationsService.getPublishByCity('bordeaux')
      PublicationsService.getPublishByCity(this.ramdomSuggestions.toLowerCase())
        .then(response => {
          this.publicationsList = response.data.data
          console.log(response.data.data)
        }).catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getSuggestions()
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
  .color-text-custom
    color: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
    max-height: 233px
    height: 100%
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
