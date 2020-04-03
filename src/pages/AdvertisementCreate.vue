<template>
  <q-page class="column q-ma-lg">
    <div class="row">
      <div class="col-12 col-md-8">
        <q-btn
          outline
          round
          color="secondary"
          icon="arrow_back"
          @submit="createRent"
          :to="{ name: 'MyAccountPage' }"
        />
        <h2 class="q-ml-xl">Créez votre annonce </h2>
      </div>
    </div>
    <q-form
      style="max-width: 500px"
      ref="form"
      class="q-ml-xl q-mr-xl"
    >
      <q-input
        class="q-mb-lg"
        v-model="form.items.title"
        label="Titre de l'annonce"
        rounded outlined
        :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
      />
      <q-input
        class="q-mb-lg"
        v-model="form.items.description"
        type="textarea"
        label="Description"
        rounded outlined
        :rules="[val => !!val || 'La description est requise']"
      />
      <q-separator class="q-mb-xl q-mt-xl"/>
      <q-input
        class="q-mb-lg q-mt-lg"
        v-model="form.items.price"
        label="Prix"
        rounded outlined
        :rules="[val => !!val || 'Le prix est requis']"
      >
        <template v-slot:append>
          <q-icon name="euro" />
        </template>
      </q-input>
      <q-select
          class="q-mb-lg"
          rounded
          outlined
          v-model="form.items.key"
          :options="form.items.keyOptions"
          label="Sélectionnez votre clé"
          :rules="[val => !!val || 'Une sélection de clé est requis']"
      />
 <!--     <q-uploader
        :factory="factoryFn"
        label="Photos"
        multiple
        class="q-mb-lg"
        color="secondary"
      >
        <template v-slot:list="scope">
          <q-list separator>

            <q-item v-for="file in scope.files" :key="file.name">
              <q-item-section>
                <q-item-label class="full-width ellipsis">
                  {{ file.name }}
                </q-item-label>

                <q-item-label caption>
                  Status: {{ file.__status }}
                </q-item-label>

                <q-item-label caption>
                  {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                </q-item-label>
              </q-item-section>

              <q-item-section
                  v-if="file.__img"
                  thumbnail
                  class="gt-xs"
              >
                <img :src="file.__img.src">
              </q-item-section>

              <q-item-section top side>
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                  @click="scope.removeFile(file)"
                />
              </q-item-section>
            </q-item>

          </q-list>
        </template>
      </q-uploader>-->

      <q-input
        class="q-mb-lg"
        v-model="form.items.area"
        label="Surface en m³"
        rounded outlined
        :rules="[val => !!val || 'La surface est requis']"
      >
        <template v-slot:append>
          <q-icon name="aspect_ratio" />
        </template>
      </q-input>
<!--      <q-input
        class="q-mb-lg"
        v-model="form.items.pictures"
        label="PICTURES"
        rounded outlined
      />-->
      <q-separator class="q-mb-xl q-mt-xl"/>

      <q-input
          class="q-mb-lg"
          v-model="form.items.address"
          label="Adresse"
          rounded outlined
          :rules="[val => !!val || 'Une adresse est requise']"
      />

      <div class="row">
        <div class="col-12 col-md-8">
          <q-input
              class="q-mb-lg q-mr-sm"
              v-model="form.items.city"
              label="Ville"
              rounded outlined
              :rules="[val => !!val || 'Une ville est requise']"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
              class="q-mb-lg q-ml-sm"
              v-model="form.items.postalCode"
              label="Code Postal"
              rounded outlined
              :rules="[val => !!val || 'Un code postal est requis']"
          />
        </div>
      </div>
      <q-select
          class="q-mb-lg"
          rounded
          outlined
          v-model="form.items.country"
          :options="form.items.countryOptions"
          label="Sélectionnez le Pays"
          :rules="[val => !!val || 'Un pays est requis']"
      />
      <div>
        <q-btn unelevated rounded color="secondary" label="Création de l'annonce" type="submit" class="q-mt-lg"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>

const STATUS_CODE_400 = 400
import RentsService from '../services/RentsService'

export default {
  name: 'AdvertisementCreatePage',
  data: () => {
    return {
      dialogPassword: false,
      form: {
        items: {
          title: '',
          description: '',
          capacity: '',
          price: '',
          area: '',
          pictures: '',
          address: '',
          city: '',
          country: '',
          key: null,
          keyOptions: [
            'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
          ],
          countryOptions: [
            'France', 'Belgique', 'Suisse'
          ]
        }
      }
    }
  },
  methods: {
    createRent () {
      RentsService.setRent({
        title: this.form.items.title,
        description: this.form.items.description,
        capacity: this.form.items.capacity,
        price: this.form.items.price,
        area: this.form.items.area,
        pictures: this.form.items.pictures,
        address: this.form.items.address,
        city: this.form.items.city,
        country: this.form.items.country

      }).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Toto',
          position: 'top'
        })
      }).catch((error) => {
        if (STATUS_CODE_400 === error.response.status) {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Toto',
            icon: 'report_problem',
            position: 'top'
          })
        }
      })
    }
    //    factoryFn (files) {
    //      // returning a Promise
    //      console.log(files)
    //
    //      return new Promise((resolve) => {
    //        // simulating a delay of 2 seconds
    //        setTimeout(() => {
    //          resolve({
    //            url: '/upload'
    //          })
    //        }, 2000)
    //      })
    //    }
  }
}
</script>
<style lang="sass" scoped>
</style>
