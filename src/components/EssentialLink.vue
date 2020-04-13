<template>
  <q-item
    clickable
    tag="a"
    :to="{name: link}"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="font-Raleway">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
  .q-item.q-router-link--active, .q-item--active
    color: #269b8f
  .bg-blue-custom
    background: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
