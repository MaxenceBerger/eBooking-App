<template>
  <q-page class="column">
    <div class="bg-blue-custom" style="height: 400px;">
      <div class="row q-ma-xl">
        <div class="col-9">
          <h3 class="items-end font-Raleway text-white">Recherche</h3>
          <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
            Recherchez une réservation parmi notre selection
          </div>
          <q-form
          @submit="getPublications">
            <q-input dark
                     dense
                     standout
                     v-model="searchPublish"
                     class="q-mt-lg font-Raleway"
                     style="max-width: 500px"
                     label="Où allez-vous ?">
              <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" type="submit" />
              </template>
            </q-input>
          </q-form>
        </div>
        <div class="col-3">
          <q-img
            fade
            src="../assets/images/Search-rent.png"
            style="max-width: 90%;"/>
        </div>
      </div>
    </div>
    <q-linear-progress v-if="this.isLoading === true" indeterminate color="secondary" />
    <q-banner v-if="this.noRents === true" class="bg-grey-3 text-weight-regular text-h6 text-justify text-grey-10 font-Raleway">
      <template v-slot:avatar>
        <q-img
          src="~assets/sad.svg"
          style="width:30vw;max-width:50px;"
        />
      </template>
      Désolé, il n'y a pas encore d'annonce pour ce lieu
    </q-banner>
    <div class="col-12 q-mt-xl">
      <div class="row">
        <q-card
          class="my-card rounded-borders  q-ml-xl q-mr-xl q-mb-xl col-4"
          v-for="publication in publicationsList"
          :key="publication._id"
          v-bind="publication"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              L'image n'a pas pu charger correctement
            </div>
          </template>
          <router-link :to="{ path: '/publication/'+publication._id }"
          >
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="text-h5 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                {{ publication.rent.title }}
              </div>
              <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                {{ publication.rent.price }} €
              </h4>
            </q-img>
          </router-link>
        </q-card>
        <div v-if="this.isLoading === true">
          <q-card flat class="custom-skeleton-card q-mb-lg rounded-borders q-ma-lg">
            <div class="q-gutter-y-md">
              <q-skeleton
                width="250px"
                height="65px"
                class="custom-skeleton-border"
              />
            </div>
            <q-card-section align="right">
              <q-skeleton type="text" width="40%" class="text-subtitle1 custom-skeleton-mt" />
            </q-card-section>
          </q-card>
        </div>
        <div v-if="this.noRents === true"></div>
      </div>
    </div>
  </q-page>
</template>

<script>

import PublicationsService from 'src/services/PublicationsService'

export default {
  name: 'SearchPage',
  data: () => ({
    searchPublish: '',
    isLoading: false,
    noRents: false,
    slide: 1,
    publicationsList: null,
    rentsList: null,
    suggestions: ['Bordeaux', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Montpellier', 'Strasbourg', 'Lille'],
    ramdomSuggestions: '',
    urlImg: ''
  }),
  methods: {
    getPublications () {
      this.isLoading = true
      PublicationsService.getPublishByCity(this.searchPublish.toLowerCase())
        .then(response => {
          this.publicationsList = response.data.data
          this.noRents = response.data.data.length === 0
          this.isLoading = false
        }).catch(e => {
          this.isLoading = false
          this.noRents = true
          console.log(e)
        })
    }
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
  .custom-skeleton-border
    border-radius: 15px 0
  .custom-skeleton-mt
    margin-top: 115px
  .custom-skeleton-card
    margin-top: 40px
    width: 100%
    max-width: 350px
    max-height: 233px
    height: 100%
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
