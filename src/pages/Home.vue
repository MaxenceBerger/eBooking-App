<template>
  <q-page class="column items-center">
    <q-card
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
<!--        <p>Begin at: {{ publication.start_at | format('MM/DD/YYYY hh:mm') }}</p>-->
<!--        <p>End at: {{ publication.end_at | format('MM/DD/YYYY hh:mm')}}</p>-->
      </q-card-actions>
    </q-card>
    <q-card
      class="my-card"
      v-for="rent in rentsList"
      :key="rent._id"
      v-bind="rent"
    >
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">Id: {{ rent.city }}</div>
        <div class="text-subtitle2">par {{ rent.title }}</div>
      </q-card-section>

      <q-card-actions align="around">
<!--        <p>Begin at: {{ publication.start_at | format('MM/DD/YYYY hh:mm') }}</p>-->
<!--        <p>End at: {{ publication.end_at | format('MM/DD/YYYY hh:mm')}}</p>-->
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'
import RentsService from '../services/RentsService'

export default {
  name: 'HomePage',

  data: () => ({
    publicationsList: null,
    rentsList: null
  }),
  methods: {
    getPublications () {
      PublicationsService.getAllPublish()
        .then(response => {
          this.publicationsList = response.data.data
        }).catch(e => {
          console.log(e)
        })
    },
    getRents () {
      RentsService.getAllRents()
        .then(response => {
          this.rentsList = response.data.data
        }).catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getPublications()
    this.getRents()
  }
}
</script>
