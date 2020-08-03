<template>
  <q-page class="column"><!--
  <q-page class="column q-ma-lg">-->
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ml-md q-mt-md">
          <div class="col-12">
            <q-btn
                outline
                round
                color="secondary"
                icon="arrow_back"
                :to="{ name: 'MyAccountPage' }"
            />
          </div>
        </div>

        <div class="row q-ml-md q-mr-md q-mb-md">
          <div class="col-8">
            <h5 class="items-end font-Raleway text-white">Mes Informations personnelles</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Modify-profil.png"
                style="max-width: 90%;"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-form
            style="max-width: 600px"
            ref="form"
            class="q-ma-xl"
            @submit="organizePictures"
          >
            <div class="row">
              <div class="col">
                <q-input
                  class="q-mr-sm font-Raleway"
                  v-model="form.items.firstName"
                  label="Prénom"
                  :rules="[form.rules.firstName.required]"
                  required
                  bg-color="white"
                  color="secondary"
                  rounded outlined
                />
              </div>
              <div class="col">
                <q-input
                  class="q-ml-sm font-Raleway"
                  v-model="form.items.lastName"
                  label="Nom"
                  :rules="[form.rules.lastName.required]"
                  required
                  bg-color="white"
                  color="secondary"
                  rounded outlined
                />
              </div>
            </div>
            <q-input
              class="font-Raleway"
              v-model="form.items.email"
              label="Adresse mail"
              :rules="[form.rules.email.required, form.rules.password.min]"
              required
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <q-toggle
              v-model="changePicture"
              color="secondary"
              class="q-mb-lg font-Raleway"
              label="Changer la photo de profil"
            />
            <q-uploader
              v-if="changePicture"
              :factory="factoryFn"
              field-name="multipleFiles"
              label="Custom header"
              color="secondary"
              class="q-mb-lg font-Raleway"
              auto-upload
              hide-upload-btn
              :max-files="1"
              @removed = "removePicture"
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                    <q-tooltip>Supprimer</q-tooltip>
                  </q-btn>
                  <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                    <q-tooltip>Supprimer l'image envoyé</q-tooltip>
                  </q-btn>
                  <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"></q-spinner>
                  <div class="col">
                    <div class="q-uploader__title">Insérez votre nouvelle photo de profil</div>
                  </div>
                  <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                    <q-uploader-add-trigger ></q-uploader-add-trigger>
                    <q-tooltip>Ajouter l'image</q-tooltip>
                  </q-btn>
                  <q-btn v-if="scope.canUpload" label="Envoyer" icon="cloud_upload" @click="scope.upload" dense flat >
                    <q-tooltip>Envoyer l'image</q-tooltip>
                  </q-btn>

                  <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" dense flat >
                    <q-tooltip>Abort Upload</q-tooltip>
                  </q-btn>
                </div>
              </template>
            </q-uploader>
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.address"
              label="Adresse"
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.city"
              label="Ville"
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.postalCode"
              label="Code Postale"
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.country"
              label="Pays"
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.phone"
              label="Téléphone"
              bg-color="white"
              color="secondary"
              rounded outlined
            />
            <div>
              <q-btn unelevated rounded color="secondary" label="Modifier mon compte" type="submit" class="q-mt-lg font-Raleway"/>
            </div>
          </q-form>
        </div>
      </div>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="row q-ma-lg">
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
      <div class="row q-ma-lg">
        <div class="col-8">
          <q-form
            style="max-width: 600px"
            ref="form"
            class="q-ml-xl q-mr-xl"
            @submit="organizePictures"
          >
            <div class="row">
              <div class="col">
                <q-input
                  class="q-mr-sm font-Raleway"
                  v-model="form.items.firstName"
                  label="Prénom"
                  :rules="[form.rules.firstName.required]"
                  required
                  bg-color="white"
                  rounded outlined
                />
              </div>
              <div class="col">
                <q-input
                  class="q-ml-sm font-Raleway"
                  v-model="form.items.lastName"
                  label="Nom"
                  :rules="[form.rules.lastName.required]"
                  required
                  bg-color="white"
                  rounded outlined
                />
              </div>
            </div>
            <q-input
              class="font-Raleway"
              v-model="form.items.email"
              label="Adresse mail"
              :rules="[form.rules.email.required, form.rules.password.min]"
              required
              bg-color="white"
              rounded outlined
            />
            <q-toggle
              v-model="changePicture"
              color="secondary"
              class="q-mb-lg font-Raleway"
              label="Changer la photo de profil"
            />
            <q-uploader
              v-if="changePicture"
              :factory="factoryFn"
              field-name="multipleFiles"
              label="Custom header"
              color="secondary"
              style="min-width: 600px"
              class="q-mb-lg font-Raleway"
              auto-upload
              hide-upload-btn
              :max-files="1"
              @removed = "removePicture"
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                    <q-tooltip>Supprimer</q-tooltip>
                  </q-btn>
                  <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                    <q-tooltip>Supprimer l'image envoyé</q-tooltip>
                  </q-btn>
                  <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"></q-spinner>
                  <div class="col">
                    <div class="q-uploader__title">Insérez votre nouvelle photo de profil</div>
                  </div>
                  <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                    <q-uploader-add-trigger ></q-uploader-add-trigger>
                    <q-tooltip>Ajouter l'image</q-tooltip>
                  </q-btn>
                  <q-btn v-if="scope.canUpload" label="Envoyer" icon="cloud_upload" @click="scope.upload" dense flat >
                    <q-tooltip>Envoyer l'image</q-tooltip>
                  </q-btn>

                  <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" dense flat >
                    <q-tooltip>Abort Upload</q-tooltip>
                  </q-btn>
                </div>
              </template>
            </q-uploader>
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.address"
              label="Adresse"
              bg-color="white"
              rounded outlined
            />

            <div class="row">
              <div class="col-12 col-md-8">
                <q-input
                  class="q-mb-lg q-mr-sm font-Raleway"
                  v-model="form.items.city"
                  label="Ville"
                  bg-color="white"
                  rounded outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  class="q-mb-lg q-ml-sm font-Raleway"
                  v-model="form.items.postalCode"
                  label="Code Postale"
                  bg-color="white"
                  rounded outlined
                />
              </div>
            </div>
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.country"
              label="Pays"
              bg-color="white"
              rounded outlined
            />
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.phone"
              label="Téléphone"
              bg-color="white"
              rounded outlined
            />
            <div>
              <q-btn unelevated rounded color="secondary" label="Modifier mon compte" type="submit" class="q-mt-lg font-Raleway"/>
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
    </template>
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
      changePicture: false,
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
      },
      pictureAdded: {
        title: '',
        ref: ''
      },
      pictureRemoved: {
        title: ''
      },
      tempPictures: [],
      tempPicturesToDelete: [],
      tempPicturesAdded: []
    }
  },
  methods: {
    tempPicture () {
      this.tempPictures.push(this.pictureAdded)
      this.tempPicturesAdded.push(this.pictureAdded.ref)
    },
    removePicture (files) {
      this.pictureRemoved.title = files[0].name
      for (let i = 0; i < this.tempPictures.length; i += 1) {
        if (this.tempPictures[i].title === files[0].name) {
          console.log(this.tempPictures)
          const allPictures = this.tempPictures
          this.tempPicturesToDelete.push(allPictures[i].ref)
        }
      }
    },
    organizePictures () {
      const PicturesAdded = this.tempPicturesAdded
      const PicturesDeleted = this.tempPicturesToDelete
      function arrayDiff (PicturesAdded, PicturesDeleted) {
        return [
          ...PicturesAdded.filter(x => !PicturesDeleted.includes(x)),
          ...PicturesDeleted.filter(x => !PicturesAdded.includes(x))
        ]
      }
      console.log(arrayDiff(PicturesAdded, PicturesDeleted))
      this.form.items.pictures = arrayDiff(PicturesAdded, PicturesDeleted)
      this.updateUser()
    },
    getUserProfile () {
      UserService.getUser()
        .then(response => {
          this.form.items = response.data.data
          console.log(response.data.data)
        }).catch(e => {
          console.log(e)
        })
    },
    updateUser () {
      this.$refs.form.validate()
      console.log(this.form.items.pictures[0])
      UserService.setUserUpdate({
        firstName: this.form.items.firstName,
        lastName: this.form.items.lastName,
        address: this.form.items.address,
        city: this.form.items.city,
        country: this.form.items.country,
        phone: this.form.items.phone,
        email: this.form.items.email,
        postalCode: this.form.items.postalCode,
        picture: this.form.items.pictures[0]
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vos informations serons mise à jour lors de votre prochaine connexion',
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
.text-shadow
  text-shadow: 1px 1px 6px black
.rounded-borders
  border-radius: 15px
.rounded-borders-title
  border-radius: 15px 0
.bg-blue-custom
  background: rgba(45,64,78,1)
.my-card
  width: 100%
  max-width: 350px
.font-Raleway
  font-family: 'Raleway', sans-serif
.font-Roboto
  font-family: 'Roboto', sans-serif
</style>
