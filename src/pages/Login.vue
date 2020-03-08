<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="form.email"
            label="Your email *"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="form.password"
            label="Your password"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { setLogin } from 'src/services/AuthService.js'

export default {
  name: 'LoginPage',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      setLogin(this.form)
        .then(response => {
          // const { user } = response.data.data
          const { token } = response.data.data
          // this.$store.commit('setUser', user)
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
