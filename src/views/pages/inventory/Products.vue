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
                  @click="$bvModal.show('bv-modal-products')">
          <i class="i-Add"></i> Agregar
        </b-button>
      </b-col>
    </b-row>

    <b-row class="pt-5">
      <b-col>
        <b-table striped hover :items="products" :fields="fields" :busy="isBusy">

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <template #cell(options)>
            <a title="Editar" class="text-success mr-4 cursor-pointer">
              <i class="nav-icon i-Pen-2 font-weight-bold"></i>
            </a>

            <a title="Eliminar" class="text-danger cursor-pointer">
              <i class="nav-icon i-Remove font-weight-bold"></i>
            </a>
          </template>

        </b-table>
      </b-col>
    </b-row>

    <ModalFormProduct/>

  </div>
</template>

<script>
import ModalFormProduct from '@/components/modals/ModalFormProduct.vue'

export default {
  components: {
    ModalFormProduct
  },
  data() {
    return {
      isBusy: false,
      fields: [
        {key: 'id', label: 'ID'},
        {key: 'reference', label: 'Referencia'},
        {key: 'name', label: 'Nombre'},
        {key: 'purchase_price', label: 'Precio de compra'},
        {key: 'sale_price', label: 'Precio de venta'},
        {key: 'stock', label: 'Stock'},
        {key: 'options', label: 'Opciones'}
      ],
      products: []
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    getProducts: function() {
      this.toggleBusy();
      window.axios.get('/api/products')
      .then((response) => {
        this.products = response.data.data;
        this.toggleBusy();
      })
    }
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.$root.$on("getProducts", this.getProducts);
  },
}
</script>

<style>

</style>