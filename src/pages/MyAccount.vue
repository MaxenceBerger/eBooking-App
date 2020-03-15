<template>
  <q-page class="column items-center">
    <h2>Mon Compte</h2>
    <q-form
      class="q-mt-lg"
    >
      <div class="row">
        <div class="col">
          <q-input
            v-model="form.items.firstName"
            label="Prénom"
            :rules="[form.rules.firstName.required]"
            required
            rounded outlined
          />
        </div>
        <div class="col">
          <q-input
            v-model="form.items.lastName"
            label="Nom"
            :rules="[form.rules.lastName.required]"
            required
            rounded outlined
          />
        </div>
      </div>
      <q-input
        v-model="form.items.address"
        label="Adresse"
        :rules="[form.rules.address.required]"
        required
        rounded outlined
      />

      <div class="row">
        <div class="col-12 col-md-8">
          <q-input
            v-model="form.items.city"
            label="Ville"
            :rules="[form.rules.city.required]"
            required
            rounded outlined
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.items.postalCode"
            label="Code Postale"
            :rules="[form.rules.postalCode.required]"
            required
            rounded outlined
          />
        </div>
      </div>
      <q-input
        v-model="form.items.country"
        label="Pays"
        :rules="[form.rules.country.required]"
        required
        rounded outlined
      />
      <q-input
        v-model="form.items.phone"
        label="Téléphone"
        :rules="[form.rules.phone.required]"
        required
        rounded outlined
      />
      <q-input
        v-model="form.items.email"
        label="Adresse mail"
        :rules="[form.rules.email.required, form.rules.password.min]"
        required
        rounded outlined
      />
      <q-input
        v-model="form.items.password"
        :type="form.rules.password.dontShow ? 'password' : 'text'"
        label="Mot de passe"
        :rules="[form.rules.password.required, form.rules.password.min]"
        required
        rounded outlined
      >
        <template v-slot:append>
          <q-icon
            :name="form.rules.password.dontShow ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="form.rules.password.dontShow = !form.rules.password.dontShow"
          />
        </template>
      </q-input>
      <div>
        <q-btn unelevated rounded color="secondary" label="Modifier mon compte" type="submit" class="q-mt-lg"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

export default {
  name: 'MyAccountPage',
  data: () => {
    return {
      form: {
        items: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          phone: '',
          email: '',
          password: ''
        },
        rules: {
          firstName: {
            required: v => !!v || 'Veuillez renseigner votre prénom'
          },
          lastName: {
            required: v => !!v || 'Veuillez renseigner votre nom'
          },
          address: {
            required: v => !!v || 'Veuillez renseigner votre adresse'
          },
          city: {
            required: v => !!v || 'Veuillez renseigner la ville'
          },
          postalCode: {
            required: v => !!v || 'Veuillez renseigner le code postale'
          },
          country: {
            required: v => !!v || 'Veuillez renseigner le pays'
          },
          phone: {
            required: v => !!v || 'Veuillez renseigner votre téléphone'
          },
          email: {
            required: v => !!v || 'Veuillez renseigner l\'email',
            min: v => /.+@.+/.test(v) || 'Veuillez renseigner un email valide'
          },
          password: {
            required: value => !!value || 'Veuillez renseigner le mot de passe',
            min: v => v.length >= 6 || 'Minimum 6 caractères',
            dontShow: true
          }
        }
      }
    }
  }
}
</script>
