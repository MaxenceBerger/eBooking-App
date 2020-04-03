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
      @submit="updateUser"
    >
      <q-input
          class="q-mb-lg"
          v-model="form.items.name"
          label="Nom de la serrure"
          :rules="[form.rules.name.required]"
          required
          rounded outlined
      />
      <q-input
          class="q-mb-lg"
          v-model="form.items.address"
          label="Adresse réseaux de votre clé"
          :rules="[form.rules.address.required]"
          required
          rounded outlined
      />
      <q-input
          class="q-mb-lg"
          v-model="form.items.auth"
          label="Authentification de votre clé"
          :rules="[form.rules.auth.required]"
          required
          rounded outlined
      />
      <div>
        <q-btn unelevated rounded color="secondary" label="Connecter la serrure" type="submit" class="q-mt-lg"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import UserService from '../services/UserService'
const STATUS_CODE_400 = 400

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
            required: v => !!v || 'Veuillez renseigner le nom de la serrure'
          },
          address: {
            required: v => !!v || 'Veuillez renseigner l\'adresse réseaux de votre clé'
          },
          auth: {
            required: v => !!v || 'Veuillez renseigner l\'authentification de votre clé'
          }
        }
      }
    }
  },
  methods: {
    updateUser () {
      this.$refs.form.validate()
      UserService.setUserUpdate({
        firstName: this.form.items.firstName,
        lastName: this.form.items.lastName,
        address: this.form.items.address,
        city: this.form.items.city,
        country: this.form.items.country,
        phone: this.form.items.phone,
        email: this.form.items.email,
        postalCode: this.form.items.postalCode
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vos informations ont bien été mis a jours',
            position: 'top'
          })
        }).catch((error) => {
          if (STATUS_CODE_400 === error.response.status) {
            this.$q.notify({
              type: 'negative',
              message: 'Veuillez réessayer',
              position: 'top'
            })
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
