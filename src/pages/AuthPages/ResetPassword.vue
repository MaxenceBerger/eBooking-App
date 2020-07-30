<template>
  <q-layout class="font-Raleway">
    <q-page-container>
      <q-page class="column items-center bg-reset-password">
        <q-form
          ref="form"
          @submit="sendByMail"
          class="q-gutter-md q-mt-xl q-pt-xl">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h4 q-mt-lg q-ml-lg text-bold color-blue-custom">Réinitialisation de<br>votre mot de passe</div>
              <div class="text q-mt-lg q-ml-lg">Un nouveau mot de passe vous sera envoyé par mail.
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="form.items.email"
                label="Adresse mail *"
                :rules="[form.rules.email.required, form.rules.email.min]"
                required
                rounded outlined
                class="q-mr-lg q-ml-lg"
                color="secondary"
              />
            </q-card-section>
            <div class="q-mr-lg q-ml-lg">
              <div>
                <q-btn unelevated rounded color="secondary" label="Envoyer" type="submit" class="q-mb-xl q-mt-lg q-ml-lg"/>
              </div>
            </div>
          </q-card>
        </q-form>
      </q-page>
      <Footer/>
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from 'src/services/AuthService'
import Footer from 'components/Footer'

export default {
  name: 'ResetPasswordPage',
  components: { Footer },
  data: () => {
    return {
      accept: false,
      persistent: false,
      form: {
        items: {
          email: ''
        },
        rules: {
          email: {
            required: v => !!v || 'Veuillez renseigner l\'email',
            min: v => /.+@.+/.test(v) || 'Veuillez renseigner un email valide'
          }
        }
      }
    }
  },
  methods: {
    sendByMail () {
      AuthService.resetPassword({
        email: this.form.items.email
      })
        .then(() => {
          this.$router.push({ name: 'LoginPage' })
          this.$q.notify({
            color: 'cyan-6',
            message: 'Un nouveau mot de passe provisoire vous a été envoyé par mail',
            icon: 'thumb_up',
            position: 'top'
          })
        }).catch(() => {
          this.$q.notify({
            color: 'red-6',
            message: 'Oups, echec de lenvoie du nouveau mot de passe',
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
  .bg-reset-password
    background-image: url('../../assets/images/Forgot-password.png')
    background-size: 29%
    background-repeat: no-repeat
    background-position: 95% 45%
    background-color: rgb(45, 64, 78)
</style>
