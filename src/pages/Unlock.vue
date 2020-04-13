<template>
  <q-page class="column">
    <div class="bg-blue-custom" style="height: 400px;">
      <div class="row q-ma-xl">
        <div class="col-9">
          <h3 class="items-end font-Raleway text-white">Déverrouiller votre porte</h3>
          <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
            Vous avez la possibilité de déverrouiller votre porte avec votre smartphone
          </div>
        </div>
        <div class="col-3">
          <q-img
            fade
            src="../assets/images/Mobile-unlock.png"
            style="max-width: 90%;"/>
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
