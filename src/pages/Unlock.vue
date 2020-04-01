<template>
  <q-page class="column items-center">
    <h1>Déverrouiller</h1>
    <q-btn
        outline
        round
        color="secondary"
        icon="vpn_key"
        @click="getUserProfile"
    />
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
