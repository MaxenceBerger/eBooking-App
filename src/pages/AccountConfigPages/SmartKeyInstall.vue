<template>
  <q-page class="column">
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ml-md q-mt-md">
          <div class="col-12">
            <q-btn
                outline
                round
                color="secondary"
                icon="arrow_back"
                :to="{ name: 'MyAccountPage' }"
            />
          </div>
        </div>
        <div class="row q-ml-md q-mr-md q-mb-md">
          <div class="col-8">
            <h5 class="items-end font-Raleway text-white">Configurez votre serrure connectée</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Mobile-unlock.png"
                style="max-width: 90%;"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-form
              style="max-width: 500px"
              ref="form"
              class="q-ml-xl q-mr-xl"
              @submit="configKey"
          >
            <q-input
                class="q-mb-sm q-mt-xl font-Raleway"
                v-model="form.items.name"
                label="Nom de votre serrure"
                :rules="[form.rules.name.required]"
                bg-color="white"
                color="secondary"
                required
                rounded outlined
            />
            <q-avatar size="20px" class="font-Raleway text-bold text-white float-right" color="blue-grey-6">?
              <q-tooltip class="font-Raleway">
                Votre numéro de série est indiqué sur le dos de votre manuel d'instruction de la serrure connectée
              </q-tooltip>
            </q-avatar>
            <q-input
                class="q-mb-sm font-Raleway"
                v-model="form.items.serial"
                label="Le numéro de série"
                :rules="[form.rules.name.required]"
                bg-color="white"
                color="secondary"
                required
                rounded outlined
            />
            <div>
              <q-btn unelevated rounded color="secondary" label="Configuration de la serrure" type="submit" class="q-mt-lg font-Raleway"/>
            </div>
            <div v-if="dataTable.length !== 0">
              <q-separator class="q-mb-lg q-mt-xl"/>
              <q-toggle
                  v-model="deleteKeyTable"
                  color="secondary"
                  class="q-mb-lg font-Raleway"
                  label="Liste des clés configuré"
              />
              <q-list v-if="deleteKeyTable"
                      bordered
                      class="q-mb-lg font-Raleway"
              >
                <div v-for="data in dataTable"
                     :key="data.id">
                  <q-item class="bg-white">
                    <q-item-section>
                      <q-item-label>
                        {{data.name}}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section top side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn class="gt-xs" size="12px" flat dense round icon="delete"></q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
          </q-form>
        </div>
      </div>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="row q-ma-lg">
        <div class="col-12 q-mb-xl">
          <q-btn
            outline
            round
            color="secondary"
            icon="arrow_back"
            :to="{ name: 'MyAccountPage' }"
          />
          <h3 class="q-ml-xl font-Raleway text-blue-grey-8">Configurez votre serrure connectée</h3>
        </div>
      </div>
      <div class="row q-ma-lg">
        <div class="col-8">
          <q-form
            style="max-width: 500px"
            ref="form"
            class="q-ml-xl q-mr-xl"
            @submit="configKey"
          >
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.name"
              label="Nom de votre serrure"
              bg-color="white"
              color="secondary"
              :rules="[form.rules.name.required]"
              required
              rounded outlined
            />
            <q-avatar size="20px" class="font-Raleway text-bold text-white float-right" color="blue-grey-6">?
              <q-tooltip class="font-Raleway">
                Votre numéro de série est indiqué sur le dos de votre manuel d'instruction de la serrure connectée
              </q-tooltip>
            </q-avatar>
            <q-input
              class="q-mb-lg font-Raleway"
              v-model="form.items.serial"
              label="Le numéro de série"
              bg-color="white"
              color="secondary"
              :rules="[form.rules.serial.required]"
              required
              rounded outlined
            />
            <div>
              <q-btn unelevated rounded color="secondary" label="Configuration de la serrure" type="submit" class="q-mt-lg font-Raleway"/>
            </div>
            <div v-if="dataTable.length !== 0">
              <q-separator class="q-mb-lg q-mt-xl"/>
              <q-toggle
                  v-model="deleteKeyTable"
                  color="secondary"
                  class="q-mb-lg font-Raleway"
                  label="Changer la configuration des clés"
              />
              <q-list v-if="deleteKeyTable"
                      bordered
                      separator
                      class="q-mb-lg font-Raleway"
              >
                <div v-for="data in dataTable"
                     :key="data.id">
                  <q-item clickable v-ripple class="bg-white">
                    <q-item-section>{{data.name}}</q-item-section>
                    <q-btn class="gt-xs text-grey-8" size="12px" flat dense round icon="delete" @click="deleteSmartKey(data.id)"/>
                  </q-item>
                </div>
              </q-list>
            </div>
          </q-form>
        </div>
        <div class="col-4">
          <q-img
            fade
            src="../../assets/images/Mobile-unlock.png"
            style="max-width: 80%;"/>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>

import LockService from '../../services/LockService'

export default {
  name: 'SmartKeyInstallPage',
  data: () => {
    return {
      deleteKeyTable: false,
      form: {
        items: {
          name: '',
          serial: ''
        },
        rules: {
          name: {
            required: v => !!v || 'Veuillez renseigner le nom de votre serrure'
          },
          serial: {
            required: v => !!v || 'Veuillez renseigner le numéro de série de votre serrure'
          }
        }
      },
      columns: [
        { name: 'name', align: 'center', label: 'Nom de la clé', field: 'name', sortable: true },
        { name: 'name', align: 'center', label: 'Supprimer', field: 'name', sortable: true }
      ],
      dataTable: []
    }
  },
  methods: {
    configKey () {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        backgroundColor: '#2d404e'
      })
      this.$refs.form.validate()
      LockService.initLock({
        name: this.form.items.name,
        serial: this.form.items.serial
      })
        .then(() => {
          this.getSmartKey()
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: 'Votre serrure est parfaitement configuré',
            position: 'top'
          })
        }).catch(() => {
          this.getSmartKey()
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    getSmartKey () {
      LockService.getKey()
        .then((response) => {
          this.dataTable = []
          for (let i = 0; i < response.data.data.length; i += 1) {
            this.dataTable.push({
              id: response.data.data[i]._id,
              name: response.data.data[i].name,
              address: response.data.data[i].address
            })
          }
        }).catch(() => {
        })
    },
    deleteSmartKey (id) {
      LockService.lockDelete(id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Votre serrure est parfaitement supprimé',
            position: 'top'
          })
          this.getSmartKey()
        })
    }
  },
  created () {
    this.getSmartKey()
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
  .bg-blue-custom
    background: rgba(45,64,78,1)
  .my-card
    width: 100%
    max-width: 350px
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
