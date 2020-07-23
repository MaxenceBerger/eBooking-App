<template>
  <q-page class="column">
    <div class="bg-blue-custom" style="height: 400px;">
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
    <div class="row">
      <div class="col-4">
        <q-card
          class="my-card q-mb-lg rounded-borders q-ma-lg"
          v-for="publication in publicationsList"
          :key="publication._id"
          v-bind="publication"
        >
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Désolé, il n'y a pas encore d'annonce pour ce lieu :(
            </v-alert>
          </template>
          <router-link :disabled="publication.rent.is_rented === true"
                       :to="{ path: '/publication/'+publication._id }"
          >
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                {{ publication.rent.title }}
              </div>
              <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                {{ publication.rent.price }} €
              </h4>
              <div v-if="publication.rent.is_rented === true"
                   class="absolute-bottom text-center bg-secondary text-h4 color-text-custom">
                Déjà Reservé
              </div>
            </q-img>
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
    urlImg: ''
  }),
  methods: {
    getImage () {
      return `img/${this.ramdomSuggestions}.jpg`
    },
    getSuggestions () {
      this.ramdomSuggestions = this.suggestions[Math.floor(Math.random() * this.suggestions.length)]
      this.urlImg = 'img/Bordeaux.jpg'.toString()
      console.log(this.urlImg)
    },
    getPublications () {
      PublicationsService.getAllPublish()
        .then(response => {
          this.publicationsList = response.data.data
          console.log(response.data.data)
        }).catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getPublications()
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
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
