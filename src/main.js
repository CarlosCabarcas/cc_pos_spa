import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
import BootstrapVue from "bootstrap-vue";

window.axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  store.dispatch('AUTH_DATA', token);
}

Vue.config.productionTip = false
Vue.use(VueToastr);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
