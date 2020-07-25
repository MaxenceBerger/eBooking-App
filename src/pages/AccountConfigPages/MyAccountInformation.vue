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
        <h3 class="q-ml-xl font-Raleway text-blue-grey-8">Mes Informations personnelles</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <q-uploader
          :factory="factoryFn"
          field-name="multipleFiles"
          label="Custom header"
          color="secondary"
          style="min-width: 600px"
          class="q-ml-xl q-mr-xl"
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
        <q-form
          style="max-width: 600px"
          ref="form"
          class="q-ml-xl q-mr-xl"
          @submit="updateUser"
        >
          <div class="row">
            <div class="col">
              <q-input
                class="q-mr-sm"
                v-model="form.items.firstName"
                label="Prénom"
                :rules="[form.rules.firstName.required]"
                required
                rounded outlined
              />
            </div>
            <div class="col">
              <q-input
                class="q-ml-sm"
                v-model="form.items.lastName"
                label="Nom"
                :rules="[form.rules.lastName.required]"
                required
                rounded outlined
              />
            </div>
          </div>
          <q-input
            v-model="form.items.email"
            label="Adresse mail"
            :rules="[form.rules.email.required, form.rules.password.min]"
            required
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
            label="Pays"

            rounded outlined
          />
          <q-input
            class="q-mb-lg"
            v-model="form.items.phone"
            label="Téléphone"
            rounded outlined
          />
          <div>
            <q-btn unelevated rounded color="secondary" label="Modifier mon compte" type="submit" class="q-mt-lg"/>
          </div>
        </q-form>
      </div>
      <div class="col-4">
        <q-img
          fade
          src="../../assets/images/Modify-profil.png"
          style="max-width: 80%;"/>
      </div>
    </div>
  </q-page>
</template>

<script>

import UserService from '../../services/UserService'
import uploadImgMixin from 'src/mixins/uploadImgMixin'
const STATUS_CODE_400 = 400

export default {
  name: 'MyAccountInformationPage',
  mixins: [uploadImgMixin],
  data: () => {
    return {
      dialogPassword: false,
      form: {
        items: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          phone: '',
          email: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          firstName: {
            required: v => !!v || 'Veuillez renseigner votre prénom'
          },
          lastName: {
            required: v => !!v || 'Veuillez renseigner votre nom'
          },
          email: {
            required: v => !!v || 'Veuillez renseigner l\'email',
            min: v => /.+@.+/.test(v) || 'Veuillez renseigner un email valide'
          },
          password: {
            required: value => !!value || 'Veuillez renseigner le mot de passe',
            min: v => v.length >= 6 || 'Minimum 6 caractères',
            dontShow: true
          }
        }
      }
    }
  },
  methods: {
    getUserProfile () {
      UserService.getUser()
        .then(response => {
          this.form.items = response.data.data
        }).catch(e => {
          console.log(e)
        })
    },
    updateUserAvatar () {
      UserService.updateImage({
        pictures: this.form.items.pictures
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Votre image de profil a bien été mis a jours',
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
    },
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
  },
  created () {
    this.getUserProfile()
  }
}
</script>
<style lang="sass" scoped>
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
