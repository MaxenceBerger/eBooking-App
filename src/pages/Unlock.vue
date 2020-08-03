<template>
  <q-page class="column">
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="font-Raleway text-white">Déverrouiller votre porte</h5>
          </div>
          <div class="col-4">
            <q-img
              class="q-mt-lg"
              fade
              src="../assets/images/Mobile-unlock.png"
              style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ml-md q-mr-md q-mb-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Vous avez la possibilité de déverrouiller votre porte avec votre smartphone
            </div>
          </div>
        </div>
      </div>
      <div class="column items-center q-ma-xl">
        <q-btn
          outline
          round
          color="secondary"
          icon="vpn_key"
          @click="getUserProfile"
        />
      </div>
    </template>
  </q-page>
</template>

<script>

import LockService from '../services/LockService'

export default {
  name: 'UnlockPage',
  methods: {
    getUserProfile () {
      LockService.unlockDoor()
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Porte déverrouillé',
            position: 'top'
          })
        })
        .catch(e => {
          console.log(e)
        })
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
</style>
