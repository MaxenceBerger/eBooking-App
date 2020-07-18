<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-form
          ref="form"
          @submit="sendByMail"
          class="q-gutter-md q-mt-lg">
          <q-card>
            <q-card-section>
              <div class="text-h4 q-ma-lg">Réinitialisation<br>de votre mot de passe</div>
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
              />
            </q-card-section>
            <div class="q-mr-lg q-ml-lg">
              <div>
                <q-btn unelevated rounded color="secondary" label="Envoyer" type="submit" class="q-mb-xl q-mt-lg"/>
              </div>
            </div>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from 'src/services/AuthService'

export default {
  name: 'ResetPasswordPage',
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
