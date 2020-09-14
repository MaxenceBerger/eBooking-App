<template>
  <q-layout>
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile" class="q-pt-xl">
      <div class="bg-blue-custom" style="height: 100vh;">
        <div class="col-12">
          <div class="row">
            <div class="font-Raleway">
              <div class="q-ma-lg text-center" style="padding-top: 50px;">
                <h4 class="text-bold text-grey-3">
                  Une location de rêve pour vos vacances ?
                </h4>
                <p class="text-bold text-grey-5">
                  eBooking vous propose de louer des biens de manière plus intelligente
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
    </template>
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
              <h3 class="text-bold text-grey-3">
                Une location de rêve pour vos vacances ?
              </h3>
              <h4 class="text-bold text-grey-3">
                Ne cherchez plus, elle est ici.
              </h4>

              <p class="text-bold text-grey-5 text-h6">
                eBooking vous propose de louer des biens de manière plus intelligente
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
                style="width: 40rem; margin-top: 10rem; margin-left: 5rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-custom text-center" style="height: 7rem;">
        <a href="home/#detail_mobile" style="text-decoration: none">
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
          <h3 class="text-bold color-blue-custom text-center">
            Réserver pour ses vacances n'a jamais été aussi simple.
          </h3>
          <p class="text-bold color-blue-fade-custom text-h6 text-center">
            Désormais grâce à l'application eBooking, vous pouvez réserver un bien pour les vacances,<br>
            mettre en ligne un logement pendant une certaine période ou même déverrouiller votre porte. <br>
            Tout simplement !
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
          <h3 class="text-bold text-grey-3 text-center">
            “Chérie, où sont les clés ?”
          </h3>
          <p class="text-bold text-grey-5 text-h6 text-center">
            Plus besoin de s'en préoccuper pendant vos vacances, <br>
            inscrivez-vous simplement ci-dessous !
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
        }).catch(() => {
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
