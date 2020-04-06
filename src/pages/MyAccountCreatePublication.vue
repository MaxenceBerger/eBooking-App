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
        <h2 class="q-ml-xl">Gestion des biens</h2>
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
              <q-chip color="teal" dense text-color="white" label="Publié" class="q-pl-md q-pr-md"/>
              <q-chip v-if="rent.is_rented === true" color="info"
                      dense
                      text-color="white"
                      label="Réservé"
                      class="q-pl-md q-pr-md"/>
            </div>
            <div v-if="rent.is_published === false">
              {{rent.title.toUpperCase()}}
              <q-chip color="red" dense text-color="white" label="Non Publié" class="q-pl-md q-pr-md"/>
            </div>
          </q-item-label>
          <div class="q-ml-sm">
            {{rent.description}}
          </div>
          <q-separator class="q-mt-xl q-mb-sm"/>
          <div v-if="rent.is_rented === false && rent.is_published === true" class="q-mt-lg q-mb-sm">
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
              unelevated
              rounded
              color="primary"
              @click="openDialogConfirmDelete(rent._id)" >
            Supprimer
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary"
              @click="openDialogConfirmUnpublish(rent._id)">
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
              color="primary"
              @click="getPropertyDetails(rent._id)">
              Modifier
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary"
              @click="openDialogConfirmDelete(rent._id)" >
            Supprimer
            </q-btn>
            <q-btn
              class="q-ma-sm"
              unelevated
              rounded
              color="primary"
              @click="openDialogConfirmPublish(rent._id)" >
            Publier l'annonce
            </q-btn>
          </div>
        </q-card-section>
      </q-card-section>
      <q-dialog v-model="dialogDelete.dialog" persistent>
        <q-card>
          <q-card-section class="bg-teal text-white" >
            <div class="text-h6">Confirmation</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <span class="q-mt-sm">Êtes-vous sûr de vouloir supprimer le bien de votre liste ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Oui" color="teal" @click="deleteProperty(dialogDelete.id)" v-close-popup />
            <q-btn flat label="Non" color="teal" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogUnpublish.dialog" persistent>
        <q-card>
          <q-card-section class="bg-teal text-white" >
            <div class="text-h6">Confirmation</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <span class="q-mt-sm">Êtes-vous sûr de vouloir retirer l'annonce ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Oui" color="teal" @click="deletePublish(dialogUnpublish.id)" v-close-popup />
            <q-btn flat label="Non" color="teal" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogModify.dialog" persistent>
        <q-card>
          <q-card-section class="bg-teal text-white" >
            <div class="text-h6">Modification</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <q-form
              style="max-width: 500px"
              ref="form"
              class="q-ml-xl q-mr-xl"
            >
              <q-item-label header class="q-mb-lg">DESCRIPTION DU BIEN</q-item-label>

              <q-input
                class="q-mb-lg"
                v-model="form.rent.title"
                label="Titre de l'annonce"
                rounded outlined
                :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
              />
              <q-input
                class="q-mb-lg"
                v-model="form.rent.description"
                type="textarea"
                label="Description"
                rounded outlined
                :rules="[val => !!val || 'La description est requise']"
              />
              <q-input
                class="q-mb-lg"
                v-model="form.rent.capacity"
                type="number"
                label="Capacité maximum"
                rounded outlined
                :rules="[val => !!val || 'La capacité maximum est requise']"
              />
              <q-input
                class="q-mb-lg"
                v-model="form.rent.price"
                type="number"
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
                v-model="form.rent.area"
                type="number"
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
                emit-value
                map-options
                rounded
                outlined
                option-value="id"
                option-label="name"
                v-model="form.rent.associatedLock"
                :options="keyOptions"
                label="Sélectionnez une serrure"
                :rules="[val => !!val || 'Une sélection de serrure est requise']"
              />
              <q-separator class="q-mb-xl q-mt-xl"/>

              <q-item-label header class="q-mb-lg">COORDONNÉES DU BIEN</q-item-label>
              <q-input
                class="q-mb-lg"
                v-model="form.rent.address"
                label="Adresse"
                rounded outlined
                :rules="[val => !!val || 'Une adresse est requise']"
              />

              <div class="row">
                <div class="col-12 col-md-8">
                  <q-input
                    class="q-mb-lg q-mr-sm"
                    v-model="form.rent.city"
                    label="Ville"
                    rounded outlined
                    :rules="[val => !!val || 'Une ville est requise']"
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    class="q-mb-lg q-ml-sm"
                    v-model="form.rent.postalCode"
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
                v-model="form.rent.country"
                :options="countryOptions"
                label="Sélectionnez le Pays"
                :rules="[val => !!val || 'Un pays est requis']"
              />
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Quitter" color="teal" v-close-popup />
            <q-btn flat label="Modifier" color="teal" @click="updateProperty()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogPublish.dialog" persistent>
        <q-card>
          <q-card-section class="bg-teal text-white" >
            <div class="text-h6">Publication</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <span class="q-mt-sm q-mb-lg">Veuillez saisir les dates où vous voulez rendre vôtre bien disponible</span>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input
                  class="q-mr-sm"
                  v-model="dialogPublish.startAt"
                  mask="##/##/####"
                  label="Disponible du"
                  rounded
                  outlined
                  :rules="[val => !!val || 'Une date est requise']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ml-sm"
                  v-model="dialogPublish.finishAt"
                  mask="##/##/####"
                  label="Au"
                  rounded
                  outlined
                  :rules="[val => !!val || 'Une date est requise']"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Non" color="teal" v-close-popup />
            <q-btn flat label="Oui" color="teal" @click="publishProperty(dialogPublish.id)" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>

