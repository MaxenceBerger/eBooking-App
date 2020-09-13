<template>
  <q-layout class="font-Raleway">
    <!-- MOBILE PLATFORM-->
    <template v-if="this.$q.platform.is.mobile">
      <div class="q-pa-sm bg-register-mobile" style="padding-top: 70px;">
        <q-btn
            outline
            round
            class="q-ml-sm q-mt-sm"
            color="secondary"
            icon="arrow_back"
            :to="{ name: 'HomePublicPage' }"
        />
        <div class="text-h4 q-mt-lg q-ml-sm text-bold text-white">S'inscrire</div>
      </div>
      <q-page class="column items-center">
        <q-form
          ref="form"
          @submit="matchPassword"
          class="q-gutter-sm q-mt-lg">
            <q-card class="q-mr-md q-ml-lg q-pt-md">
              <q-card-section>
                <q-input
                  v-model="form.items.firstName"
                  label="Prénom *"
                  :rules="[form.rules.firstName.required]"
                  required
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.lastName"
                  label="Nom *"
                  :rules="[form.rules.lastName.required]"
                  required
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"

                />
                <q-input
                  v-model="form.items.email"
                  label="Adresse mail *"
                  :rules="[form.rules.email.required, form.rules.email.min]"
                  required
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"

                />
                <q-input
                  v-model="form.items.password"
                  :type="form.rules.password.dontShow ? 'password' : 'text'"
                  label="Mot de passe *"
                  :rules="[form.rules.password.required, form.rules.password.min]"
                  required
                  rounded outlined
                  class="q-ma-md"
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
                  :type="form.rules.confirmPassword.dontShow ? 'password' : 'text'"
                  label="Comfirmation du mot de passe *"
                  :rules="[form.rules.confirmPassword.required, form.rules.confirmPassword.min]"
                  required
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"

                >
                  <template v-slot:append>
                    <q-icon
                      :name="form.rules.confirmPassword.dontShow ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="form.rules.confirmPassword.dontShow = !form.rules.confirmPassword.dontShow"
                    />
                  </template>
                </q-input>
                <p class="text-red q-ml-lg">* champs requis</p>
              </q-card-section>
            <q-separator/>
              <q-card-section>
                <q-input
                  v-model="form.items.address"
                  label="Adresse"
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.city"
                  label="Ville"
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.postalCode"
                  label="Code Postal"
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.country"
                  label="Pays"
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.phone"
                  label="Téléphone"
                  rounded outlined
                  class="q-ma-md"
                  color="secondary"

                />
              </q-card-section>
            <q-separator/>
              <q-card-section>

              </q-card-section>
              <div class="q-ma-lg text-center">
                <q-toggle v-model="accept" color="secondary"/>
                J'accepte les
                <router-link :to="{ name: 'TermsAndConditionsPage' }">Termes et Conditions Générales.</router-link>
                <div>
                  <q-btn :disabled="!accept" unelevated rounded color="secondary" label="Inscription" type="submit" class="q-mb-xl q-mt-lg"/>
                </div>
              </div>
          </q-card>
        </q-form>
        <q-form>
          <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="min-width: 300px">
              <q-card-section>
                <div class="text-h6">Confirmation</div>
              </q-card-section>

              <q-card-section class="q-pt-none q-mb-lg">
                Veuillez saisir le code qui vous a été transmis par mail
                <br>
                <q-btn class="q-mt-lg"
                       outline rounded
                       @click="resendMail"
                       color="teal-1">
                  Renvoyer le code
                </q-btn>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal column items-center">
                <q-input
                  v-model="form.items.confirmCode"
                  label="Code"
                  class="q-mt-lg"
                  :rules="[form.rules.confirmCode.required, form.rules.confirmCode.min]"
                  required
                  rounded outlined
                />
                <q-btn
                ref="form"
                label="OK"
                @click="confirmMail"
                unelevated rounded
                color="secondary"
                class="q-mb-lg"
              />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-form>
      </q-page>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <q-page-container  v-if="this.$q.platform.is.desktop">
      <q-page class="column items-center bg-register">
        <q-form
          ref="form"
          @submit="matchPassword"
          class="q-gutter-md q-mt-lg">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h4 q-mt-lg q-ml-lg text-bold color-blue-custom">S'inscrire</div>
              </q-card-section>
              <q-card-section>
                <q-input
                  v-model="form.items.firstName"
                  label="Prénom *"
                  :rules="[form.rules.firstName.required]"
                  required
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"
                />
                <q-input
                  v-model="form.items.lastName"
                  label="Nom *"
                  :rules="[form.rules.lastName.required]"
                  required
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                />
                <q-input
                  v-model="form.items.email"
                  label="Adresse mail *"
                  :rules="[form.rules.email.required, form.rules.email.min]"
                  required
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                />
                <q-input
                  v-model="form.items.password"
                  :type="form.rules.password.dontShow ? 'password' : 'text'"
                  label="Mot de passe *"
                  :rules="[form.rules.password.required, form.rules.password.min]"
                  required
                  rounded outlined
                  class="q-ma-lg"
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
                  :type="form.rules.confirmPassword.dontShow ? 'password' : 'text'"
                  label="Comfirmation du mot de passe *"
                  :rules="[form.rules.confirmPassword.required, form.rules.confirmPassword.min]"
                  required
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                >
                  <template v-slot:append>
                    <q-icon
                      :name="form.rules.confirmPassword.dontShow ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="form.rules.confirmPassword.dontShow = !form.rules.confirmPassword.dontShow"
                    />
                  </template>
                </q-input>
                <p class="text-red q-ml-lg">* champs requis</p>
              </q-card-section>
            <q-separator/>
              <q-card-section>
                <q-input
                  v-model="form.items.address"
                  label="Adresse"
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                />

                <div class="row q-ma-lg">
                  <div class="col-12 col-md-8">
                    <q-input
                      v-model="form.items.city"
                      label="Ville"
                      rounded outlined
                      color="secondary"

                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="form.items.postalCode"
                      label="Code Postal"
                      rounded outlined
                      color="secondary"

                    />
                  </div>
                </div>
                <q-input
                  v-model="form.items.country"
                  label="Pays"
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                />
                <q-input
                  v-model="form.items.phone"
                  label="Téléphone"
                  rounded outlined
                  class="q-ma-lg"
                  color="secondary"

                />
              </q-card-section>
            <q-separator/>
              <q-card-section>

              </q-card-section>
              <div class="q-ma-lg text-center">
                <q-toggle v-model="accept" color="secondary"/>
                J'accepte les
                <router-link :to="{ name: 'TermsAndConditionsPage' }">Termes et Conditions Générales.</router-link>
                <div>
                  <q-btn :disabled="!accept" unelevated rounded color="secondary" label="Inscription" type="submit" class="q-mb-xl q-mt-lg"/>
                </div>
              </div>
          </q-card>
        </q-form>
        <q-form>
          <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="min-width: 300px">
              <q-card-section>
                <div class="text-h6">Confirmation</div>
              </q-card-section>

              <q-card-section class="q-pt-none q-mb-lg">
                Veuillez saisir le code qui vous a été transmis par mail
                <br>
                <q-btn class="q-mt-lg"
                       outline rounded
                       @click="resendMail"
                       color="teal-1">
                  Renvoyer le code
                </q-btn>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal column items-center">
                <q-input
                  v-model="form.items.confirmCode"
                  label="Code"
                  class="q-mt-lg"
                  :rules="[form.rules.confirmCode.required, form.rules.confirmCode.min]"
                  required
                  rounded outlined
                />
                <q-btn
                ref="form"
                label="OK"
                @click="confirmMail"
                unelevated rounded
                color="secondary"
                class="q-mb-lg"
              />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-form>
      </q-page>
      <Footer/>
    </q-page-container>
    <!-- /DESKTOP PLATFORM-->
  </q-layout>
