<template>
  <q-page class="column q-ma-lg">
    <h2 class="q-ml-xl">Dashboard d'administration</h2>
    <q-table
      title="Liste des utilisateurs"
      :data="data"
      :columns="columns"
      row-key="name">
      <template v-slot:data="props">
        <q-td>{{ props.role}}</q-td>
        <q-td :auto-width="true">
          <q-checkbox v-model="props.account" dense />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>

export default {
  name: 'AdminDashboardPage',
  data () {
    return {
      columns: [
        { name: 'lastName', align: 'center', label: 'Nom', field: 'lastName', sortable: true },
        { name: 'firstName', align: 'center', label: 'Prénom', field: 'firstName', sortable: true },
        { name: 'email', align: 'center', label: 'Mail', field: 'email', sortable: true },
        { name: 'role', align: 'center', label: 'Rôle', field: 'role', sortable: true },
        { name: 'account', align: 'center', label: 'Comptes actif', field: 'account', sortable: true }
      ],
      data: [
        {
          lastName: 'Berger',
          firstName: 'Maxence',
          email: 'maxence@berger.com',
          role: 'ADMIN',
          account: true
        }
      ]
    }
  },
  methods: {
  }
}

</script>
