<template>
  <q-page class="column q-ma-lg">
    <h2 class="q-ml-xl">Mon Compte</h2>

    <div class="q-ma-xl" style="max-width: 500px">
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
            <q-icon color="blue-grey-3" name="vpn_key" />
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
            <q-icon color="blue-grey-3" name="account_circle" />
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
            <q-icon color="blue-grey-3" name="cached" />
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
            <q-icon color="blue-grey-3" name="create" />
          </q-item-section>
        </q-item>

        <q-separator />
        <q-item-label header class="q-mt-lg">ADMINISTRATION</q-item-label>
        <q-item
            clickable
            v-ripple
            :to="{ name: 'MyAccountInformationPage' }"
        >
          <q-item-section>Publiez votre annonce</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-3" name="event_available" />
          </q-item-section>
        </q-item>
        <q-item
            clickable
            v-ripple
            :to="{ name: 'MyAccountInformationPage' }"
        >
          <q-item-section>Modifiez votre annonce</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-3" name="event_note" />
          </q-item-section>
        </q-item>
        <q-item
            clickable
            v-ripple
            :to="{ name: 'MyAccountInformationPage' }"
        >
          <q-item-section>Supprimez votre annonce</q-item-section>
          <q-item-section avatar>
            <q-icon color="blue-grey-3" name="event_busy" />
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
            <q-icon color="blue-grey-3" name="show_chart" />
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
            <q-icon color="blue-grey-3" name="library_books" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn class="q-mt-xl q-ml-sm"
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

import AuthService from '../services/AuthService'

export default {
  name: 'MyAccountPage',
  methods: {
    logout () {
      AuthService.logout()
    }
  }
}

</script>
