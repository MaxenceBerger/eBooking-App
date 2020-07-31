<template>
  <q-card class="my-card q-pa-lg" style="background-color: rgb(241, 241, 241);">
    <div class="text-h5 font-Raleway q-mb-lg">Paiement de votre réservation</div>
    <q-item>
      <q-item-section avatar>
        <q-icon color="secondary" name="house" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="font-Raleway">{{ publication.rent.title }} à {{ publication.rent.city }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon color="secondary" name="event" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="font-Raleway">Réservation du {{this.form.startAt}} au {{this.form.finishAt}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon color="secondary" name="euro" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="font-Raleway">Prix total location</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator class="q-mt-lg q-mb-lg" />
    <div class="font-Raleway q-mb-lg">Veuillez saisir vos informations</div>
    <stripe-elements
        class="font-Raleway"
        ref="elementsRef"
        :pk="publishableKey"
        :amount="amount"
        locale="fr"
        @token="tokenCreated"
        @loading="loading = $event"
    >
    </stripe-elements>
    <div class="text-right">
      <q-btn @click="submit" rounded color="secondary">Valider</q-btn>
    </div>
  </q-card>
</template>

<script>
import { StripeElements } from 'vue-stripe-checkout'
export default {
  name: 'PayementSystem',
  components: {
    StripeElements
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    publication: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    amount: 1000,
    nights: 1000,
    publishableKey: process.env.VUE_APP_PUBLIC_KEY_STRIPE,
    token: null,
    charge: null
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit()
    },
    tokenCreated (token) {
      this.token = token
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge)
    },
    sendTokenToServer (charge) {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create

    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    min-width: 500px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
