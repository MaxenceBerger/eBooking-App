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
        <h2 class="q-ml-xl">Créez votre annonce</h2>
      </div>
    </div>
    <q-form
      style="max-width: 500px"
      ref="form"
      class="q-ml-xl q-mr-xl"
      @submit="createRent"
    >
      <q-item-label header class="q-mb-lg">DESCRIPTION DU BIEN</q-item-label>

      <q-input
        class="q-mb-lg"
        v-model="form.items.title"
        label="Titre de l'annonce"
        rounded outlined
        :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.description"
        type="textarea"
        label="Description"
        rounded outlined
        :rules="[val => !!val || 'La description est requise']"
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.capacity"
        label="Capacité maximum"
        rounded outlined
        :rules="[val => !!val || 'La capacité maximum est requise']"
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.price"
        label="Prix"
        rounded outlined
        :rules="[val => !!val || 'Le prix est requis']"
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
        :rules="[val => !!val || 'La surface est requis']"
      >
        <template v-slot:append>
          <q-icon name="aspect_ratio" />
        </template>
      </q-input>
      <q-select
        class="q-mb-lg"
        rounded
        outlined
        option-value="id"
        option-label="name"
        v-model="form.items.key"
        :options="form.items.keyOptions"
        label="Sélectionnez votre clé"
        :rules="[val => !!val || 'Une sélection de clé est requis']"
      />
      <!--
      <q-select
        class="q-mb-lg"
        rounded
        outlined
        v-model="form.items.keyOptions.name"
        :options="form.items.keyOptions.id"
        label="Sélectionnez votre clé"
        :rules="[val => !!val || 'Une sélection de clé est requis']"
      /> -->
      <q-separator class="q-mb-xl q-mt-xl"/>

      <q-item-label header class="q-mb-lg">COORDONNÉES DU BIEN</q-item-label>
      <q-input
          class="q-mb-lg"
          v-model="form.items.address"
          label="Adresse"
          rounded outlined
          :rules="[val => !!val || 'Une adresse est requise']"
      />

      <div class="row">
        <div class="col-12 col-md-8">
          <q-input
              class="q-mb-lg q-mr-sm"
              v-model="form.items.city"
              label="Ville"
              rounded outlined
              :rules="[val => !!val || 'Une ville est requise']"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
              class="q-mb-lg q-ml-sm"
              v-model="form.items.postalCode"
              label="Code Postal"
              rounded outlined
              :rules="[val => !!val || 'Un code postal est requis']"
          />
        </div>
      </div>
      <q-select
        class="q-mb-lg"
        rounded
        outlined
        v-model="form.items.country"
        :options="form.items.countryOptions"
        label="Sélectionnez le Pays"
        :rules="[val => !!val || 'Un pays est requis']"
      />
      <div>
        <q-btn unelevated rounded color="secondary" label="Création de l'annonce" type="submit" class="q-mt-lg q-mb-xl"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import RentsService from '../services/RentsService'
import LockService from '../services/LockService'

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
          pictures: [],
          address: '',
          city: '',
          postalCode: '',
          country: '',
          key: '',
          keyOptions: [],
          countryOptions: [
            'France', 'Belgique', 'Suisse'
          ]
        }
      }
    }
  },
  methods: {
    getSmartKey () {
      LockService.getKey()
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i += 1) {
            this.form.items.keyOptions.push({
              id: response.data.data[i]._id,
              name: response.data.data[i].name,
              address: response.data.data[i].address
            })
          }
        }).catch(e => {
          console.log(e)
        })
    },
    createRent () {
      RentsService.createRent({
        title: this.form.items.title,
        description: this.form.items.description,
        capacity: this.form.items.capacity,
        price: this.form.items.price,
        area: this.form.items.area,
        pictures: this.form.items.pictures,
        address: this.form.items.address,
        city: this.form.items.city,
        country: this.form.items.country,
        postalCode: this.form.items.postalCode,
        associatedLock: this.form.items.key.id
      }).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Le mot de passe a bien été mis à jours',
          position: 'top'
        })
      }).catch(() => {
        this.$q.notify({
          color: 'blue-grey',
          message: 'Oups, il semble que nous rencontrons des difficultés à modifier votre mot de passe',
          icon: 'report_problem',
          position: 'top'
        })
      })
    }
  },
  created () {
    this.getSmartKey()
  }
}
</script>
<style lang="sass" scoped>
</style>
