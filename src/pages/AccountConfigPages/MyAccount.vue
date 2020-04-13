<template>
  <q-page class="column">
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
    <div class="column q-ma-xl margin-custom">
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
          <q-item-section>Créez votre annonce</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-4" name="create" />
          </q-item-section>
        </q-item>

        <q-separator />
        <q-item-label header class="q-mt-lg">ADMINISTRATION</q-item-label>
        <q-item
            clickable
            v-ripple
            :to="{ name: 'DashboardPublicationsAndRentsPage' }"
        >
          <q-item-section>Gestion des biens</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-4" name="event_available" />
          </q-item-section>
        </q-item>

        <q-item
            class="q-mb-lg"
            clickable
            v-ripple
            :to="{ name: 'MyAccountInformationPage' }"
        >
          <q-item-section>Statistiques</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-4" name="show_chart" />
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
