<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
    <!-- MOBILE PLATFORM-->
    <q-header  v-if="this.$q.platform.is.mobile" reveal elevated class="bg-white">
      <div class="col-12">
        <q-toolbar>
          <div class="col-12">
            <q-toolbar-title class="text-center">
              <router-link :to="{ name: 'HomePublicPage' }">
                <img src="../assets/logo_eBooking.png" alt="logo" style="height: 35px" class="q-mt-md">
              </router-link>
            </q-toolbar-title>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <q-header v-if="this.$q.platform.is.desktop" reveal elevated class="bg-white">
      <div class="col-12">
        <q-toolbar>
          <div class="col-4"/>
          <div class="col-4">
            <q-toolbar-title class="text-center">
              <router-link :to="{ name: 'HomePublicPage' }">
                <img src="../assets/logo_eBooking.png" alt="logo" style="max-height: 50px" class="q-mt-md">
              </router-link>
            </q-toolbar-title>
          </div>
          <div>
          <div class="col-4 vertical-center font-Raleway">
            <router-link
              :to="{ name: 'LoginPage' }"
              class="text-bold text-h6 custom-router-link"
            >
              Connexion
            </router-link>
            <q-btn
              :to="{ name: 'RegisterPage' }"
              class="q-ml-xl text-bold text-h6 bg-blue-custom"
              label="Inscription"
              rounded no-caps/>
          </div>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <!-- /DESKTOP PLATFORM-->
    <q-page-container class="bg-blue-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from '../services/AuthService'

export default {
  name: 'MainPublicLayout',
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Suggestion',
          icon: 'flight_takeoff',
          link: 'HomePage'
        },
        {
          title: 'Rechercher',
          icon: 'search',
          link: 'SearchPage'
        },
        {
          title: 'Mes Réservations',
          icon: 'hotel',
          link: 'RentPage'
        },
        {
          title: 'Clé',
          icon: 'vpn_key',
          link: 'UnlockPage'
        },
        {
          title: 'Mon Compte',
          icon: 'account_circle',
          link: 'MyAccountPage'
        }
      ]
    }
  },
  methods: {
    logout () {
      AuthService.logout()
    }
  }
}
</script>

<style lang="sass" scoped>
  .q-item.q-router-link--active, .q-item--active
    color: #26A69A
  .vertical-center
    margin: 0
    position: absolute
    top: 50%
    left: 80%
    -ms-transform: translateY(-50%)
    transform: translateY(-50%)
  .bg-blue-custom
    background-color: rgb(45,64,78)
  .custom-router-link
    color: #2D404E
    text-decoration: none
  .custom-router-link:hover
    color: rgba(45, 64, 78, 0.75)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
      font-family: 'Roboto', sans-serif
</style>
