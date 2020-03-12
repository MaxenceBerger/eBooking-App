<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md q-mt-lg"
        >
          <q-input
            v-model="form.email"
            label="Adresse mail"
            :rules="[form.emailRules.required]"
            required
            rounded outlined
          />
          <q-input
            v-model="form.password"
            :type="form.passwordRules.dontShow ? 'password' : 'text'"
            label="Mot de passe"
            :rules="[form.passwordRules.required, form.passwordRules.min]"
            required
            rounded outlined
          >
            <template v-slot:append>
              <q-icon
                :name="form.passwordRules.dontShow ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="form.passwordRules.dontShow = !form.passwordRules.dontShow"
              />
            </template>
          </q-input>
          <div>
            <q-btn unelevated rounded color="secondary" label="Connexion" type="submit"/>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from 'src/services/AuthService.js'

export default {
  name: 'LoginPage',
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
          const { token } = response.data.data
          this.$store.commit('setToken', token)
          if (this.$store.getters.getToken) {
            this.$router.push({ name: 'HomePage' })
          }
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
