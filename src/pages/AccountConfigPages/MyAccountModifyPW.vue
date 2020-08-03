<template>
  <q-page class="column">
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
            <h5 class="items-end font-Raleway text-white">Modifier mon mot de passe</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Forgot-password.png"
                style="max-width: 90%;"/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <q-form
            style="max-width: 500px"
            ref="form"
            class="q-ma-xl font-Raleway"
            @submit="updatePassword"
          >
            <q-input
              v-model="form.items.oldPassword"
              :type="form.rules.password.dontShow ? 'password' : 'text'"
              label="Ancien mot de passe"
              :rules="[form.rules.password.required, form.rules.password.min]"
              required
              rounded outlined
              bg-color="white"
              color="secondary"
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
              bg-color="white"
              color="secondary"
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
              v-model="form.items.confirmPassword"
              :type="form.rules.password.dontShow ? 'password' : 'text'"
              label="Confirmation du nouveau mot de passe"
              :rules="[form.rules.password.required, form.rules.password.min]"
              required
              rounded outlined
              bg-color="white"
              color="secondary"
            >
              <template v-slot:append>
                <q-icon
                  :name="form.rules.password.dontShow ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="form.rules.password.dontShow = !form.rules.password.dontShow"
                />
              </template>
            </q-input>
            <div>
              <q-btn unelevated rounded color="secondary" label="Modifier mon mot de passe" type="submit" class="q-mt-lg"/>
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
          <h3 class="q-ml-xl font-Raleway text-blue-grey-8">Modifier mon mot de passe</h3>
        </div>
      </div>
      <div class="row q-ma-lg">
        <div class="col-8">
          <q-form
            style="max-width: 500px"
            ref="form"
            class="q-ml-xl q-mr-xl font-Raleway"
            @submit="updatePassword"
          >
            <q-input
              v-model="form.items.oldPassword"
              :type="form.rules.password.dontShow ? 'password' : 'text'"
              label="Ancien mot de passe"
              :rules="[form.rules.password.required, form.rules.password.min]"
              required
              rounded outlined
              bg-color="white"
              color="secondary"
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
              bg-color="white"
              color="secondary"
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
              v-model="form.items.confirmPassword"
              :type="form.rules.password.dontShow ? 'password' : 'text'"
              label="Confirmation du nouveau mot de passe"
              :rules="[form.rules.password.required, form.rules.password.min]"
              required
              rounded outlined
              bg-color="white"
              color="secondary"
            >
              <template v-slot:append>
                <q-icon
                  :name="form.rules.password.dontShow ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="form.rules.password.dontShow = !form.rules.password.dontShow"
                />
              </template>
            </q-input>
            <div>
              <q-btn unelevated rounded color="secondary" label="Modifier mon mot de passe" type="submit" class="q-mt-lg"/>
            </div>
          </q-form>
        </div>
        <div class="col-4">
          <q-img
            fade
            src="../../assets/images/Search-rent.png"
            style="max-width: 80%;"/>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>

import UserService from '../../services/UserService'
const STATUS_CODE_400 = 400

export default {
  name: 'MyAccountModifyPWPage',
  data: () => {
    return {
      dialogPassword: false,
      form: {
        items: {
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
