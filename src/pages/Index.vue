<template>
  <q-page class="column items-center">
    <div class="column row items-center"
        v-for="publication in publicationsList"
        :key="publication._id"
        v-bind="publication"
    >
      <q-card class="my-card">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">Id: {{ publication._id }}</div>
          <div class="text-subtitle2">par {{ publication.rent }}</div>
        </q-card-section>

        <q-card-actions align="around">
          <p>Begin at: {{ publication.start_at | format('MM/DD/YYYY hh:mm') }}</p>
          <p>End at: {{ publication.end_at | format('MM/DD/YYYY hh:mm')}}</p>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { getAllPublish } from 'src/services/RentSevices.js'

export default {
  name: 'PageIndex',
  data: function () {
    return {
      publicationsList: null
    }
  },
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
  created () {
    this.getPublications()
  }
}
</script>
