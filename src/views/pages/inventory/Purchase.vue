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
                  size="lg">
          <i class="i-Reload"></i> Refrescar
        </b-button>
      </b-col>
    </b-row>

    <ModalFormPurchase/>
  </div>
</template>

<script>
import ModalFormPurchase from '@/components/modals/ModalFormPurchase.vue'

export default {
  components: {
    ModalFormPurchase
  },
  data: () => ({
    modalTitle: ''
  }),
  methods: {
    formTrigger: function(action, id = null){
      if(action==='create'){
        this.modalTitle = 'Registrar nueva compra'
      }else{
        this.modalTitle = 'Editar compra'
      }
      this.$root.$emit('formPurchases', action, id);
    }
  }
}
</script>

<style>

</style>