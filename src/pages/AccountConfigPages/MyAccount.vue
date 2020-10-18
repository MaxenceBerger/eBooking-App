<template>
  <q-page class="column">
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="items-end font-Raleway text-white">Mon Compte</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Settings.png"
                style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ml-md q-mr-md q-mb-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Dans cette page, vous avez toutes les informations nécessaire à l'administration de votre compte et biens
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 q-ma-lg">
      <div class="column">
        <q-list>
          <q-item-label header class="font-Raleway color-blue-custom text-bold">INSTALLATION DE LA SMARTKEY</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'SmartKeyInstallPage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Configurez votre serrure connectée</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="vpn_key" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg font-Raleway color-blue-custom text-bold">PARMÈTRES DU COMPTE</q-item-label>
          <q-item
              clickable
              v-ripple
              :to="{ name: 'MyAccountInformationPage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Information personnelles</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="account_circle" />
            </q-item-section>
          </q-item>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'MyAccountModifyPWPage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Modifier mon mot de passe</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="cached" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg font-Raleway color-blue-custom text-bold">HÉBERGEMENT DE VOYAGEURS</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'AdvertisementCreatePage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Créez votre bien</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="create" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg font-Raleway color-blue-custom text-bold">ADMINISTRATION</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'DashboardPublicationsAndRentsPage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Gestion des biens</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="event_available" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg font-Raleway color-blue-custom text-bold">JURIDIQUE</q-item-label>
          <q-item
              clickable
              v-ripple
              :to="{ name: 'GeneralConditionsPage' }"
          >
            <q-item-section class="font-Raleway color-blue-custom">Condition générales</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="library_books" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn class="q-mt-xl q-ml-sm font-Raleway"
               v-if="$store.getters.getToken"
               @click="logout"
               color="secondary"
               unelevated
               rounded >
          Déconnexion
        </q-btn>
      </div>
      </div>
    </template>

    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom" style="height: 400px;">
        <div class="row q-ma-xl">
          <div class="col-9">
            <h3 class="items-end font-Raleway text-white">Mon Compte</h3>
            <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
              Dans ce Dashboard, vous avez toutes les informations nécessaire à l'administration de la platforme
            </div>
          </div>
          <div class="col-3">
            <q-img
              fade
              src="../../assets/images/Settings.png"
              style="max-width: 83%;"/>
          </div>
        </div>
      </div>
      <div class="column q-ma-xl margin-custom font-Raleway">
        <q-list>
          <q-item-label header>INSTALLATION DE LA SMARTKEY</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'SmartKeyInstallPage' }"
          >
            <q-item-section>Configurez votre serrure connectée</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="vpn_key" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg">PARMÈTRES DU COMPTE</q-item-label>
          <q-item
              clickable
              v-ripple
              :to="{ name: 'MyAccountInformationPage' }"
          >
            <q-item-section>Information personnelles</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="account_circle" />
            </q-item-section>
          </q-item>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'MyAccountModifyPWPage' }"
          >
            <q-item-section>Modifier mon mot de passe</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="cached" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg">HÉBERGEMENT DE VOYAGEURS</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'AdvertisementCreatePage' }"
          >
            <q-item-section>Créez votre bien</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="create" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg">ADMINISTRATION</q-item-label>
          <q-item
              class="q-mb-lg"
              clickable
              v-ripple
              :to="{ name: 'DashboardPublicationsAndRentsPage' }"
          >
            <q-item-section>Gestion des biens</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="event_available" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header class="q-mt-lg">JURIDIQUE</q-item-label>
          <q-item
              clickable
              v-ripple
              :to="{ name: 'GeneralConditionsPage' }"
          >
            <q-item-section>Condition générales</q-item-section>
            <q-item-section avatar>
              <q-icon color="blue-grey-4" name="library_books" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn class="q-mt-xl q-ml-sm margin-custom-btn"
               v-if="$store.getters.getToken"
               @click="logout"
               color="secondary"
               unelevated
               rounded >
          Déconnexion
        </q-btn>
      </div>
    </template>
  </q-page>
</template>

<script>

import AuthService from '../../services/AuthService'

export default {
  name: 'MyAccountPage',
  methods: {
    logout () {
      AuthService.logout()
    }
  }
}

</script>
<style lang="sass" scoped>
  .bg-blue-custom
    background: rgb(45,64,78)
  .color-blue-custom
    color: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
  .margin-custom
    margin-left: 150px
    margin-right: 150px
  .margin-custom-btn
    margin-left: 250px
    margin-right: 250px
</style>
