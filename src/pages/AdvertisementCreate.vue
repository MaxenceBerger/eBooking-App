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
        <h2 class="q-ml-xl">Advertisement Create Page</h2>
      </div>
    </div>
    <q-form
      style="max-width: 500px"
      ref="form"
      class="q-ml-xl q-mr-xl"
      @submit="updatePassword"
    >
      <q-input
        class="q-mb-lg"
        v-model="form.items.title"
        label="Titre de l'annonce"
        rounded outlined
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.description"
        type="textarea"
        label="Description"
        rounded outlined
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.price"
        label="Prix"
        rounded outlined
      >
        <template v-slot:append>
          <q-icon name="euro" />
        </template>
      </q-input>
      <q-input
        class="q-mb-lg"
        v-model="form.items.area"
        label="Surface en m³"
        rounded outlined
      >
        <template v-slot:append>
          <q-icon name="euro" />
        </template>
      </q-input>
      <q-input
        class="q-mb-lg"
        v-model="form.items.pictures"
        label="pictures"
        rounded outlined
      />
      <q-input
          class="q-mb-lg"
          v-model="form.items.address"
          label="Adresse"
          rounded outlined
      />

      <div class="row">
        <div class="col-12 col-md-8">
          <q-input
              class="q-mb-lg q-mr-sm"
              v-model="form.items.city"
              label="Ville"
              rounded outlined
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
              class="q-mb-lg q-ml-sm"
              v-model="form.items.postalCode"
              label="Code Postale"
              rounded outlined
          />
        </div>
      </div>
      <q-input
        class="q-mb-lg"
        v-model="form.items.country"
        label="country"
        rounded outlined
      />
      <div>
        <q-btn unelevated rounded color="secondary" label="Création de l'annonce" type="submit" class="q-mt-lg"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import UserService from '../services/UserService'
const STATUS_CODE_400 = 400

export default {
  name: 'AdvertisementCreatePage',
  data: () => {
    return {
      dialogPassword: false,
      form: {
        items: {
          title: '',
          description: '',
          capacity: '',
          price: '',
          area: '',
          pictures: '',
          address: '',
          city: '',
          country: ''
        }
      }
    }
  },
  methods: {
    updatePassword () {
      if (this.form.items.confirmPassword === this.form.items.newPassword) {
        UserService.updatePassword({
          oldPassword: this.form.items.oldPassword,
          newPassword: this.form.items.newPassword
        }).then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Le mot de passe a bien été mis à jours',
            position: 'top'
          })
        }).catch((error) => {
          if (STATUS_CODE_400 === error.response.status) {
            this.$q.notify({
              color: 'blue-grey',
              message: 'Oups, il semble que nous rencontrons des difficultés à modifier votre mot de passe',
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Le mot de passe et la confirmation ne correspond pas',
          position: 'top'
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
