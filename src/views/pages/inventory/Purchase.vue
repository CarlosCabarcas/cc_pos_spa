<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Compras</h1>
        <ul>
            <li>Inventario</li>
            <li>Compras</li>
        </ul>
    </div>
    <div class="separator-breadcrumb border-top"></div>

    <b-row class="justify-content-end">
      <b-col col lg="1">
        <b-button variant="outline-success" 
                  size="lg"
                  @click="formTrigger('create')">
          <i class="i-Add"></i> Agregar
        </b-button>
      </b-col>
      <b-col col lg="2">
        <b-button variant="outline-primary" 
                  size="lg"
                  @click="refreshData()">
          <i class="i-Reload"></i> Refrescar
        </b-button>
      </b-col>
    </b-row>

    <b-row class="pt-5">
      <b-table striped hover :items="purchases" :fields="fields" :busy="isBusy">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>

        <template #cell(provider)="data">
          {{ data.item.provider.person.name }} {{ data.item.provider.person.last_name }}
        </template>
        
        <template #cell(date)="data">
          {{ data.item.date | formatDate }} 
        </template>
        
        <template #cell(total)="data">
          ${{ data.item.total | formatNumber }} 
        </template>
        
        <template #cell(status)="data">
          <b-badge variant="success" v-if="data.item.status">Activa</b-badge>
          <b-badge variant="danger" v-else>Anulada</b-badge>
        </template>
        
        <template #cell(options)="data">
          <a title="Detalle" class="text-success mr-4 cursor-pointer" @click="getDetails(data.item.id)">
            <i class="nav-icon i-Eye font-weight-bold"></i>
          </a>
          
          <a title="Anular" class="text-danger mr-4 cursor-pointer" @click="confirmDelete(data.item.id)">
            <i class="nav-icon i-Remove font-weight-bold"></i>
          </a>
        </template>

      </b-table>
      <pagination align="center" :data="data" @pagination-change-page="getPurchases"></pagination>
    </b-row>

    <ModalFormPurchase :title="modalTitle"/>
    <ModalPurchaseDetail :details="details" :number="purchaseNumber"/>
  </div>
</template>

<script>
import ModalFormPurchase from '@/components/modals/ModalFormPurchase.vue'
import ModalPurchaseDetail from '@/components/modals/ModalPurchaseDetail.vue'
import pagination from 'laravel-vue-pagination'

export default {
  components: {
    ModalFormPurchase,
    ModalPurchaseDetail,
    pagination
  },
  data: () => ({
    modalTitle: 'Agregar factura',
    currentPage: 1,
    isBusy: false,
    purchases: [],
    details: [],
    data: {
      type:Object,
      default:null
    },
    fields: [
      {key: 'number', label: 'Número'},
      {key: 'date', label: 'Fecha'},
      {key: 'total', label: 'Total'},
      {key: 'provider', label: 'Proveedor'},
      {key: 'status', label: 'Estado'},
      {key: 'options', label: 'Opciones'}
    ],
    purchaseNumber: ''
  }),
  methods: {
    formTrigger: function(action, id = null){
      if(action==='create'){
        this.modalTitle = 'Registrar nueva compra'
      }else{
        this.modalTitle = 'Editar compra'
      }
      this.$root.$emit('formPurchases', action, id);
    },
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    getPurchases: async function(page = 1){
      this.toggleBusy();
      await window.axios.get('/api/purchases?page='+page)
      .then((response) => {
        this.purchases = response.data.data.data;
        this.data = response.data.data
        this.toggleBusy();
      })

      this.currentPage = page;
    },
    refreshData: function(){
      this.getPurchases(this.currentPage);
    },
    getDetails: async function(id){
      await window.axios.get('/api/purchases/purchase/'+id)
      .then((response) => {
        this.purchaseNumber = response.data.data.number;
        this.details = response.data.data.details;
      })

      this.$bvModal.show('bv-modal-purchase-detail');
    },
    confirmDelete: function(id){
      this.$swal.fire({
        title: '¿Estás seguro?',
        text: "La factura seleccionada se anulará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Anular!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cancelPurchase(id);
        }
      })
    },
    cancelPurchase: function(id){
      let self = this;
      window.axios.post('/api/purchases/cancel/'+id)
      .then(function (response) {
        if (response.data.success) {
          self.$toastr.s("SE HA ANULADO LA FACTURA", "Operación exitosa");
          self.getPurchases(self.currentPage);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        self.$toastr.e("HA OCURRIDO UN ERROR");
      });
    },
  },
  mounted() {
    this.getPurchases(this.currentPage);
  }
}
</script>

<style>

</style>