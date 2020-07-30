<template>
  <q-layout class="font-Raleway">
    <q-page-container>
      <q-page class="column items-center bg-login">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md q-mt-xl q-pt-xl">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h4 q-mt-lg q-ml-lg text-bold color-blue-custom">Connexion</div>
            </q-card-section>
            <q-card-section>
            <q-input
              v-model="form.email"
              label="Adresse mail"
              :rules="[form.emailRules.required]"
              required
              rounded outlined
              class="q-ma-lg"
              color="secondary"
            />
            <q-input
              v-model="form.password"
              :type="form.passwordRules.dontShow ? 'password' : 'text'"
              label="Mot de passe"
              :rules="[form.passwordRules.required, form.passwordRules.min]"
              required
              rounded outlined
              class="q-ma-lg"
              color="secondary"
            >
              <template v-slot:append>
              <q-icon
                :name="form.passwordRules.dontShow ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="form.passwordRules.dontShow = !form.passwordRules.dontShow"
              />
            </template>
          </q-input>
            <q-separator/>
              <div class="q-mt-lg q-mb-lg">
                <router-link :to="{ name: 'ResetPasswordPage' }" class="q-ml-lg">Mot de passe oublié ?</router-link>
                <br>
                <router-link :to="{ name: 'RegisterPage' }" class="q-ml-lg">Pas encore de compte ?</router-link>
              </div>
          <div>
            <q-btn unelevated rounded class="q-ml-lg q-mb-lg" color="secondary" label="Connexion" type="submit"/>
          </div>
          </q-card-section>
          </q-card>
        </q-form>
      </q-page>
      <Footer/>
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from 'src/services/AuthService.js'
import Footer from 'components/Footer'

const STATUS_CODE_401 = 401

export default {
  name: 'LoginPage',
  components: { Footer },
  data: () => {
    return {
      form: {
        email: '',
        emailRules: {
          required: v => !!v || 'Veuillez renseigner l\'email',
          min: v => /.+@.+/.test(v) || 'Veuillez renseigner un email valide'
        },
        password: '',
        passwordRules: {
          required: value => !!value || 'Veuillez renseigner le mot de passe',
          min: v => v.length >= 6 || 'Minimum 6 caractères',
          dontShow: true
        }
      }
    }
  },
  methods: {
    onSubmit () {
      AuthService.setLogin(this.form)
        .then(response => {
          const { role } = response.data.data
          const { email } = response.data.data
          const { token } = response.data.data
          this.$store.commit('setRole', role)
          this.$store.commit('setEmail', email)
          this.$store.commit('setToken', token)
          if (this.$store.getters.getToken) {
            this.$router.push({ name: 'HomePage' })
          }
        }).catch((error) => {
          if (STATUS_CODE_401 === error.response.status) {
            this.$q.notify({
              color: 'blue-grey',
              message: 'Oups, il semble que les informations saisi sont incorrects',
              icon: 'report_problem',
              position: 'top'
            })
          }
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
  .bg-login
    background-image: url('../../assets/images/Mobile-login.png')
    background-size: 29%
    background-repeat: no-repeat
    background-position: 95% 45%
    background-color: rgb(45, 64, 78)
</style>
