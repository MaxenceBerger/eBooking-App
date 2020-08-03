<template>
  <q-page class="column">
    <!-- MOBILE PLATFORM-->
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
            <h5 class="items-end font-Raleway text-white">Gestion des biens</h5>
          </div>
          <div class="col-4">
            <q-img
                class="q-mt-lg"
                fade
                src="../../assets/images/Config-rent.png"
                style="max-width: 90%;"/>
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col-12">
            <div class="text-weight-regular text-justify text-grey-5 font-Raleway">
              Dans cette page, vous avez toutes les informations nécessaires à l'administration de vos biens
            </div>
          </div>
        </div>
      </div>
      <q-card class="my-card q-ma-md"
        v-for="rent in getRents"
        :key="rent._id"
        v-bind="rent">
        <q-img
            :ratio="16/9"
            :src="imageUrl + rent.pictures[0]"
        />

          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              L'image n'a pas pu charger correctement
            </div>
          </template>
          <q-card-section>
            <q-chip
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-70%);"
            />
            <div v-if="rent.is_published === true">
              <q-chip
                  color="teal"
                  text-color="white"
                  label="Publié"
                  class="q-pl-md q-pr-md q-mr-md font-Raleway absolute absolute-right"
                  style="top: 0; transform: translateY(-70%);"
              />
              <q-chip v-if="rent.reservations.length > 0" color="info"
                      text-color="white"
                      label="Réservé"
                      class="q-pl-md q-pr-md q-mr-md font-Raleway absolute"
                      style="top: 0; right: 90px; transform: translateY(-70%);"
              />
            </div>
            <div v-if="rent.is_published === false">
              <q-chip
                  color="red"
                  text-color="white"
                  label="Non Publié"
                  class="q-pl-md q-pr-md q-mr-md font-Raleway absolute absolute-right"
                  style="top: 0; transform: translateY(-70%);"
              />
            </div>
            <q-item-label header>
              {{rent.title.toUpperCase()}}

              <div class="q-mt-sm"
              v-for="reservations in rent.reservations" :key="reservations._id">
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Date de réservation :</q-item-label>
                      <q-item-label>Du {{ reservations.from | moment}} au {{ reservations.to | moment}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-item-label>
            <div class="q-mt-sm q-ml-sm">
              {{rent.description}}
            </div>
            <q-separator class="q-mt-xl q-mb-sm"/>
            <div v-if="rent.reservations.length === 0 && rent.is_published === true" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                disable
                unelevated
                rounded>
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                unelevated
                rounded
                @click="openDialogConfirmDelete(rent._id)" >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                unelevated
                rounded
                @click="openDialogConfirmUnpublish(rent.publication_id)">
                Retirer l'annonce
              </q-btn>
            </div>
            <div v-if="rent.reservations.length > 0 && rent.is_published === true" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                disable
                unelevated
                rounded >
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                disable
                unelevated
                rounded >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                disable
                unelevated
                rounded >
                Retirer l'annonce
              </q-btn>
            </div>
            <div v-if="rent.is_published === false" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                unelevated
                rounded
                @click="getPropertyDetails(rent._id)">
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                unelevated
                rounded
                @click="openDialogConfirmDelete(rent._id)" >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary font-Raleway full-width"
                unelevated
                rounded
                @click="openDialogConfirmPublish(rent._id)" >
              Publier l'annonce
              </q-btn>
            </div>
          </q-card-section>
        <q-dialog v-model="dialogDelete.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Confirmation</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm">Êtes-vous sûr de vouloir supprimer le bien de votre liste ?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Oui" color="teal" @click="deleteProperty(dialogDelete.id)" v-close-popup />
              <q-btn flat label="Non" color="teal" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogUnpublish.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Confirmation</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm">Êtes-vous sûr de vouloir retirer l'annonce ?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Oui" color="teal" @click="deletePublish(dialogUnpublish.id)" v-close-popup />
              <q-btn flat label="Non" color="teal" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogModify.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Modification</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <q-form
                class="font-Raleway"
                style="min-width: 300px"
                ref="form"
              >
                <q-item-label header class="q-mb-lg">DESCRIPTION DU BIEN</q-item-label>

                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.title"
                  label="Titre de l'annonce"
                  rounded outlined
                  :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
                />
                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.description"
                  type="textarea"
                  label="Description"
                  rounded outlined
                  :rules="[val => !!val || 'La description est requise']"
                />
                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.capacity"
                  type="number"
                  label="Capacité maximum"
                  rounded outlined
                  :rules="[val => !!val || 'La capacité maximum est requise']"
                />
                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.price"
                  type="number"
                  label="Prix"
                  rounded outlined
                  :rules="[val => !!val || 'Le prix est requis']"
                >
                  <template v-slot:append>
                    <q-icon name="euro" />
                  </template>
                </q-input>
                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.area"
                  type="number"
                  label="Surface en m³"
                  rounded outlined
                  :rules="[val => !!val || 'La surface est requis']"
                >
                  <template v-slot:append>
                    <q-icon name="aspect_ratio" />
                  </template>
                </q-input>
                <q-select
                  class="q-ma-sm"
                  emit-value
                  map-options
                  rounded
                  outlined
                  option-value="id"
                  option-label="name"
                  v-model="form.rent.associatedLock"
                  :options="keyOptions"
                  label="Sélectionnez une serrure"
                  :rules="[val => !!val || 'Une sélection de serrure est requise']"
                />
                <q-separator class="q-mb-xl q-mt-xl"/>

                <q-item-label header class="q-mb-lg">COORDONNÉES DU BIEN</q-item-label>
                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.address"
                  label="Adresse"
                  rounded outlined
                  :rules="[val => !!val || 'Une adresse est requise']"
                />

                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.city"
                  label="Ville"
                  rounded outlined
                  :rules="[val => !!val || 'Une ville est requise']"
                />

                <q-input
                  class="q-ma-sm"
                  v-model="form.rent.postalCode"
                  label="Code Postal"
                  rounded outlined
                  :rules="[val => !!val || 'Un code postal est requis']"
                />
                <q-select
                  class="q-ma-sm"
                  rounded
                  outlined
                  v-model="form.rent.country"
                  :options="countryOptions"
                  label="Sélectionnez le Pays"
                  :rules="[val => !!val || 'Un pays est requis']"
                />
              </q-form>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Quitter" color="teal" v-close-popup />
              <q-btn flat label="Modifier" color="teal" @click="updateProperty()" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogPublish.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Publication</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm q-mb-lg">Veuillez saisir les dates où vous voulez rendre vôtre bien disponible</span>
              <div class="row">
                <div class="col-12 col-md-6">
                  <q-input
                    class="q-ma-sm"
                    v-model="dialogPublish.startAt"
                    label="Disponible du"
                    rounded
                    outlined
                    color="secondary"
                    :rules="[val => !!val || 'Une date est requise']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" color="secondary">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date mask="DD/MM/YYYY"
                                  :locale="myLocale"
                                  v-model="dialogPublish.startAt"
                                  today-btn
                                  minimal
                                  color="secondary">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="OK" color="secondary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                      class="q-ma-sm"
                      v-model="dialogPublish.finishAt"
                      label="Au"
                      rounded
                      outlined
                      color="secondary"
                      :rules="[val => !!val || 'Une date est requise']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer" color="secondary">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date mask="DD/MM/YYYY"
                                    :locale="myLocale"
                                    v-model="dialogPublish.finishAt"
                                    today-btn
                                    minimal
                                    color="secondary">
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
              </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Non" color="teal" v-close-popup />
              <q-btn flat label="Oui" color="teal" @click="publishProperty(dialogPublish.id)" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </template>
    <!-- /MOBILE PLATFORM-->
    <!-- DESKTOP PLATFORM-->
    <template v-if="this.$q.platform.is.desktop">
      <div class="bg-blue-custom q-mb-xl">
        <div class="row q-ma-xl">
          <div class="col-9">
            <q-btn
              outline
              round
              color="secondary"
              icon="arrow_back"
              :to="{ name: 'MyAccountPage' }"
            />
            <h3 class="items-end font-Raleway text-white q-ml-xl">Gestion des biens</h3>
            <div class="text-weight-regular text-h6 text-justify text-grey-5 font-Raleway q-ml-xl">
              Dans cette page, vous avez toutes les informations nécessaires à l'administration de vos biens
            </div>
          </div>
          <div class="col-3">
            <q-img
              fade
              src="../../assets/images/Config-rent.png"
              style="max-width: 80%;"/>
          </div>
        </div>
      </div>
      <q-card class="my-card q-mb-xl q-ml-xl q-mr-xl"
              style="max-width: 1000px"
        v-for="rent in getRents"
        :key="rent._id"
        v-bind="rent">
        <q-card-section horizontal>
          <q-img
            class="col-5"
            :ratio="1"
            :src="imageUrl + rent.pictures[0]"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                L'image n'a pas pu charger correctement
              </div>
            </template>
          </q-img>

          <q-card-section>
            <q-item-label header>
              <div v-if="rent.is_published === true">
                {{rent.title.toUpperCase()}}
                <q-chip color="teal" dense text-color="white" label="Publié" class="q-pl-md q-pr-md"/>
                <q-chip v-if="rent.reservations.length > 0" color="info"
                        dense
                        text-color="white"
                        label="Réservé"
                        class="q-pl-md q-pr-md"/>
              </div>
              <div v-if="rent.is_published === false">
                {{rent.title.toUpperCase()}}
                <q-chip color="red" dense text-color="white" label="Non Publié" class="q-pl-md q-pr-md"/>
              </div>
              <div class="q-mt-sm"
              v-for="reservations in rent.reservations" :key="reservations._id">
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Date de réservation :</q-item-label>
                      <q-item-label>Du {{ reservations.from | moment}} au {{ reservations.to | moment}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-item-label>
            <div class="q-mt-sm q-ml-sm">
              {{rent.description}}
            </div>
            <q-separator class="q-mt-xl q-mb-sm"/>
            <div v-if="rent.reservations.length === 0 && rent.is_published === true" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                disable
                unelevated
                rounded>
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                unelevated
                rounded
                @click="openDialogConfirmDelete(rent._id)" >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                unelevated
                rounded
                @click="openDialogConfirmUnpublish(rent.publication_id)">
                Retirer l'annonce
              </q-btn>
            </div>
            <div v-if="rent.reservations.length > 0 && rent.is_published === true" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                disable
                unelevated
                rounded >
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                disable
                unelevated
                rounded >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                disable
                unelevated
                rounded >
                Retirer l'annonce
              </q-btn>
            </div>
            <div v-if="rent.is_published === false" class="q-mt-lg q-mb-sm">
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                unelevated
                rounded
                @click="getPropertyDetails(rent._id)">
                Modifier
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                unelevated
                rounded
                @click="openDialogConfirmDelete(rent._id)" >
              Supprimer
              </q-btn>
              <q-btn
                class="q-ma-sm btn-blue-custom text-secondary"
                unelevated
                rounded
                @click="openDialogConfirmPublish(rent._id)" >
              Publier l'annonce
              </q-btn>
            </div>
          </q-card-section>
        </q-card-section>
        <q-dialog v-model="dialogDelete.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Confirmation</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm">Êtes-vous sûr de vouloir supprimer le bien de votre liste ?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Oui" color="teal" @click="deleteProperty(dialogDelete.id)" v-close-popup />
              <q-btn flat label="Non" color="teal" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogUnpublish.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Confirmation</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm">Êtes-vous sûr de vouloir retirer l'annonce ?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Oui" color="teal" @click="deletePublish(dialogUnpublish.id)" v-close-popup />
              <q-btn flat label="Non" color="teal" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogModify.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Modification</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <q-form
                style="max-width: 500px"
                ref="form"
                class="q-ml-xl q-mr-xl"
              >
                <q-item-label header class="q-mb-lg">DESCRIPTION DU BIEN</q-item-label>

                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.title"
                  label="Titre de l'annonce"
                  rounded outlined
                  :rules="[val => !!val || 'Le titre de l\'annonce est requis']"
                />
                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.description"
                  type="textarea"
                  label="Description"
                  rounded outlined
                  :rules="[val => !!val || 'La description est requise']"
                />
                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.capacity"
                  type="number"
                  label="Capacité maximum"
                  rounded outlined
                  :rules="[val => !!val || 'La capacité maximum est requise']"
                />
                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.price"
                  type="number"
                  label="Prix"
                  rounded outlined
                  :rules="[val => !!val || 'Le prix est requis']"
                >
                  <template v-slot:append>
                    <q-icon name="euro" />
                  </template>
                </q-input>
                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.area"
                  type="number"
                  label="Surface en m³"
                  rounded outlined
                  :rules="[val => !!val || 'La surface est requis']"
                >
                  <template v-slot:append>
                    <q-icon name="aspect_ratio" />
                  </template>
                </q-input>
                <q-select
                  class="q-mb-lg"
                  emit-value
                  map-options
                  rounded
                  outlined
                  option-value="id"
                  option-label="name"
                  v-model="form.rent.associatedLock"
                  :options="keyOptions"
                  label="Sélectionnez une serrure"
                  :rules="[val => !!val || 'Une sélection de serrure est requise']"
                />
                <q-separator class="q-mb-xl q-mt-xl"/>

                <q-item-label header class="q-mb-lg">COORDONNÉES DU BIEN</q-item-label>
                <q-input
                  class="q-mb-lg"
                  v-model="form.rent.address"
                  label="Adresse"
                  rounded outlined
                  :rules="[val => !!val || 'Une adresse est requise']"
                />

                <div class="row">
                  <div class="col-12 col-md-8">
                    <q-input
                      class="q-mb-lg q-mr-sm"
                      v-model="form.rent.city"
                      label="Ville"
                      rounded outlined
                      :rules="[val => !!val || 'Une ville est requise']"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      class="q-mb-lg q-ml-sm"
                      v-model="form.rent.postalCode"
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
                  v-model="form.rent.country"
                  :options="countryOptions"
                  label="Sélectionnez le Pays"
                  :rules="[val => !!val || 'Un pays est requis']"
                />
              </q-form>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Quitter" color="teal" v-close-popup />
              <q-btn flat label="Modifier" color="teal" @click="updateProperty()" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogPublish.dialog" persistent>
          <q-card>
            <q-card-section class="bg-teal text-white" >
              <div class="text-h6">Publication</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-mt-sm q-mb-lg">Veuillez saisir les dates où vous voulez rendre vôtre bien disponible</span>
              <div class="row">
                <div class="col-12 col-md-6">
                  <q-input
                    class="q-mr-sm"
                    v-model="dialogPublish.startAt"
                    label="Disponible du"
                    rounded
                    outlined
                    color="secondary"
                    :rules="[val => !!val || 'Une date est requise']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" color="secondary">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date mask="DD/MM/YYYY"
                                  :locale="myLocale"
                                  v-model="dialogPublish.startAt"
                                  today-btn
                                  minimal
                                  color="secondary">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="OK" color="secondary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                      class="q-ml-sm"
                      v-model="dialogPublish.finishAt"
                      label="Au"
                      rounded
                      outlined
                      color="secondary"
                      :rules="[val => !!val || 'Une date est requise']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer" color="secondary">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date mask="DD/MM/YYYY"
                                    :locale="myLocale"
                                    v-model="dialogPublish.finishAt"
                                    today-btn
                                    minimal
                                    color="secondary">
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
              </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Non" color="teal" v-close-popup />
              <q-btn flat label="Oui" color="teal" @click="publishProperty(dialogPublish.id)" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </template>
  </q-page>
</template>

<script>

import RentsService from '../../services/RentsService'
import LockService from '../../services/LockService'
import moment from 'moment'
import PublicationsService from '../../services/PublicationsService'

export default {
  name: 'DashboardPublicationsAndRentsPage',
  data: () => {
    return {
      imageUrl: process.env.VUE_APP_BASE_URL_IMAGE_UPLOADED,
      countryOptions: [
        'France'
      ],
      keyOptions: [],
      dialogDelete: {
        dialog: false,
        id: '',
        title: ''
      },
      dialogModify: {
        dialog: false,
        id: '',
        title: ''
      },
      dialogPublish: {
        dialog: false,
        id: '',
        startAt: '',
        finishAt: ''
      },
      dialogUnpublish: {
        dialog: false,
        id: '',
        title: ''
      },
      getRents: null,
      form: {
        rent: {
          title: '',
          description: '',
          capacity: '',
          price: '',
          area: '',
          pictures: [],
          address: '',
          city: '',
          postalCode: '',
          country: '',
          associatedLock: ''
        }
      },
      myLocale: {
        days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
        daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
        months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
        monthsShort: 'Janv_Fév_Mars_Avr_Mais_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  methods: {
    getRentsList () {
      RentsService.getRentsList()
        .then((response) => {
          this.getRents = response.data.data
        }).catch(e => {
          console.log(e)
        })
    },
    openDialogConfirmDelete (id) {
      this.dialogDelete.dialog = true
      this.dialogDelete.id = id
    },
    deleteProperty (id) {
      RentsService.deleteRent(id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été supprimé',
            position: 'top'
          })
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    getPropertyDetails (id) {
      RentsService.getRentDetail(id)
        .then(response => {
          this.form.rent = response.data.data
          this.dialogModify.dialog = true
          this.dialogModify.id = id
          this.dialogPublish.id = id
        }).catch(e => {
          console.log(e)
        })
    },
    updateProperty () {
      RentsService.updateRent(this.dialogModify.id, {
        title: this.form.rent.title,
        description: this.form.rent.description,
        capacity: this.form.rent.capacity,
        price: this.form.rent.price,
        area: this.form.rent.area,
        pictures: this.form.rent.pictures,
        address: this.form.rent.address,
        city: this.form.rent.city.toLowerCase(),
        country: this.form.rent.country,
        postalCode: this.form.rent.postalCode,
        associatedLock: this.form.rent.associatedLock
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été mis à jour',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    openDialogConfirmPublish (id) {
      this.dialogPublish.dialog = true
      this.dialogPublish.id = id
    },
    async publishProperty (id) {
      await PublicationsService.publishProperty({
        end_at: moment(this.dialogPublish.finishAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        start_at: moment(this.dialogPublish.startAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        rent: id
      })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre bien a bien été mis à jour',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Veuillez réessayer',
            position: 'top'
          })
        })
    },
    openDialogConfirmUnpublish (id) {
      this.dialogUnpublish.dialog = true
      this.dialogUnpublish.id = id
      console.log(id)
    },
    deletePublish (id) {
      PublicationsService.deletePublish(id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Vôtre publication a bien été retirer',
            position: 'top'
          })
          this.$router.push(this.$route.path)
          this.getRentsList()
        }).catch(() => {
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
          for (let i = 0; i < response.data.data.length; i += 1) {
            this.keyOptions.push({
              id: response.data.data[i]._id,
              name: response.data.data[i].name,
              address: response.data.data[i].address
            })
          }
        }).catch(e => {
          console.log(e)
        })
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  created () {
    this.getRentsList()
    this.getSmartKey()
  }
}
</script>

<style lang="sass" scoped>
  .bg-blue-custom
    background: rgb(45,64,78)
  .btn-blue-custom
    background: rgb(45,64,78)
  .font-Raleway
    font-family: 'Raleway', sans-serif
  .font-Roboto
    font-family: 'Roboto', sans-serif
</style>
