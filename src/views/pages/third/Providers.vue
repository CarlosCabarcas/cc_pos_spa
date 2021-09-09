<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Proveedores</h1>
        <ul>
            <li>Terceros</li>
            <li>Proveedores</li>
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

    <b-row class="pt-5">
      <b-col>
        <b-table striped hover :items="providers" :fields="fields" :busy="isBusy">

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>

        </b-table>
      </b-col>
    </b-row>

    <ModalFormPerson type="providers" :title="modalTitle"/>
  </div>
</template>

<script>
import ModalFormPerson from '@/components/modals/ModalFormPerson.vue'

export default {
  components: {
    ModalFormPerson,
  },
  data () {
    return {
      isBusy: false,
      currentPage: 1,
      fields: [
        {key: 'identification', label: 'Identificación'},
        {key: 'name', label: 'Nombre'},
        {key: 'email', label: 'Correo'},
        {key: 'phone', label: 'Telefono'},
        {key: 'address', label: 'Dirección'},
        {key: 'options', label: 'Opciones'}
      ],
      providers: [],
      modalTitle: ''
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    formTrigger: function(action, id = null){
      if(action==='create'){
        this.modalTitle = 'Crear nuevo prveedor'
      }else{
        this.modalTitle = 'Editar proveedor'
      }
      this.$root.$emit('formPerson', action, id);
    }
  }
}
</script>

<style>

</style>