</template>

<script>
import AuthService from 'src/services/AuthService.js'
import Footer from 'components/Footer'

const STATUS_CODE_400 = 400

export default {
  name: 'RegisterPage',
  components: { Footer },
  data: () => {
    return {
      accept: false,
      persistent: false,
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
          password: '',
          confirmPassword: '',
          confirmCode: ''
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
          },
          confirmPassword: {
            required: value => !!value || 'Veuillez renseigner le mot de passe',
            min: v => v.length >= 6 || 'Minimum 6 caractères',
            dontShow: true
          },
          confirmCode: {
            required: value => !!value || 'Code manquant',
            min: v => v.length >= 4 || 'Minimum 4 caractères',
            dontShow: true
          }
        }
      }
    }
  },
  methods: {
    matchPassword () {
      if (this.form.items.confirmPassword === this.form.items.password) {
        this.registerUser()
      } else {
        this.$q.notify({
          color: 'red-6',
          message: 'Le mot de passe et la confirmation ne correspond pas',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },
    registerUser () {
      this.$refs.form.validate()
      AuthService.setRegister({
        firstName: this.form.items.firstName,
        lastName: this.form.items.lastName,
        address: this.form.items.address,
        city: this.form.items.city,
        country: this.form.items.country,
        phone: this.form.items.phone,
        email: this.form.items.email,
        password: this.form.items.password
      })
        .then(() => {
          this.persistent = true
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
    },
    confirmMail () {
      AuthService.confirmRegister({
        email: this.form.items.email,
        otp: this.form.items.confirmCode
      })
        .then(() => {
          this.$router.push({ name: 'LoginPage' })
        }).catch(() => {
          this.$q.notify({
            color: 'red-6',
            message: 'Le code de confirmation ne correspond pas',
            icon: 'report_problem',
            position: 'top'
          })
        })
    },
    resendMail () {
      AuthService.resendConfirmRegister({
        email: this.form.items.email
      })
        .then(() => {
          this.$q.notify({
            color: 'cyan-6',
            message: 'Le code de confirmation a été renvoyé',
            icon: 'thumb_up',
            position: 'top'
          })
        }).catch(() => {
          this.$q.notify({
            color: 'red-6',
            message: 'Oups, echec du renvoie de code de confirmation',
            icon: 'report_problem',
            position: 'top'
          })
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .my-card
    width: 100%
    min-width: 500px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
  .color-blue-custom
    color: rgb(45, 64, 78)
  .bg-register
    background-image: url('../../assets/images/Mobile-login.png')
    background-size: 29%
    background-repeat: no-repeat
    background-position: 95% 45%
    background-color: rgb(45, 64, 78)
    justify-content: center
  .bg-register-mobile
    background-image: url('../../assets/images/Mobile-login.png')
    background-size: 29%
    background-repeat: no-repeat
    background-position: 90% 90%
    justify-content: center
</style>
