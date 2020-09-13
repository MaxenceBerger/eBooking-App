<template>
  <q-page class="column">
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="font-Raleway text-white">Que diriez-vous<br>d'un séjour<br>à {{ ramdomSuggestions }} ?</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-xl"
                fade
                src="../../assets/images/Home.png"
                style="max-width: 80%;"/>
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
            Recherchez une réservation parmi notre selection
            </div>
            <q-form
                @submit="getSearch">
              <q-input dark
                       dense
                       standout
                       color="blue-grey-7"
                       v-model="searchPublish"
                       class="q-mt-lg font-Raleway"
                       style="max-width: 380px"
                       label="Où allez-vous ?">
                <template v-slot:append>
                  <q-icon name="search" class="cursor-pointer" type="submit" @click="getSearch" />
                </template>
              </q-input>
            </q-form>
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
      <div v-if="isSuggestions" class="col-12 q-mt-xl">
        <div class="row justify-center">
          <q-card
              class="my-card rounded-borders q-mb-xl col-4"
              v-for="publication in publicationsList.slice(0, 5)"
              :key="publication._id"
              v-bind="publication"
          >
            <router-link :to="{ path: '/publication/'+publication._id }">
              <div v-if="publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    <span class="text-subtitle1 text-weight-light">à partir de</span>{{ publication.rent.price }} €
                  </h5>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                  <!--<q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" style="height: 233px; width: 350px">-->
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ publication.rent.price }} €
                  </h5>
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
      <div class="col-12">
        <div v-if="isSearch" class="row justify-center">
          <q-card
              class="my-card rounded-borders q-mb-xl col-4"
              v-for="publication in searchList.slice(startLimit, endLimit)"
              :key="publication._id"
              v-bind="publication"
          >
            <router-link :to="{ path: '/publication/'+publication._id }">
              <div v-if="publication.rent.pictures[0]">
                <q-img class="rounded-borders" :src="imageUrl + publication.rent.pictures[0]" style="height: 233px; width: 350px">
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    <span class="text-subtitle1 text-weight-light">à partir de</span>{{ publication.rent.price }} €
                  </h5>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
                  <div class="text-h6 text-secondary bg-blue-custom rounded-borders-title font-Raleway">
                    {{ publication.rent.title }}
                  </div>
                  <h5 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
                    {{ publication.rent.price }} €
                  </h5>
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
        <div v-if="isSearch && noRents === false" class="row q-pa-lg flex-center flex">
          <q-pagination
              v-model="current"
              color="secondary"
              :max="pages"
              :direction-links="true"
              @click="getPagination"
          />
        </div>
      </div>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom" style="height: 400px;">
        <div class="row q-ma-xl">
          <div class="col-9">
            <h3 class="items-end font-Raleway text-white q-pb-md">Que diriez-vous<br>d'un séjour à {{ ramdomSuggestions }} ?</h3>
            <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
              Recherchez une réservation parmi notre selection
            </div>
            <q-form
                @submit="getSearch">
              <q-input dark
                       dense
                       standout
                       color="blue-grey-7"
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
                src="../../assets/images/Home.png"
                style="max-width: 85%;"/>
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
      <div v-if="isSuggestions" class="col-12 q-mt-xl">
        <div class="row flex-center flex">
          <q-card
              class="my-card rounded-borders q-ml-xl q-mr-xl q-mb-xl col-4"
              v-for="publication in publicationsList.slice(0, 6)"
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
                    <span class="text-subtitle1 text-weight-light">à partir de</span>{{ publication.rent.price }} €
                  </h4>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
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
      <div class="col-12 q-mt-xl">
        <div v-if="isSearch" class="row flex-center flex">
          <q-card
              class="my-card rounded-borders q-ml-xl q-mr-xl q-mb-xl col-4"
              v-for="publication in searchList.slice(startLimit, endLimit)"
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
                    <span class="text-subtitle1 text-weight-light">à partir de</span>{{ publication.rent.price }} €
                  </h4>
                </q-img>
              </div>
              <div v-else>
                <q-img class="rounded-borders" :src="require('src/assets/images/default-house.jpg')" style="height: 233px; width: 350px">
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
        <div v-if="isSearch && noRents === false" class="row q-pa-lg flex-center flex">
          <q-pagination
              v-model="current"
              color="secondary"
              :max="pages"
              :direction-links="true"
              @click="getPagination"
          />
        </div>
      </div>
    </template>

  </q-page>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'

export default {
  name: 'HomePage',

  data: () => ({
    searchLength: 0,
    limit: 5,
    pages: 1,
    startLimit: 0,
    endLimit: 5,
    current: 1,
    searchPublish: '',
    isLoading: false,
    isSuggestions: true,
    isSearch: false,
    noRents: false,
    slide: 1,
    publicationsList: null,
    searchList: null,
    rentsList: null,
    suggestions: ['Bordeaux', 'Paris', 'Lyon'],
    ramdomSuggestions: '',
    imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED
  }),
  methods: {
    getSuggestions () {
      this.ramdomSuggestions = this.suggestions[Math.floor(Math.random() * this.suggestions.length)]
      this.urlImg = 'img/Bordeaux.jpg'.toString()
      this.getPublications()
    },
    getPublications () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      PublicationsService.getPublishByCity(this.ramdomSuggestions.toLowerCase())
        .then(response => {
          this.$q.loading.hide()
          this.publicationsList = response.data.data
        }).catch(() => {
          this.$q.loading.hide()
        })
    },
    getPagination () {
      this.startLimit = (this.current * this.limit) - this.limit
      this.endLimit = (this.current * this.limit)
    },
    getSearch () {
      this.isLoading = true
      PublicationsService.getPublishByCity(this.searchPublish.toLowerCase())
        .then(response => {
          this.searchList = response.data.data
          this.noRents = response.data.data.length === 0
          this.isSearch = true
          this.isSuggestions = false
          this.isLoading = false
          this.searchLength = response.data.data.length
          this.pages = Math.ceil(response.data.data.length / 5)
        }).catch(() => {
          this.isLoading = false
          this.noRents = true
          this.isSearch = false
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
