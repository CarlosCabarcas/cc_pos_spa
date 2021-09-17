<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Clientes</h1>
        <ul>
            <li>Terceros</li>
            <li>Clientes</li>
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
        <b-table striped hover :items="clients" :fields="fields" :busy="isBusy">

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>

          <template #cell(identification)="data">
            {{ data.item.person.identification_type }} {{ data.item.person.identification_number }}
          </template>

          <template #cell(name)="data">
            {{ data.item.person.name }} {{ data.item.person.last_name }}
          </template>
          
          <template #cell(email)="data">
            {{ data.item.person.email }}
          </template>
          
          <template #cell(phone)="data">
            {{ data.item.person.phone }}
          </template>
          
          <template #cell(address)="data">
            {{ data.item.person.address }}
          </template>

          <template #cell(options)="data">
            <a title="Editar" class="text-success mr-4 cursor-pointer" @click="setData(data.item.id)">
              <i class="nav-icon i-Pen-2 font-weight-bold"></i>
            </a>

            <a title="Eliminar" class="text-danger cursor-pointer" @click="confirmDelete(data.item.id)">
              <i class="nav-icon i-Remove font-weight-bold"></i>
            </a>
          </template>
        </b-table>
        <pagination align="center" :data="data" @pagination-change-page="getClients"></pagination>
      </b-col>
    </b-row>

    <ModalFormPerson type="clients" :title="modalTitle"/>
  </div>
</template>

<script>
import ModalFormPerson from '@/components/modals/ModalFormPerson.vue'
import pagination from 'laravel-vue-pagination'
export default {
  components: {
    ModalFormPerson,
    pagination
  },
  data () {
    return {
      modalTitle: '',
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
      clients: [],
      client: null,
      data: {
        type:Object,
        default:null
      },
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    formTrigger: function(action, id = null, data = null){
      if(action==='create'){
        this.modalTitle = 'Crear nuevo cliente'
      }else{
        this.modalTitle = 'Editar cliente'
      }
      this.$root.$emit('formPerson', action, id, data);
    },
    getClients: async function(page = 1) {
      this.toggleBusy();
      await window.axios.get('/api/clients?page='+page)
      .then((response) => {
        this.clients = response.data.data.data;
        this.data = response.data.data
        this.toggleBusy();
      })

      this.currentPage = page;
    },
    refreshData: function(){
      this.getClients(this.currentPage);
    },
    setData: async function(id){
      await window.axios.get('/api/clients/client/'+id)
      .then((response) => {
        this.client = response.data.data;
      })
      
      this.formTrigger('update', this.client.person.id, this.client.person)
    },
    confirmDelete: function(id){
      this.$swal.fire({
        title: '¿Estás seguro?',
        text: "El cliente seleccionado se eliminará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteClient(id);
        }
      })
    },
    deleteClient: function(id){
      let self = this
      window.axios.post('/api/clients/delete/'+id)
      .then(function (response) {
        if (response.data.success) {
          self.$toastr.s("SE HA ELIMINADO EL CLIENTE", "Operación exitosa");
          self.getClients(self.currentPage);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        self.$toastr.e("HA OCURRIDO UN ERROR");
      });
    }
  },
  mounted() {
    this.getClients(this.currentPage);
    this.$root.$on("getClients", this.refreshData);
  }
}
</script>

<style>

</style>