<template>
    <b-modal id="bv-modal-providers" class="modal-backdrop fade show" size="lg" hide-footer hide-header-close>
        <template #modal-title>
            {{ title }}
        </template>
        <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
                <b-row>
                    <b-col cols="6">
                        <b-form-group
                            label="Tipo de identificación"
                            label-for="reference"
                            class="mb-0"
                        >
                        <ValidationProvider name="Tipo de identificación" rules="required|regex:^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" v-slot="{ errors }">
                            <b-form-select name="identification_type" v-model="form.identification_type" :options="options"></b-form-select>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>       
                        </b-form-group>
                    </b-col>

                    <b-col cols="6">
                        <b-form-group
                            label="Número de identificación"
                            label-for="identification_number"
                            class="mb-0"
                        >
                        <ValidationProvider name="Número de identificación" rules="required|numeric" v-slot="{ errors }">
                            <b-form-input
                                name="identification_number"
                                v-model="form.identification_number"
                                type="number"
                                placeholder="Ingrese el número de identificación"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="6">
                        <b-form-group
                            label="Nombre"
                            label-for="name"
                            class="mb-0"
                        >
                        <ValidationProvider name="Nombre" rules="required|regex:^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" v-slot="{ errors }">
                            <b-form-input
                                name="name"
                                v-model="form.name"
                                type="text"
                                placeholder="Ingrese el nombre del proveedor"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                    
                    <b-col cols="6">
                        <b-form-group
                            label="Apellido"
                            label-for="last_name"
                            class="mb-0"
                        >
                        <ValidationProvider name="Apellido" rules="required|regex:^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" v-slot="{ errors }">
                            <b-form-input
                                name="last_name"
                                v-model="form.last_name"
                                type="text"
                                placeholder="Ingrese el apellido del proveedor"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="6">
                        <b-form-group
                            label="Correo"
                            label-for="email"
                            class="mb-0"
                        >
                        <ValidationProvider name="Correo" rules="required|email" v-slot="{ errors }">
                            <b-form-input
                                name="email"
                                v-model="form.email"
                                type="email"
                                placeholder="Ingrese el correo del proveedor"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                    
                    <b-col cols="6">
                        <b-form-group
                            label="Telefono"
                            label-for="phone"
                            class="mb-0"
                        >
                        <ValidationProvider name="Telefono" rules="required|alpha_num" v-slot="{ errors }">
                            <b-form-input
                                name="phone"
                                v-model="form.phone"
                                type="text"
                                placeholder="Ingrese el telefono del proveedor"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="12">
                        <b-form-group
                            label="Dirección"
                            label-for="address"
                            class="mb-0"
                        >
                        <ValidationProvider name="Dirección" rules="required|regex:^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" v-slot="{ errors }">
                            <b-form-input
                                name="address"
                                v-model="form.address"
                                type="text"
                                placeholder="Ingrese el dirección del proveedor"
                            ></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>  
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class="container-fluid pt-3">
                    <div class="w-100 d-flex justify-content-end">
                        <b-button
                            variant="outline-dark"
                            size="lg"
                            class="mr-1"
                            @click="hideModal()"
                        >
                        Cancelar
                        </b-button>
                        <b-button 
                            variant="outline-success" 
                            size="lg" 
                            type="submit"
                            :disabled="invalid"
                        >
                        Crear
                        </b-button>
                    </div>
                </div>
            </form>
        </ValidationObserver>

    </b-modal>
</template>

<script>
export default {
    props: {
        type: String,
        title: String
    },
    data(){
        return {
            form: {
                identification_type: 'cc',
                identification_number: '',
                name: '',
                last_name: '',
                email: '',
                phone: '',
                address: ''
            },
            options: [
                { value: 'cc', text: 'Cédula de ciudadanía' },
                { value: 'nit', text: 'NIT' }
            ],
            action: '',
            id: null
        }
    },
    methods: {
        hideModal: function(){
            this.$bvModal.hide('bv-modal-providers');
            this.resetForm();
        },
        formPerson: function(action, id){
            this.action = action
            this.id = id
            this.$bvModal.show('bv-modal-providers');
        },
        onSubmit: function(){
            if (this.action === 'create') {
                this.createPerson();
            }
        },
        createPerson: function(){
            let self = this
            window.axios.post('/api/'+this.type+'/create', self.form)
            .then(function (response) {
                if (response.data.success) {
                    self.$toastr.s("SE HA CREADO EL REGISTRO", "Operación exitosa");
                    self.resetForm();
                    self.$bvModal.hide('bv-modal-providers');
                }
            })
            .catch(function (error) {
                console.log('error', error);
                self.$toastr.e("HA OCURRIDO UN ERROR");
            });
        },
        resetForm: function(){
            this.form.identification_type = 'cc';
            this.form.identification_number = '';
            this.form.name = '';
            this.form.last_name = '';
            this.form.email = '';
            this.form.phone = '';
            this.form.address = '';
        }
    },
    mounted() {
        this.$root.$on("formPerson", this.formPerson);
    }
}
</script>

<style>

</style>