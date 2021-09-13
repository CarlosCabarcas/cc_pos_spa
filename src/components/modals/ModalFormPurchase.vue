<template>
  <b-modal id="bv-modal-purchases" class="modal-backdrop fade show" size="lg" hide-footer hide-header-close>
    <template #modal-title>
        Titulo
    </template>
    <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="onSubmit">
            <b-row>
                <b-col cols="4">
                    <b-form-group
                        label="Número"
                        label-for="number"
                        class="mb-0"
                    >
                    <ValidationProvider name="Número" rules="required|alpha_num" v-slot="{ errors }">
                        <b-form-input
                            name="number"
                            v-model="form.number"
                            type="text"
                        ></b-form-input>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </b-form-group>
                </b-col>

                <b-col cols="4">
                    <b-form-group
                        label="Fecha"
                        label-for="date"
                        class="mb-0"
                    >
                    <ValidationProvider name="Fecha" rules="required" v-slot="{ errors }">
                        <datepicker v-model="form.date" name="date" :language="es" bootstrap-styling></datepicker>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </b-form-group>
                </b-col>

                <b-col cols="4">
                    <b-form-group
                        label="Proveedor"
                        label-for="provider"
                        class="mb-0"
                    >
                    <ValidationProvider name="Proveedor" rules="required|numeric" v-slot="{ errors }">
                        <v-select :options="providers" v-model="form.provider" :reduce="provider => provider.code" name="provider"></v-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col cols="4">
                    <b-form-group
                        label="Producto"
                        label-for="product"
                        class="mb-0"
                    >
                    <v-select :options="products" v-model="currentProduct" :reduce="product => product.code + '|' +product.label" name="product"></v-select>
                    </b-form-group>
                </b-col>
                
                <b-col cols="3">
                    <b-form-group
                        label="Cantidad"
                        label-for="quantity"
                        class="mb-0"
                    >
                    <b-form-input
                        name="quantity"
                        min="0"
                        v-model="currentQuantity"
                        type="number"
                    ></b-form-input>
                    </b-form-group>
                </b-col>
                
                <b-col cols="3">
                    <b-form-group
                        label="Total"
                        label-for="price"
                        class="mb-0"
                    >
                    <b-form-input
                        name="price"
                        min="0"
                        v-model="currentPrice"
                        type="number"
                    ></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col cols="2">
                    <b-button class="mt-4" variant="outline-success" @click="addData()">
                        <i class="i-Add"></i> Agregar
                    </b-button>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col>
                    <b-table striped hover :items="form.data" :fields="fields">
                        <template #cell(remove)="data">
                            <a title="Editar" class="text-danger mr-4 cursor-pointer" @click="removeItem(data.item.id)">
                                <i class="nav-icon i-Remove font-weight-bold"></i>
                            </a>
                        </template>
                    </b-table>
                </b-col>
            </b-row>

            <div class="container-fluid pt-3 mt-4">
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
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
export default {
    components: {
        Datepicker
    },
    data: () => ({
        es: es,
        id: null,
        action: '',
        providers: [],
        products: [],
        currentProduct: null,
        currentQuantity: null,
        currentPrice: null,
        form: {
            number: '',
            date: new Date(),
            provider: null,
            data: []
        },
        fields: [
            {key: 'product', label: 'Producto'},
            {key: 'quantity', label: 'Cantidad'},
            {key: 'price', label: 'Total'},
            {key: 'remove', label: 'Remover'},
        ]
    }),
    methods: {
        hideModal: function(){
            this.$bvModal.hide('bv-modal-purchases');
        },
        formPurchases: function(action, id){
            this.action = action
            this.id = id
            if (action == 'create') {
                this.$bvModal.show('bv-modal-purchases');
            }
        },
        onSubmit: function() {
            if(this.action === 'create'){
                this.createProduct();
            }
        },
        getProviders: function() {
            let self = this
            window.axios.get('/api/providers/all')
            .then(function (response) {
                if (response.data.success) {
                    response.data.data.forEach(provider => {
                        self.providers.push({ label: provider.person.name+' '+provider.person.last_name, code: Number(provider.id) })
                    });
                }
            })
        },
        getProducts: function() {
            let self = this
            window.axios.get('/api/products/all')
            .then(function (response) {
                if (response.data.success) {
                    response.data.data.forEach(product => {
                        self.products.push({ label: product.name, code: Number(product.id) })
                    });
                }
            })
        },
        addData: function(){
            if(this.currentProduct === null || this.currentProduct === ''){
                this.$toastr.e("DEBE AGREGAR UN PRODUCTO");
                return 0;
            }
            if(this.currentQuantity === null || this.currentQuantity === ''){
                this.$toastr.e("DEBE AGREGAR UNA CANTIDAD");
                return 0;
            }
            if(this.currentPrice === null || this.currentPrice === ''){
                this.$toastr.e("DEBE AGREGAR UN PRECIO");
                return 0;
            }


            let product = this.currentProduct.split("|")

            for(var i = 0; i < this.form.data.length; i++) {
                if(this.form.data[i].id == product[0]) {
                    this.$toastr.w("EL PRODUCTO YA HA SIDO AGREGADO");
                    return 0
                }
            }

            this.form.data.push({ id: product[0], product: product[1], quantity: this.currentQuantity, price: this.currentPrice });
        },
        removeItem: function(id){
            for(var i = 0; i < this.form.data.length; i++) {
                if(this.form.data[i].id == id) {
                    this.form.data.splice(i, 1);
                    break;
                }
            }
        },
        createProduct: function(){
            if(this.form.data.length === 0){
                this.$toastr.e("DEBE AGREGAR POR LO MENOS UN PRODUCTO");
                return 0;
            }

            let self = this;
            window.axios.post('/api/purchases/create', this.form)
            .then(function (response) {
                if (response.data.success) {
                self.$toastr.s("SE HA CREADO LA FACTURA", "Operación exitosa");
                self.$bvModal.hide('bv-modal-purchases');
                }
            })
            .catch(function (error) {
                console.log('error', error);
                self.$toastr.e("HA OCURRIDO UN ERROR");
            });
        }
    },
    mounted() {
        this.$root.$on("formPurchases", this.formPurchases);
        this.getProviders();
        this.getProducts();
    }
}
</script>

<style>

</style>