import RentsService from '../services/RentsService'
import LockService from '../services/LockService'
import { date } from 'quasar'
import PublicationsService from '../services/PublicationsService'

export default {
  name: 'MyAccountCreatePublicationPage',
  data: () => {
    return {
      countryOptions: [
        'France', 'Belgique', 'Suisse'
      ],
      keyOptions: [],
      dialogDelete: {
        dialog: false,
        id: '',
        title: ''
      },
      dialogModify: {
        dialog: false,
        id: '',
        title: ''
      },
      dialogPublish: {
        dialog: false,
        id: '',
        startAt: '',
        finishAt: ''
      },
      dialogUnpublish: {
        dialog: false,
        id: '',
        title: ''
      },
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
          country: '',
          associatedLock: ''
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
    openDialogConfirmDelete (id) {
      this.dialogDelete.dialog = true
      this.dialogDelete.id = id
    },
    deleteProperty (id) {
      RentsService.deleteRent(id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été supprimé',
            position: 'top'
          })
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    getPropertyDetails (id) {
      RentsService.getRentDetail(id)
        .then(response => {
          this.form.rent = response.data.data
          this.dialogModify.dialog = true
          this.dialogModify.id = id
          this.dialogPublish.id = id
        }).catch(e => {
          console.log(e)
        })
    },
    updateProperty () {
      RentsService.updateRent(this.dialogModify.id, {
        title: this.form.rent.title,
        description: this.form.rent.description,
        capacity: this.form.rent.capacity,
        price: this.form.rent.price,
        area: this.form.rent.area,
        pictures: this.form.rent.title,
        address: this.form.rent.address,
        city: this.form.rent.city,
        country: this.form.rent.country,
        postalCode: this.form.rent.postalCode,
        associatedLock: this.form.rent.associatedLock
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été mis à jour',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    openDialogConfirmPublish (id) {
      this.dialogPublish.dialog = true
      this.dialogPublish.id = id
    },
    async publishProperty () {
      const startAt = date.formatDate(this.dialogPublish.startAt, 'YYYY-MM-DD')
      const finishAt = date.formatDate(this.dialogPublish.finishAt, 'YYYY-MM-DD')
      await PublicationsService.publishProperty({
        start_at: startAt,
        end_at: finishAt,
        rent: this.dialogPublish.id
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été mis à jour',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    openDialogConfirmUnpublish (id) {
      this.dialogUnpublish.dialog = true
      this.dialogUnpublish.id = id
    },
    deletePublish (id) {
      PublicationsService.deletePublish(id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre publication a bien été retirer',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    getSmartKey () {
      LockService.getKey()
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i += 1) {
            this.keyOptions.push({
              id: response.data.data[i]._id,
              name: response.data.data[i].name,
              address: response.data.data[i].address
            })
          }
        }).catch(e => {
          console.log(e)
        })
    }
  },
  created () {
    this.getRentsList()
    this.getSmartKey()
  }
}
</script>
<style lang="sass" scoped>
</style>
