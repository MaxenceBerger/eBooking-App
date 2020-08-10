import { apiBaseUrl } from '../API/api-base-url.js'
const BASE_URL = apiBaseUrl()

export default {
  methods: {
    factoryFn (file) {
      this.$q.loading.show({
        spinnerColor: 'secondary',
        message: 'Photo en cours de télécharchement<br>Veuillez patientez',
        messageColor: 'white'
      })
      const formData = new FormData()
      Object.keys(file).forEach(key => {
        formData.append('multipleFiles', file[key])
      })
      this.$axios.post(`${BASE_URL}upload/multiple`, formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${file.boundary}`,
            Authorization: `Bearer ${this.$store.getters.getToken}`
          }
        }).then((response) => {
        this.$q.loading.hide()
        this.pictureAdded = response.data.data[0]
        this.tempPicture()
      })
    }
  }
}
