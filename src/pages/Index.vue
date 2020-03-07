<template>
  <q-page class="flex flex-center">
    <!--<img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >-->
    {{ Api }}
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      Api: process.env.VUE_APP_BASE_URL_EBOOKING
    }
  }
}
</script>
