<template>
  <q-page class="column">
    <div class="bg-blue-custom" style="height: 400px;">
      <div class="row q-ma-xl">
        <div class="col-9">
          <h3 class="items-end font-Raleway text-white">Recherche</h3>
          <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
            Recherchez une réservation parmi notre selection
          </div>
        </div>
        <div class="col-3">
          <q-img
            fade
            src="../assets/images/Search-rent.png"
            style="max-width: 90%;"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'SearchPage'
}
</script>

<style lang="sass" scoped>
  .bg-blue-custom
    background: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
      font-family: 'Roboto', sans-serif
</style>
