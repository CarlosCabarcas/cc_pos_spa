import Vue from 'vue'
import moment from 'moment';
import 'moment/locale/es' // without this line it didn't work
moment.locale('es')

var numeral = require("numeral");

Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0");
});

Vue.filter("formatNumberCurrency", function(value) {
  return '$'+numeral(value).format("0,0");
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY')
  }
});
Vue.filter('partialFormat', function(value) {
  if (value) {
    return moment(value).format('DD/MMMM HH:MM')
  }
});
Vue.filter('formatFullDate', function(value) {
  if (value) {
    return moment(value).format('YYYY/MM/DD HH:mm:ss')
  }
});
Vue.filter('humanFormat', function(value) {
  if (value) {
    return moment(value, 'YYYY/MM/DD HH:mm:ss').fromNow()
  }
});