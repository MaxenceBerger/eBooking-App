<template>
  <q-page class="column">
    <template v-if="this.$q.platform.is.mobile">
      <div class="bg-blue-custom">
        <div class="row q-ma-md">
          <div class="col-8">
            <h5 class="items-end font-Raleway text-white">Dashboard d'administration</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Admin.png"
                style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ml-md q-mr-md">
          <div class="col-12 q-mb-md">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Dans ce Dashboard, vous avez toutes les informations nécessaire à l'administration de la platforme            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="col-6" >
            <q-card flat class="q-mt-md q-ml-md q-mr-sm bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="group" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.2em"  class="text-bold text-right font-Raleway">Utilisateurs</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1 font-Raleway" caption>Au total</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ userTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="q-mt-md q-ml-sm q-mr-md bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="person_add" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.2em"  class="text-bold text-right font-Raleway">Nouveaux inscrits</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1 font-Raleway" caption>Sept derniers jours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ userRegistrationLastWeek }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="q-mt-md q-ml-md q-mr-sm bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="location_city" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.2em"  class="text-bold text-right font-Raleway">Réservations</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1 font-Raleway" caption>Au total</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ reservationTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="q-mt-md q-ml-sm q-mr-md bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="card_travel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.2em"  class="text-bold text-right font-Raleway">Nouvelles Réservations</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1" caption>Sept derniers jours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ reservationTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
      <q-table
          flat
          class="q-ma-md"
          style="max-width: 92vw"
          :data="data"
          :columns="columns"
          :loading="loading"
          row-key="lastName"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="secondary" />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :disabled="props.row.email === emailStore">
            <q-td key="lastName" :props="props">
              {{ props.row.lastName }}
            </q-td>
            <q-td key="firstName" :props="props">
              {{ props.row.firstName }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="role" :props="props">
              <q-popup-edit v-model="props.row.role"
                            title="Mise à jour"
                            autoSave
                            :disable="props.row.email === emailStore">
                <q-select rounded
                          outlined
                          color="secondary"
                          v-model="props.row.role"
                          :options="optionsRole"
                          dense label="Sélection du rôle"
                          class="q-mb-lg"
                          @popup-hide="updateUserRole(props.row._id, props.row.role)"
                />
              </q-popup-edit>
              <q-badge outline v-if="props.row.role === 'ADMIN'" color="warning" class="q-pl-md q-pr-md">
                {{ props.row.role }}
              </q-badge>
              <q-badge outline v-if="props.row.role === 'USER'" color="info" class="q-pl-md q-pr-md">
                {{ props.row.role }}
              </q-badge>
            </q-td>
            <q-td key="account" :props="props">
              <q-popup-edit v-model="props.row.status"
                            title="Mise à jour"
                            autoSave
                            :disable="props.row.email === emailStore">
                <q-select rounded
                          outlined
                          color="secondary"
                          option-value="value"
                          option-label="label"
                          v-model="props.row.status"
                          :options="optionsStatus"
                          dense label="Sélection du status"
                          class="q-mb-lg"
                          @popup-hide="updateUserStatus(props.row._id, props.row.status)"
                />
              </q-popup-edit>
              <q-badge outline v-if="props.row.status === true" color="positive" class="q-pl-md q-pr-md">
                Actif
              </q-badge>
              <q-badge outline v-if="props.row.status === false" color="negative" class="q-pl-md q-pr-md">
                Désactivé
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom" style="height: 400px;">
        <div class="row q-ma-xl">
          <div class="col-9">
            <h3 class="items-end font-Raleway text-white">Dashboard d'administration</h3>
            <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway">
              Dans ce Dashboard, vous avez toutes les informations nécessaire à l'administration de la platforme
            </div>
          </div>
          <div class="col-3">
            <q-img
                fade
                src="../../assets/images/Admin.png"
                style="max-width: 83%;"/>
          </div>
        </div>
      </div>
      <div class="column q-ma-lg">
        <div class="row">
          <div class="col-3">
            <q-card flat class="my-card q-ma-xl bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="group" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-right">Utilisateurs</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1" caption>Au total</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ userTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat class="my-card q-ma-xl bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="person_add" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-right">Nouveaux inscrits</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1" caption>Sept derniers jours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ userRegistrationLastWeek }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat class="my-card q-ma-xl bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="location_city" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-right">Réservations</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1" caption>Au total</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ reservationTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat class="my-card q-ma-xl bg-teal-4 text-white">
              <q-item class="custom-card">
                <q-item-section avatar>
                  <q-icon color="white" name="card_travel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-right">Nouvelles Réservations</q-item-label>
                  <q-item-label class="text-right text-blue-grey-1" caption>Sept derniers jours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="bg-teal-5">
                <q-item-section>
                  <q-item-label class="text-h4 text-right">{{ reservationTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
      <q-table
          flat
          class="q-ml-xl q-mr-xl q-mb-xl"
          :data="data"
          :columns="columns"
          :loading="loading"
          row-key="lastName"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="secondary" />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :disabled="props.row.email === emailStore">
            <q-td key="lastName" :props="props">
              {{ props.row.lastName }}
            </q-td>
            <q-td key="firstName" :props="props">
              {{ props.row.firstName }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="role" :props="props">
              <q-popup-edit v-model="props.row.role"
                            title="Mise à jour"
                            autoSave
                            :disable="props.row.email === emailStore">
                <q-select rounded
                          outlined
                          v-model="props.row.role"
                          :options="optionsRole"
                          dense label="Sélection du rôle"
                          class="q-mb-lg"
                          @popup-hide="updateUserRole(props.row._id, props.row.role)"
                />
              </q-popup-edit>
              <q-badge outline v-if="props.row.role === 'ADMIN'" color="warning" class="q-pl-md q-pr-md">
                {{ props.row.role }}
              </q-badge>
              <q-badge outline v-if="props.row.role === 'USER'" color="info" class="q-pl-md q-pr-md">
                {{ props.row.role }}
              </q-badge>
            </q-td>
            <q-td key="account" :props="props">
              <q-popup-edit v-model="props.row.status"
                            title="Mise à jour"
                            autoSave
                            :disable="props.row.email === emailStore">
                <q-select rounded
                          outlined
                          option-value="value"
                          option-label="label"
                          v-model="props.row.status"
                          :options="optionsStatus"
                          dense label="Sélection du status"
                          class="q-mb-lg"
                          @popup-hide="updateUserStatus(props.row._id, props.row.status)"
                />
              </q-popup-edit>
              <q-badge outline v-if="props.row.status === true" color="positive" class="q-pl-md q-pr-md">
                Actif
              </q-badge>
              <q-badge outline v-if="props.row.status === false" color="negative" class="q-pl-md q-pr-md">
                Désactivé
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </q-page>
</template>

<script>

import AdminService from '../../services/AdminService'

export default {
  name: 'AdminDashboardPage',
  data () {
    return {
      userRegistrationLastWeek: '',
      reservationLastWeek: '',
      reservationTotal: '',
      userTotal: '',
      loading: true,
      emailStore: '',
      optionsRole: [
        'ADMIN', 'USER'
      ],
      optionsStatus: [
        {
          label: 'Actif',
          value: true
        },
        {
          label: 'Désactivé',
          value: false
        }
      ],
      columns: [
        {
          name: 'lastName',
          align: 'center',
          label: 'Nom',
          field: 'lastName',
          classes: 'bg-grey-3 ellipsis',
          headerClasses: 'bg-teal-5 text-white',
          sortable: true
        },
        {
          name: 'firstName',
          align: 'center',
          label: 'Prénom',
          field: 'firstName',
          classes: 'bg-grey-3 ellipsis',
          headerClasses: 'bg-teal-5 text-white',
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Mail',
          field: 'email',
          classes: 'bg-grey-3 ellipsis',
          headerClasses: 'bg-teal-5 text-white',
          sortable: true
        },
        {
          name: 'role',
          align: 'center',
          label: 'Rôle',
          field: 'role',
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-teal-4 text-white',
          sortable: true
        },
        {
          name: 'account',
          align: 'center',
          label: 'Status du compte',
          field: 'status',
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-teal-4 text-white',
          sortable: true
        }
      ],
      data: []
    }
  },
  methods: {
    getUserInformations () {
      AdminService.getUser()
        .then(response => {
          this.data = response.data.data
          this.emailStore = this.$store.getters.getEmail
          this.userTotal = response.data.data.length
          this.loading = false
        })
    },
    getUserRegistLastWeek () {
      AdminService.getUserRegistLastWeek()
        .then(response => {
          this.userRegistrationLastWeek = response.data.data.length
        })
    },
    getReservationLastWeek () {
      AdminService.getReservationLastWeek()
        .then(response => {
          this.reservationLastWeek = response.data.data.length
        })
    },
    getReservationList () {
      AdminService.getReservationList()
        .then(response => {
          this.reservationTotal = response.data.data.length
        })
    },
    updateUserRole (id, role) {
      AdminService.updateUser(id, {
        role: role
      })
        .then(() => {
          this.getUserInformations()
        })
    },
    updateUserStatus (id, status) {
      AdminService.updateUser(id, {
        status: status.value
      })
        .then(() => {
          this.getUserInformations()
        })
    }
  },
  created () {
    this.getUserInformations()
    this.getUserRegistLastWeek()
    this.getReservationLastWeek()
    this.getReservationList()
  }
}

</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
  .custom-card
    min-height: 100px
  .bg-blue-custom
    background: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
