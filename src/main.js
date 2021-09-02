import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
import BootstrapVue from "bootstrap-vue";
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('es', es);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

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
