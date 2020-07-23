<template>
  <q-page class="column">
    <div class="row q-ma-lg">
      <div class="col-12 col-md-8">
        <q-btn
          outline
          round
          color="secondary"
          icon="arrow_back"
          :to="{ name: 'MyAccountPage' }"
        />
        <h3 class="q-ml-xl font-Raleway text-blue-grey-8">Créez votre annonce</h3>
      </div>
    </div>
    <div class="row q-ml-lg">
      <div class="col-8">
        <q-form
          style="max-width: 650px"
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
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
          />
          <q-input
            class="q-mb-lg"
            v-model="form.items.description"
            type="textarea"
            label="Description"
            rounded outlined
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'La description est requise']"
          />
          <q-input
            class="q-mb-lg"
            v-model="form.items.capacity"
            type="number"
            label="Capacité maximum"
            rounded outlined
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'La capacité maximum est requise']"
          />
          <q-input
            class="q-mb-lg"
            v-model="form.items.price"
            type="number"
            label="Prix"
            rounded outlined
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'Le prix est requis']"
          >
            <template v-slot:append>
              <q-icon name="euro" />
            </template>
          </q-input>
          <q-input
            class="q-mb-lg"
            v-model="form.items.area"
            type="number"
            label="Surface en m³"
            rounded outlined
            bg-color="white"
            color="secondary"
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
            label="Sélectionnez votre serrure"
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'Une sélection de serrure est requise']"
          />
          <q-uploader
          :factory="factoryFn"
          field-name="multipleFiles"
          label="Custom header"
          multiple
          color="secondary"
          style="min-width: 650px"
          batch
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                <q-tooltip>Supprimer</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                <q-tooltip>Supprimer les images envoyé</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"></q-spinner>
              <div class="col">
                <div class="q-uploader__title">Insérez vos images</div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                <q-uploader-add-trigger ></q-uploader-add-trigger>
                <q-tooltip>Ajouter des images</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.canUpload" label="Envoyer" icon="cloud_upload" @click="scope.upload" dense flat >
                <q-tooltip>Envoyer vos images</q-tooltip>
              </q-btn>

              <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" dense flat >
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
          <q-separator class="q-mb-xl q-mt-xl"/>

          <q-item-label header class="q-mb-lg">COORDONNÉES DU BIEN</q-item-label>
          <q-input
            class="q-mb-lg"
            v-model="form.items.address"
            label="Adresse"
            rounded outlined
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'Une adresse est requise']"
          />

          <div class="row">
            <div class="col-12 col-md-8">
              <q-input
                class="q-mb-lg q-mr-sm"
                v-model="form.items.city"
                label="Ville"
                rounded outlined
                bg-color="white"
                color="secondary"
                :rules="[val => !!val || 'Une ville est requise']"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                class="q-mb-lg q-ml-sm"
                v-model="form.items.postalCode"
                label="Code Postal"
                rounded outlined
                bg-color="white"
                color="secondary"
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
            bg-color="white"
            color="secondary"
            :rules="[val => !!val || 'Un pays est requis']"
          />
          <div>
            <q-btn unelevated rounded color="secondary" label="Création de l'annonce" type="submit" class="q-mt-lg q-mb-xl"/>
          </div>
        </q-form>
      </div>
      <div class="col-4">
        <q-img
          fade
          src="../../assets/images/Create-Ad.png"
          style="max-width: 80%;"/>
      </div>
    </div>
  </q-page>
</template>

<script>

import RentsService from '../../services/RentsService'
import LockService from '../../services/LockService'
import uploadImgMixin from '../../mixins/uploadImgMixin'

export default {
  name: 'AdvertisementCreatePage',
  mixins: [uploadImgMixin],
  data: () => {
    return {
      editForm: [],
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
          startAt: '',
          finishAt: '',
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
        city: this.form.items.city.toLowerCase(),
        country: this.form.items.country,
        postalCode: this.form.items.postalCode,
        associatedLock: this.form.items.key.id
      }).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Le bien a été créé avec succès',
          position: 'top'
        })
        this.$q.notify({
          type: 'info',
          message: 'Sur cette page vous avez la posibilité de gerer vos biens',
          timeout: 4000,
          position: 'top'
        })
        this.$router.push({ name: 'DashboardPublicationsAndRentsPage' })
      }).catch(() => {
        this.$q.notify({
          color: 'blue-grey',
          message: 'Oups, il semble que nous rencontrons des difficultés',
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
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
