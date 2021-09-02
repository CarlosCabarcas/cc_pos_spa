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
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-col>
    </b-row>

    <ModalFormProduct/>

  </div>
</template>

<script>
import ModalFormProduct from '../../../components/modals/ModalFormProduct.vue'

export default {
  components: {
    ModalFormProduct
  },
  data() {
    return {
      fields: [
        'ID',
        'Referencia',
        'Nombre',
        'Precio de compra',
        'Precio de venta',
        'Stock',
        'Opciones'
      ],
      items: [
      ]
    }
  }
}
</script>

<style>

</style>