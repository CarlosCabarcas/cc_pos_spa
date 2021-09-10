<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Productos</h1>
        <ul>
            <li>Inventario</li>
            <li>Productos</li>
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
      <b-col>
        <b-table striped hover :items="products" :fields="fields" :busy="isBusy">

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>

          <template #cell(iamge)="data">
             <b-img v-bind="image.imageProps" rounded :src="image.imageUrlBase+data.item.image"></b-img>
          </template>
          
          <template #cell(purchase_price)="data">
             ${{ data.item.purchase_price | formatNumber }}
          </template>
          
          <template #cell(sale_price)="data">
             ${{ data.item.sale_price | formatNumber }}
          </template>
          
          <template #cell(options)="data">
            <a title="Editar" class="text-success mr-4 cursor-pointer" @click="formTrigger('update', data.item.id)">
              <i class="nav-icon i-Pen-2 font-weight-bold"></i>
            </a>

            <a title="Eliminar" class="text-danger cursor-pointer" @click="confirmDelete(data.item.id)">
              <i class="nav-icon i-Remove font-weight-bold"></i>
            </a>
          </template>
        </b-table>
        <pagination align="center" :data="data" @pagination-change-page="getProducts"></pagination>
      </b-col>
    </b-row>

    <ModalFormProduct
    :title="modalTitle"/>

  </div>
</template>

<script>
import ModalFormProduct from '@/components/modals/ModalFormProduct.vue'
import pagination from 'laravel-vue-pagination'

export default {
  components: {
    ModalFormProduct,
    pagination
  },
  data() {
    return {
      isBusy: false,
      currentPage: 1,
      fields: [
        {key: 'id', label: 'ID'},
        {key: 'reference', label: 'Referencia'},
        {key: 'name', label: 'Nombre'},
        {key: 'iamge', label: 'Imagen'},
        {key: 'purchase_price', label: 'Precio de compra'},
        {key: 'sale_price', label: 'Precio de venta'},
        {key: 'stock', label: 'Stock'},
        {key: 'options', label: 'Opciones'}
      ],
      products: [],
      data: {
        type:Object,
        default:null
      },
      modalTitle: '',
      image: {
        imageProps: { width: 50, height: 50, class: 'm1' },
        imageUrlBase: process.env.VUE_APP_API_URL+'/images/'
      }
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    getProducts: async function(page = 1) {
      this.toggleBusy();
      await window.axios.get('/api/products?page='+page)
      .then((response) => {
        this.products = response.data.data.data;
        this.data = response.data.data
        this.toggleBusy();
      })

      this.currentPage = page;
    },
    formTrigger: function(action, id = null){
      if(action==='create'){
        this.modalTitle = 'Crear nuevo producto'
      }else{
        this.modalTitle = 'Editar producto'
      }
      this.$root.$emit('formProducts', action, id);
    },
    confirmDelete: function(id){
      this.$swal.fire({
        title: '¿Estás seguro?',
        text: "El producto seleccionado se eliminará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(id);
        }
      })
    },
    deleteProduct: function(id){
      let self = this;
      window.axios.post('/api/products/delete/'+id)
      .then(function (response) {
        if (response.data.success) {
          self.$toastr.s("SE HA ELIMINADO EL PRODUCTO", "Operación exitosa");
          self.getProducts(self.currentPage);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        self.$toastr.e("HA OCURRIDO UN ERROR");
      });
    },
    refreshData: function(){
      this.getProducts(this.currentPage);
    }
  },
  mounted() {
    this.$root.$on("getProducts", this.getProducts);
    this.getProducts(this.currentPage);
  },
}
</script>

<style>

</style>