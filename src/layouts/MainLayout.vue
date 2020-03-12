<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-separator vertical inset />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          eBooking
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-4"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-1"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item class="column items-center q-mt-lg">
          <q-btn v-if="$store.getters.getToken"
                 @click="logout"
                 color="secondary"
                 unelevated
                 rounded >
            Déconnexion
          </q-btn>
          <q-btn v-else :to="{ name: 'LoginPage' }" color="secondary">Connexion</q-btn>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import AuthService from '../services/AuthService'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

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
          title: 'Réservation',
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
