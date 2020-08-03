<template>
  <q-layout>
    <!-- MOBILE PLATFORM-->
    <q-page-container  v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom" style="height: 100vh;">
        <div class="col-12">
          <div class="row">
            <div class="font-Raleway">
              <div class="q-ma-lg text-center">
                <h3 class="text-bold text-grey-3">
                  Lorem ipsum dolor sit amet
                </h3>
                <p class="text-bold text-grey-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div class="text-center">
                  <q-img
                    :src="require('src/assets/images/Search-rent.png')"
                    style="width: 50vw;"
                  />
                </div>
              </div>
              <div class="text-center font-Raleway q-mt-xl">
                <q-btn
                    :to="{ name: 'LoginPage' }"
                    class="q-ma-md text-bold text-h6"
                    color="secondary"
                    label="Connexion"
                    rounded no-caps/>
                <q-btn
                    :to="{ name: 'RegisterPage' }"
                    class="q-ma-md text-bold text-h6"
                    color="secondary"
                    label="Inscription"
                    rounded no-caps/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <q-page-container v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom" style="height: 46rem;">
        <div class="col-12">
          <div class="row">
            <div
              class="col-6 font-Raleway"
              style="padding: 10rem;"
            >
              <h2 class="text-bold text-grey-3">
                Lorem ipsum dolor sit amet
              </h2>
              <p class="text-bold text-grey-5 text-h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <q-btn
                :to="{ name: 'RegisterPage' }"
                class="text-bold text-h6 bg-mint-custom text-white q-mt-lg"
                label="Inscription"
                rounded no-caps/>
            </div>
            <div class="col-6">
              <q-img
                :src="require('src/assets/images/Search-rent.png')"
                style="width: 50rem; margin-top: 10rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-custom text-center" style="height: 7rem;">
        <a href="#detail_mobile" style="text-decoration: none">
          <q-btn
            class="text-bold text-h6 bg-white color-mint-custom q-mt-lg"
            icon="keyboard_arrow_down"
            round/>
        </a>
      </div>
      <div id="detail_mobile" class="bg-white" style="height: 20rem;">
        <div
          class="col-6 font-Raleway"
          style="padding: 2rem;"
        >
          <h2 class="text-bold color-blue-custom text-center">
            Lorem ipsum dolor sit amet
          </h2>
          <p class="text-bold color-blue-fade-custom text-h6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
          <p class="text-bold color-blue-fade-custom text-h6 text-center">
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div class="bg-smartphone" style="height: 50rem;">
      </div>
      <div class="bg-blue-custom" style="height: 25rem;">
        <div
          class="col-6 font-Raleway"
          style="padding: 2rem;"
        >
          <h2 class="text-bold text-grey-3 text-center">
            Are you ready ?
          </h2>
          <p class="text-bold text-grey-5 text-h6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
          <div class="text-center">
            <q-btn
              :to="{ name: 'RegisterPage' }"
              class="text-bold text-h6 bg-mint-custom text-white q-mt-lg"
              label="Inscription"
              rounded no-caps/>
          </div>
        </div>
      </div>
      <Footer/>
    </q-page-container>
    <!-- /DESKTOP PLATFORM-->
  </q-layout>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'
import Footer from 'components/Footer'

export default {
  name: 'HomePublicPage',
  components: { Footer },
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
<style lang="sass" scoped>
  .bg-blue-custom
    background: rgb(45, 64, 78)
  .bg-mint-custom
    background-color: #26A69A
  .bg-smartphone
    background-image: url('../assets/images/smartphone.jpg')
    background-size: contain
    background-repeat: no-repeat
    background-position: center
    background-color: #FFFFFF
    justify-content: center
  .color-mint-custom
    color: #26A69A
  .color-blue-fade-custom
    color: rgba(45, 64, 78, 0.6)
  .color-blue-custom
    color: rgb(45, 64, 78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
