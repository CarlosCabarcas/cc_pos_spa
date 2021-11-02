<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Reporte de ventas</h1>
        <ul>
            <li>Reportes</li>
            <li>Reporte de ventas</li>
        </ul>
    </div>
    <div class="separator-breadcrumb border-top"></div>

    <b-row class="mt-4">
      <b-col cols="1">
        Fecha Inicio:
      </b-col>

      <b-col cols="4">
        <datepicker v-model="from" name="date" :language="es" bootstrap-styling></datepicker>
      </b-col>

      <b-col cols="1">
        Fecha Fin:
      </b-col>

      <b-col cols="4">
        <datepicker v-model="to" name="date" :language="es" bootstrap-styling></datepicker>
      </b-col>

      <b-col>
        <b-button variant="primary" @click="getSales()"><i class="i-Magnifi-Glass1"></i> Buscar</b-button>
      </b-col>
    </b-row>

    <b-row class="pt-5">
      <b-col><h1>Total ventas: {{ total | formatNumberCurrency }}</h1></b-col>
    </b-row>

    <b-row class="pt-5">
      <b-col>
        <b-table striped hover :items="sales" :fields="fields" :busy="isBusy">

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>

          <template #cell(date)="data">
            {{ data.item.date | formatFullDate }}
          </template>
          
          <template #cell(subtotal)="data">
            {{ data.item.total - (data.item.total * (data.item.discount / 100)) | formatNumberCurrency }}
          </template>
          
          <template #cell(discount)="data">
            {{ data.item.discount }}%
          </template>
          
          <template #cell(client)="data">
            {{ data.item.client.person.name }} {{ data.item.client.person.last_name }}
          </template>

          <template #cell(options)="data">
            <a title="Imprimir" class="text-info cursor-pointer mr-2" :href="urlBase+'/pdf/factura_venta'+data.item.id+'.pdf'" target="_blank">
              <i class="nav-icon i-File-Word font-weight-bold"></i>
            </a>
          </template>

        </b-table>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import 'moment/locale/es'
export default {
  components: {
    Datepicker
  },
  data(){
    return {
      es: es,
      from: null,
      to: null,
      fields: [
        {key: 'id', label: 'Número'},
        {key: 'date', label: 'Fecha'},
        {key: 'subtotal', label: 'Subtotal'},
        {key: 'discount', label: 'Descuento'},
        {key: 'client', label: 'Cliente'},
        {key: 'options', label: 'Opciones'},
      ],
      sales: [],
      urlBase: process.env.VUE_APP_API_URL,
      total: 0
    }
  },
  methods: {
    getSales: async function(){

      this.from = moment(this.from).format('YYYY-MM-DD');
      this.to = moment(this.to).format('YYYY-MM-DD');

      await window.axios.get('/api/report/sales?from='+this.from+'&to='+this.to)
      .then((response) => {
        console.log(response);
        this.sales = response.data.data[0]
        this.total = response.data.data[1]
      })
    }
}
}
</script>

<style>

</style>