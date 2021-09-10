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
                  size="lg"
                  @click="refreshData()">
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
        <pagination align="center" :data="data" @pagination-change-page="getProviders"></pagination>
      </b-col>
    </b-row>

    <ModalFormPerson type="providers" :title="modalTitle"/>
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
      provider: null,
      data: {
        type:Object,
        default:null
      },
      modalTitle: ''
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    formTrigger: function(action, id = null, data = null){
      if(action==='create'){
        this.modalTitle = 'Crear nuevo prveedor'
      }else{
        this.modalTitle = 'Editar proveedor'
      }
      this.$root.$emit('formPerson', action, id, data);
    },
    getProviders: async function(page = 1) {
      this.toggleBusy();
      await window.axios.get('/api/providers?page='+page)
      .then((response) => {
        this.providers = response.data.data.data;
        this.data = response.data.data
        this.toggleBusy();
      })

      this.currentPage = page;
    },
    refreshData: function(){
      this.getProviders(this.currentPage);
    },
    setData: async function(id){
      await window.axios.get('/api/providers/provider/'+id)
      .then((response) => {
        this.provider = response.data.data;
      })
      
      this.formTrigger('update', this.provider.person.id, this.provider.person)
    },
    confirmDelete: function(id){
      this.$swal.fire({
        title: '¿Estás seguro?',
        text: "El proveedor seleccionado se eliminará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProvider(id);
        }
      })
    },
    deleteProvider: function(id){
      let self = this
      window.axios.post('/api/providers/delete/'+id)
      .then(function (response) {
        if (response.data.success) {
          self.$toastr.s("SE HA ELIMINADO EL PROVEEDOR", "Operación exitosa");
          self.getProviders(self.currentPage);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        self.$toastr.e("HA OCURRIDO UN ERROR");
      });
    }
  },
  mounted() {
    this.getProviders(this.currentPage);
    this.$root.$on("getProviders", this.refreshData);
  }
}
</script>

<style>

</style>