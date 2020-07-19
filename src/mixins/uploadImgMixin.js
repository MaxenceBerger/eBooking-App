import { apiBaseUrl } from '../API/api-base-url.js'
const BASE_URL = apiBaseUrl()

export default {
  methods: {
    factoryFn (file) {
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
        this.form.items.pictures = response.data.data
      })
    }
  }
}
