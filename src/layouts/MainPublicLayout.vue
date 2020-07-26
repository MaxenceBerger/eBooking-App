<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title v-if="this.$q.platform.is.mobile">
            <img src="../assets/logo_eBooking.png" alt="logo" style="max-height: 25px" class="q-mt-sm">
        </q-toolbar-title>
        <q-toolbar-title v-if="this.$q.platform.is.desktop">
            <img src="../assets/logo_eBooking.png" alt="logo" style="max-height: 25px" class="q-mt-sm">
        </q-toolbar-title>
        <div  v-if="this.$q.platform.is.mobile">
          <q-btn
              :to="{ name: 'LoginPage' }"
              class="q-ml-sm"
              color="light"
              rounded outline>
            Connexion
          </q-btn>
          <q-btn
              :to="{ name: 'RegisterPage' }"
              class="q-ml-sm"
              color="light"
              rounded outline>
            Inscription
          </q-btn>
        </div>
        <div v-if="this.$q.platform.is.desktop">
          <q-btn
              :to="{ name: 'LoginPage' }"
              class="q-ml-lg"
              color="light"
              rounded outline>
            Connexion
          </q-btn>
          <q-btn
              :to="{ name: 'RegisterPage' }"
              class="q-ml-lg"
              color="light"
              rounded outline>
            Inscription
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

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

<style scoped>
  .q-item.q-router-link--active, .q-item--active {
    color: #26A69A;
  }
</style>
