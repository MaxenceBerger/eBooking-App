<template>
  <q-page class="column items-center">
    <h5 class="items-end">Quelques suggestions</h5>
    <q-card
      class="my-card q-mb-lg rounded-borders"
      v-for="publication in publicationsList"
      :key="publication._id"
      v-bind="publication"
    >
      <router-link :to="{ path: '/publication/'+publication._id }">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="text-h5 text-secondary bg-title-custom rounded-borders-title">
          {{ publication.rent.title }}
          </div>
          <h4 class="text-white absolute-bottom text-right q-mr-lg q-mb-lg text-shadow">
            {{ publication.rent.price }} €/nuit
          </h4>
        </q-img>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>
import PublicationsService from 'src/services/PublicationsService.js'

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
    }
  },
  mounted () {
    this.getPublications()
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
  .bg-title-custom
    background: rgb(45,64,78)
  .my-card
    width: 100%
    max-width: 350px
</style>
