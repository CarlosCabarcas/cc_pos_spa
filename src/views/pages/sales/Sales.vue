<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Ventas</h1>
        <ul>
            <li>Ventas</li>
            <li>Listado de ventas</li>
        </ul>
    </div>
    <div class="separator-breadcrumb border-top"></div>

    <b-row class="mt-4">
        <b-col cols="3">
            <b-form-radio-group
                id="radio-group-2"
                v-model="selected"
                name="radio-sub-component"
                class="mt-2"
                @change="setOption()"
            >
                <b-form-radio value="1">Buscar por número</b-form-radio>
                <b-form-radio value="2">Buscar por fecha</b-form-radio>
            </b-form-radio-group>
        </b-col>

        <b-col cols="2" v-if="selected == 1">
            <b-form-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="search"
            placeholder="Buscar por numero..."
            ></b-form-input>
        </b-col>
        
        <b-col cols="2" v-if="selected == 2">
            <datepicker v-model="search" name="date" :language="es" bootstrap-styling></datepicker>
        </b-col>

        <b-col cols="2">
            <b-button variant="primary" @click="getSales()"><i class="i-Magnifi-Glass1"></i> Buscar</b-button>
        </b-col>

        <b-col col lg="2" offset="3">
            <b-button variant="outline-primary" 
                    size="lg"
                    @click="refreshData()">
            <i class="i-Reload"></i> Refrescar
            </b-button>
        </b-col>
    </b-row>

    <b-row class="justify-content-end">
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
          
          <template #cell(status)="data">
            <b-badge variant="success" v-if="data.item.status">Activa</b-badge>
            <b-badge variant="danger" v-else>Anulada</b-badge>
          </template>

          <template #cell(options)="data">
            <a title="Imprimir" class="text-info cursor-pointer mr-2" :href="urlBase+'/pdf/factura_venta'+data.item.id+'.pdf'" target="_blank">
              <i class="nav-icon i-File-Word font-weight-bold"></i>
            </a>

            <a title="Anular" class="text-danger cursor-pointer" @click="confirmCancel(data.item.id)" v-if="data.item.status">
              <i class="nav-icon i-Remove font-weight-bold"></i>
            </a>
          </template>

        </b-table>

        <pagination align="center" :data="data" @pagination-change-page="getSales"></pagination>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import pagination from 'laravel-vue-pagination'
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import 'moment/locale/es' // without this line it didn't work
moment.locale('es')
export default {
    components: {
        pagination,
        Datepicker
    },
    data(){
      return {
        es: es,
        isBusy: false,
        currentPage: 1,
        selected: 1,
        search: '',
        fields: [
            {key: 'id', label: 'Número'},
            {key: 'date', label: 'Fecha'},
            {key: 'subtotal', label: 'Subtotal'},
            {key: 'discount', label: 'Descuento'},
            {key: 'client', label: 'Cliente'},
            {key: 'status', label: 'Estado'},
            {key: 'options', label: 'Opciones'},
        ],
        sales: [],
        data: {
            type:Object,
            default:null
        },
        urlBase: process.env.VUE_APP_API_URL
      }
    },
    methods: {
        toggleBusy() {
            this.isBusy = !this.isBusy
        },
        getSales: async function(page = 1){
            this.toggleBusy();

            if (this.selected == 2) {
                this.search = moment(this.search).format('YYYY-MM-DD');
            }

            await window.axios.get('/api/sales/'+this.selected+'/'+this.search+'?page='+page)
            .then((response) => {
                this.sales = response.data.data.data;
                this.data = response.data.data
                this.toggleBusy();
            })

            this.currentPage = page;
        },
        refreshData: function(){
            this.getSales(this.currentPage);
        },
        confirmCancel: function(id){
            this.$swal.fire({
                title: '¿Estás seguro?',
                text: "La venta seleccionada se anulará",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Anular!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cancel(id);
                }
            })
        },
        cancel: function(id){
            let self = this;
            window.axios.post('/api/sales/cancel/'+id)
            .then(function (response) {
                if (response.data.success) {
                self.$toastr.s("SE HA ANULADO LA VENTA", "Operación exitosa");
                self.getSales(self.currentPage);
                }
            })
            .catch(function (error) {
                console.log('error', error);
                self.$toastr.e("HA OCURRIDO UN ERROR");
            });
        },
        setOption: function(){
            if (this.selected == 1) {
                this.search = ''
            }else {
                this.search = new Date()
            }
        }
    },
    mounted() {
        this.getSales(this.currentPage);
    }
}
</script>

<style>

</style>