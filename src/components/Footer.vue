<template>
  <div class="bg-mint-custom" style="height: 7rem;">
    <div class="col-12">
      <div class="row">
        <div class="col-2"/>
        <div class="col-3">
          <router-link :to="{ name: 'HomePublicPage' }">
            <img src="../assets/logo_eBooking.png" alt="logo" style="max-height: 50px" class="q-mt-md">
          </router-link>
        </div>
        <div class="col-5">
          <div class="row justify-between font-Raleway text-bold q-mt-lg">
            <router-link :to="{ name: 'HomePublicPage' }"
                         class="color-blue-custom"
                         style="text-decoration: none">
              Accueil
            </router-link>
            <router-link :to="{ name: 'LoginPage' }"
                         class="color-blue-custom"
                         style="text-decoration: none">
              Connexion
            </router-link>
            <router-link :to="{ name: 'RegisterPage' }"
                         class="color-blue-custom"
                         style="text-decoration: none">
              Inscription
            </router-link>
            <router-link :to="{ name: 'ResetPasswordPage' }"
                         class="color-blue-custom"
                         style="text-decoration: none">
              Mot de passe oublié
            </router-link>
            <router-link :to="{ name: 'TermsAndConditionsPage' }"
                         class="color-blue-custom"
                         style="text-decoration: none">
              Conditions générales
            </router-link>
          </div>
          <p class="text-right q-mt-lg color-copyright">eBooking © - 2020</p>
        </div>
        <div class="col-2"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="sass" scoped>
  .bg-blue-fade-custom
    background: rgba(45, 64, 78, 0.85)
  .bg-blue-custom
    background: rgb(45, 64, 78)
  .bg-mint-custom
    background-color: #26A69A
  .color-mint-custom
    color: #26A69A
  .color-blue-fade-custom
    color: rgba(45, 64, 78, 0.6)
  .color-blue-custom
    color: rgb(45, 64, 78)
  .color-copyright
    color: rgba(45, 64, 78, 0.5)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
