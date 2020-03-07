import axios from 'axios';

const apiEbooking = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL_EBOOKING}/api/`,
  headers: { 'Content-Type': 'application/json' },
});


export { apiEbooking as default };
