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
        <h2 class="q-ml-xl">Publiez votre annonce</h2>
      </div>
    </div>
    <q-card class="my-card q-mb-xl q-ml-xl q-mr-xl"
            style="max-width: 1000px"
      v-for="rent in getRents"
      :key="rent._id"
      v-bind="rent">
      <q-card-section horizontal>
        <q-img
          class="col-5"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
        ></q-img>

        <q-card-section>
          <q-item-label header class="q-mb-lg">
            <div v-if="rent.is_published === true">
              {{rent.title.toUpperCase()}}
              <q-chip color="teal" dense text-color="white" label="Publié" />
              <q-chip v-if="rent.is_rented === true" color="info" dense text-color="white" label="En Location" />
            </div>
            <div v-if="rent.is_published === false">
              {{rent.title.toUpperCase()}}
              <q-chip color="red" dense text-color="white" label="Non Publié" />
            </div>
          </q-item-label>
          <div class="q-ml-sm">
            {{rent.description}}
          </div>
          <q-separator class="q-mt-xl q-mb-sm"/>
          <div v-if="rent.is_rented === false && rent.is_published === true" class="q-mt-lg q-mb-sm">
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Modifier
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Supprimer
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Retirer l'annonce
            </q-btn>
          </div>
          <div v-if="rent.is_rented === true && rent.is_published === true" class="q-mt-lg q-mb-sm">
            <q-btn
              class="q-ma-sm"
              disable
              unelevated
              rounded
              color="primary">
              Modifier
            </q-btn>
            <q-btn
              class="q-ma-sm"
              disable
              unelevated
              rounded
              color="primary">
              Supprimer
            </q-btn>
            <q-btn
              class="q-ma-sm"
              disable
              unelevated
              rounded
              color="primary">
              Retirer l'annonce
            </q-btn>
          </div>
          <div v-if="rent.is_published === false" class="q-mt-lg q-mb-sm">
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Modifier
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Supprimer
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary">
              Publier l'annonce
            </q-btn>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import UserService from '../services/UserService'
import RentsService from '../services/RentsService'
const STATUS_CODE_400 = 400

export default {
  name: 'MyAccountCreatePublicationPage',
  data: () => {
    return {
      valid: false,
      dialogPassword: false,
      getRents: null,
      form: {
        rent: {
          title: '',
          description: '',
          capacity: '',
          price: '',
          area: '',
          pictures: [],
          address: '',
          city: '',
          postalCode: '',
          country: ''
        }
      }
    }
  },
  methods: {
    getRentsList () {
      RentsService.getRentsList()
        .then((response) => {
          this.getRents = response.data.data
        }).catch(e => {
          console.log(e)
        })
    },
    updateRent () {
      this.$refs.form.validate()
      UserService.setUserUpdate({
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
  },
  watch: {
    valid: (valid) => {
      console.log(valid)
    }
  },
  created () {
    this.getRentsList()
  }
}
</script>
<style lang="sass" scoped>
</style>
