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
      <q-list style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-item-label
          header
          class="text-grey-1"
        >
        </q-item-label>
        <q-item
          v-if="this.$store.state.user.role === 'ADMIN'"
          clickable
          tag="a"
          :to="{ name: 'AdminDashboardPage' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="show_chart" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dashboard Admin</q-item-label>
          </q-item-section>
        </q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-img class="absolute-top" src="../assets/images/bg-profile.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ userInfo.firstName }} {{ userInfo.lastName }}</div>
          <div class="text-blue-grey-2" v-if="this.$store.state.user.role === 'ADMIN'">Administrateur</div>

        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      userInfo: {},
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
    getUserProfile () {
      UserService.getUser()
        .then(response => {
          this.userInfo = response.data.data
        })
    },
    logout () {
      AuthService.logout()
    }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style scoped>
  .q-item.q-router-link--active, .q-item--active {
    color: #26A69A;
  }
</style>
