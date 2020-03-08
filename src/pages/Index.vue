<template>
  <q-page class="column items-center">
    <!--<q-card
      class="my-card"
      v-for="publication in publicationsList"
      :key="publication._id"
      v-bind="publication"
    >
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">Id: {{ publication._id }}</div>
        <div class="text-subtitle2">par {{ publication.rent }}</div>
      </q-card-section>

      <q-card-actions align="around">
        <p>Begin at: {{ publication.start_at | format('MM/DD/YYYY hh:mm') }}</p>
        <p>End at: {{ publication.end_at | format('MM/DD/YYYY hh:mm')}}</p>
      </q-card-actions>
    </q-card>-->
    {{ token }}
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

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
// import { getAllPublish } from 'src/services/PublicationsService.js'
import { setLogin } from 'src/services/AuthService.js'

export default {
  name: 'PageIndex',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      },
      accept: false,
      token: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.accept === true) {
        setLogin(this.form)
          .then(response => {
            // const { user } = response.data.data
            const { token } = response.data.data
            // this.$store.commit('setUser', user)
            this.$store.commit('setToken', token)
            console.log(this.$store)
          }).catch(e => {
            console.log(e)
          })
      }
    }
  },
  created () {
    console.log(this.$store.getters.getToken)
    this.token = this.$store.getters.getToken
  }

/*  data: () => ({
    publicationsList: null
  }),
  methods: {
    getPublications () {
      getAllPublish()
        .then(response => {
          this.publicationsList = response.data.data
        }).catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getPublications()
  } */
}
</script>
