<template>
  <q-page class="column q-ma-lg">
    <div class="row">
      <div class="col-12 col-md-8">
        <q-btn
          outline
          round
          color="secondary"
          icon="arrow_back"
          :to="{ name: 'MyAccountPage' }"
        />
        <h2 class="q-ml-xl">Installez votre serrure connectée</h2>
      </div>
    </div>
    <q-form
      style="max-width: 500px"
      ref="form"
      class="q-ml-xl q-mr-xl"
      @submit="configKey"
    >
      <q-input
        class="q-mb-lg"
        v-model="form.items.name"
        label="Nom de votre serrure"
        :rules="[form.rules.name.required]"
        required
        rounded outlined
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.address"
        label="L'adresse réseaux de votre serrure"
        :rules="[form.rules.address.required]"
        required
        rounded outlined
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.auth"
        label="Le nom d'authentification"
        :rules="[form.rules.auth.required]"
        required
        rounded outlined
      />
      <div>
        <q-btn unelevated rounded color="secondary" label="Configuration de la serrure" type="submit" class="q-mt-lg"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import LockService from '../services/LockService'

export default {
  name: 'SmartKeyInstallPage',
  data: () => {
    return {
      dialogPassword: false,
      form: {
        items: {
          name: '',
          address: '',
          auth: ''
        },
        rules: {
          name: {
            required: v => !!v || 'Veuillez renseigner le nom de votre serrure'
          },
          address: {
            required: v => !!v || 'Veuillez renseigner l\'adresse réseaux de votre serrure'
          },
          auth: {
            required: v => !!v || 'Veuillez renseigner l\'authentification de votre serrure'
          }
        }
      }
    }
  },
  methods: {
    configKey () {
      this.$refs.form.validate()
      LockService.initLock({
        name: this.form.items.name,
        address: this.form.items.address,
        auth: this.form.items.auth
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Votre serrure est parfaitement configuré',
            position: 'top'
          })
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
