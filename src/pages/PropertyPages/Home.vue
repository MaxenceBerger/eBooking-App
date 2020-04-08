<template>
  <q-page class="column">
    <q-img
      fade
      src="../../assets/images/suggestionPage/Bordeaux.jpg"
      style="height: 400px;"
    >
    </q-img>
    <h5 class="items-end">Que diriez-vous d'un séjour à {{ ramdomSuggestions }} ?</h5>
    <q-card
      class="my-card q-mb-lg rounded-borders"
      v-for="publication in publicationsList"
      :key="publication._id"
      v-bind="publication"
    >
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
      <router-link :to="{ path: '/publication/'+publication._id }">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="text-h5 text-secondary bg-title-custom rounded-borders-title">
          {{ publication.rent.title }}
          </div>
          <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
            {{ publication.rent.price }} €
          </h4>
        </q-img>
      </router-link>
    </q-card>
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
    getSuggestions () {
      this.ramdomSuggestions = this.suggestions[Math.floor(Math.random() * this.suggestions.length)]
      this.urlImg = '../../assets/images/suggestionPage/' + this.ramdomSuggestions + '.jpg'
      console.log(this.urlImg)
    },
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
  .bg-title-custom
    background: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
</style>
