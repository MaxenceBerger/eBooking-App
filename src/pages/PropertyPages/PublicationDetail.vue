<template>
  <q-page class="column">
    <div>
      <q-carousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>

    <div class="q-pa-xl">
      <div class="text-h3">{{ publication.rent.title }}</div>
      <div class="text-subtitle2 q-mb-xl">{{ publication.rent.city }}, {{ publication.rent.country }}</div>
      <div class="row">
        <div class="col-12 col-md-8">
          <q-separator />
          <div class="text-h5 q-ma-lg">Informations</div>
          <q-item-section class="q-ma-lg">
            <q-item>
              <q-item-section avatar>
                <q-icon color="secondary" name="supervised_user_circle" />
              </q-item-section>
              <q-item-section>
                <q-item-label>La capacité maximum est de {{ publication.rent.capacity }} personnes</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="secondary" name="aspect_ratio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>La superficie est de {{ publication.rent.area }} m³</q-item-label>
              </q-item-section>
            </q-item>
          </q-item-section>
          <q-separator />
          <div class="text-h5 q-ma-lg">Description</div>
          <div class="text-weight-regular text-body2 text-justify q-ma-lg">{{ publication.rent.description }}</div>
        </div>
        <div class="col-12 col-md-4 column items-center">
          <q-form @submit="reserveRent">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-subtitle1 q-ma-sm q-mb-lg"> <strong>{{ publication.rent.price }} €</strong> la location</div>
                <q-separator />
                <q-item-section class="q-mt-lg">
                  <q-item>
                    <div class="row">
                      <div class="col-12">
                        <q-input
                          v-model="form.startAt"
                          label="Réservation du"
                          rounded
                          outlined
                          color="secondary"
                          :rules="[val => !!val || 'Une date est requise']"
                        >
                          <template v-slot:append>
                            <q-icon color="secondary" name="event">
                              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date mask="DD/MM/YYYY"
                                        v-model="form.startAt"
                                        :locale="myLocale"
                                        color="secondary"
                                        :options="dateArray"
                                        today-btn minimal>
                                  <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn label="OK" color="secondary" flat v-close-popup />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="form.finishAt"
                          label="Au"
                          rounded
                          outlined
                          color="secondary"
                          :rules="[val => !!val || 'Une date est requise']"
                        >
                          <template v-slot:append>
                            <q-icon color="secondary" name="event">
                              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date mask="DD/MM/YYYY"
                                        v-model="form.finishAt"
                                        :locale="myLocale"
                                        color="secondary"
                                        :options="dateArray"
                                        today-btn minimal>
                                  <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn label="OK" color="secondary" flat v-close-popup />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-item>
                </q-item-section>
              </q-card-section>
              <q-separator />
                <q-card-actions vertical>
                  <q-btn color="secondary"
                         type="submit">
                    Reservation
                  </q-btn>
                </q-card-actions>
            </q-card>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import PublicationsService from '../../services/PublicationsService'
import ReservationService from '../../services/ReservationService'

const STATUS_CODE_401 = 401

export default {
  name: 'PublicationDetail',
  data: () => ({
    slide: 1,
    publication: {
      rent: {}
    },
    form: {
      idPublication: '',
      startAt: '',
      finishAt: ''

    },
    idPublication: '',
    dialog: false,
    today_date: '',
    dateArray: [],
    myLocale: {
      days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
      daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
      months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
      monthsShort: 'Janv_Fév_Mars_Avr_Mais_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split('_'),
      firstDayOfWeek: 1
    }
  }),
  methods: {
    getPublication () {
      PublicationsService.getPublish(this.$route.params.idPublication)
        .then(response => {
          const ReservationDateArray = []
          for (let i = 0; i < response.data.data.rent.reservations.length; i += 1) {
            let ReservationStartAt = moment(response.data.data.rent.reservations[i].from)
            const ReservationEndAt = moment(response.data.data.rent.reservations[i].to)
            while (ReservationStartAt <= ReservationEndAt) {
              ReservationDateArray.push(moment(ReservationStartAt).format('YYYY/MM/DD'))
              ReservationStartAt = moment(ReservationStartAt).add(1, 'days')
            }
          }
          const RentDateArray = []
          let RentStartAt = moment(response.data.data.start_at)
          const RentEndAt = moment(response.data.data.end_at)
          while (RentStartAt <= RentEndAt) {
            RentDateArray.push(moment(RentStartAt).format('YYYY/MM/DD'))
            RentStartAt = moment(RentStartAt).add(1, 'days')
          }
          function arrayDiff (RentDateArray, ReservationDateArray) {
            return [
              ...RentDateArray.filter(x => !ReservationDateArray.includes(x)),
              ...ReservationDateArray.filter(x => !RentDateArray.includes(x))
            ]
          }
          this.dateArray = arrayDiff(RentDateArray, ReservationDateArray)
          this.publication = response.data.data
          this.publication.start_at = moment(response.data.data.start_at).format('YYYY/MM/DD')
          this.publication.end_at = moment(response.data.data.end_at).format('YYYY/MM/DD')
          this.today_date = moment().format('YYYY/MM/DD')
          this.form.idPublication = response.data.data._id
        }).catch(e => {
          console.log(e)
        })
    },
    reserveRent () {
      ReservationService.setReservation({
        publication: this.form.idPublication,
        start_at: moment(this.form.startAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        // api crash => end_at: "Invalid date"
        end_at: moment(this.form.finishAt, 'DD/MM/YYYY').format('YYYY-MM-DD')
      }).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Votre réservation a bien été enregistré',
          position: 'top'
        })
        this.getPublication()
      }).catch((error) => {
        if (STATUS_CODE_401 === error.response.status) {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Oups, il semble que cette publication soit déjà reservé',
            icon: 'report_problem',
            position: 'top'
          })
        } else {
          this.$q.notify({
            color: 'blue-grey',
            message: 'Oups, il semble que nous rencontrons des problèmes sur votre réservation',
            icon: 'report_problem',
            position: 'top'
          })
        }
      })
    }
  },
  created () {
    this.getPublication()
  }
}
</script>
<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
