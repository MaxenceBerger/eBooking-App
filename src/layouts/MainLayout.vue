<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
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
            <img src="../assets/logo_eBooking.png" alt="logo" style="max-height: 25px" class="q-mt-sm">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      content-class="bg-blue-grey-7"
    >
      <q-list style="height: calc(100% - 200px); margin-top: 200px;">
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
        <q-item
          v-if="this.$store.state.user.role === 'ADMIN'"
          clickable
          tag="a"
          :to="{ name: 'AdminDashboardPage' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="dashboard"/>
          </q-item-section>

          <q-item-section>
            <q-item-label class="font-Raleway">Dashboard Admin</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-img class="absolute-top" src="../assets/images/bg-template.jpg" style="height: 200px">
        <div class="absolute-bottom bg-transparent q-mb-lg">
          <q-avatar size="56px" class="q-mb-lg">
            <q-img v-if="profilePictureDefault === true" :ratio="1" size="56px" src="../assets/images/default-profile.jpg"/>
            <q-img v-else :ratio="1" size="56px" :src="this.profilePicture"/>
          </q-avatar>
          <div class="text-weight-bold font-Raleway">{{ userInfo.firstName }} {{ userInfo.lastName }}</div>
          <div class="text-blue-grey-2 font-Raleway" v-if="this.$store.state.user.role === 'ADMIN'">Administrateur</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container class="bg-blue-grey-2">
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
      ],
      imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED,
      profilePicture: '',
      profilePictureDefault: true
    }
  },
  methods: {
    getUserProfile () {
      UserService.getUser()
        .then(response => {
          this.userInfo = response.data.data
          if (response.data.data.picture.length >= 1) {
            this.profilePicture = this.imageUrl + response.data.data.picture
            this.profilePictureDefault = false
          } else {
            this.profilePictureDefault = true
          }
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

<style lang="sass" scoped>
  .q-item
    color: #DDD !important
  .q-router-link--active, .q-item--active
    color: #4db6ac !important
  .bg-blue-custom
    background: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
