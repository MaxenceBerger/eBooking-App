<template>
  <q-page class="column items-center">
    <h2>Mon Compte</h2>
    <q-form
      ref="form"
      class="q-mt-lg"
      @submit="updateUser"
    >
      <div class="row">
        <div class="col">
          <q-input
            v-model="form.items.firstName"
            label="Prénom"
            :rules="[form.rules.firstName.required]"
            required
            rounded outlined
          />
        </div>
        <div class="col">
          <q-input
            v-model="form.items.lastName"
            label="Nom"
            :rules="[form.rules.lastName.required]"
            required
            rounded outlined
          />
        </div>
      </div>
      <q-input
        v-model="form.items.address"
        label="Adresse"
        :rules="[form.rules.address.required]"
        required
        rounded outlined
      />

      <div class="row">
        <div class="col-12 col-md-8">
          <q-input
            v-model="form.items.city"
            label="Ville"
            :rules="[form.rules.city.required]"
            required
            rounded outlined
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.items.postalCode"
            label="Code Postale"
            :rules="[form.rules.postalCode.required]"
            required
            rounded outlined
          />
        </div>
      </div>
      <q-input
        v-model="form.items.country"
        label="Pays"
        :rules="[form.rules.country.required]"
        required
        rounded outlined
      />
      <q-input
        v-model="form.items.phone"
        label="Téléphone"
        :rules="[form.rules.phone.required]"
        required
        rounded outlined
      />
      <q-input
        v-model="form.items.email"
        label="Adresse mail"
        :rules="[form.rules.email.required, form.rules.password.min]"
        required
        rounded outlined
      />
      <q-btn unelevated rounded color="secondary" label="Modifier mon mot de passe" @click="dialogPassword = true" />

      <div>
        <q-btn unelevated rounded color="secondary" label="Modifier mon compte" type="submit" class="q-mt-lg"/>
      </div>
      <q-dialog v-model="dialogPassword">
        <q-card>
          <q-card-section>
            <div class="text-h6">Modifer mon mot passe</div>
          </q-card-section>

          <q-card-section class="q-pt-xl" style="width: 500px">
            <q-form>
              <q-input
                  v-model="form.items.oldPassword"
                  :type="form.rules.password.dontShow ? 'password' : 'text'"
                  label="Ancien mot de passe"
                  :rules="[form.rules.password.required, form.rules.password.min]"
                  required
                  rounded outlined
              >
                <template v-slot:append>
                  <q-icon
                      :name="form.rules.password.dontShow ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="form.rules.password.dontShow = !form.rules.password.dontShow"
                  />
                </template>
              </q-input>
              <q-input
                  v-model="form.items.newPassword"
                  :type="form.rules.password.dontShow ? 'password' : 'text'"
                  label="Nouveau mot de passe"
                  :rules="[form.rules.password.required, form.rules.password.min]"
                  required
                  rounded outlined
              >
                <template v-slot:append>
                  <q-icon
                    :name="form.rules.password.dontShow ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="form.rules.password.dontShow = !form.rules.password.dontShow"
                />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Quitter" color="primary" @click="dialogPassword = false" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="matchPassword" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </q-page>
</template>

<script>

import UserService from '../services/UserService'
const STATUS_CODE_400 = 400

export default {
  name: 'MyAccountPage',
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
          address: {
            required: v => !!v || 'Veuillez renseigner votre adresse'
          },
          city: {
            required: v => !!v || 'Veuillez renseigner la ville'
          },
          postalCode: {
            required: v => !!v || 'Veuillez renseigner le code postale'
          },
          country: {
            required: v => !!v || 'Veuillez renseigner le pays'
          },
          phone: {
            required: v => !!v || 'Veuillez renseigner votre téléphone'
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
    matchPassword () {
      if (this.form.items.confirmPassword === this.form.items.password) {
        UserService.setUserUpdate({
          oldPassword: this.form.items.oldPassword,
          newPassword: this.form.items.newPassword
        })
        this.updateUser()
      } else {
        this.dialogPassword = true
        this.$q.notify({
          color: 'red-6',
          message: 'Le mot de passe et la confirmation ne correspond pas',
          icon: 'report_problem',
          position: 'top'
        })
      }
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
        email: this.form.items.email
      })
        .then(() => {
          this.dialogPassword = false
        }).catch((error) => {
          if (STATUS_CODE_400 === error.response.status) {
            this.$q.notify({
              color: 'blue-grey',
              message: 'Oups, il semble que les informations saisi sont incorrects',
              icon: 'report_problem',
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
