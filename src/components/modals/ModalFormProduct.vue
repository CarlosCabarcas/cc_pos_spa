<template>
    <b-modal id="bv-modal-products" class="modal-backdrop fade show" size="lg" hide-footer>
        <template #modal-title>
            Crear Nuevo Producto
        </template>

        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="onSubmit">
            <b-row>
              <b-col cols="6">
                <b-form-group
                    label="Referencia"
                    label-for="reference"
                    class="mb-0"
                  >
                  <ValidationProvider name="Referencia" rules="required|alpha_num" v-slot="{ errors }">
                    <b-form-input
                      name="reference"
                      v-model="form.reference"
                      type="text"
                      placeholder="Ingrese la referencia del producto"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>       
                </b-form-group>
              </b-col>
                
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
                      placeholder="Ingrese el nombre del producto"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>  
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="6">
                <b-form-group
                  label="Imagen"
                  label-for="image"
                  class="mb-0"
                >
                  <ValidationProvider name="Imagen" rules="required|mimes:image/*" v-slot="{ errors }">
                    <b-form-file
                      v-model="image"
                      :state="Boolean(image)"
                      placeholder="Seleccione una imagen"
                      @change="uploadImage"
                    ></b-form-file>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>  
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  label="Stock"
                  label-for="stock"
                  class="mb-0"
                >
                  <ValidationProvider name="Stock" rules="required|numeric" v-slot="{ errors }">
                    <b-form-input
                      name="stock"
                      v-model="form.stock"
                      type="number"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>  
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="6">
                <b-form-group
                  label="Precio de compra"
                  label-for="pruchase_price"
                  class="mb-0"
                >

                  <ValidationProvider name="Precio de compra" rules="required|numeric" v-slot="{ errors }">
                    <b-form-input
                      name="pruchase_price"
                      v-model="form.purchasePrice"
                      type="text"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              
              <b-col cols="6">
                <b-form-group
                  label="Precio de venta"
                  label-for="sale_price"
                  class="mb-0"
                >

                  <ValidationProvider name="Precio de venta" rules="required|numeric" v-slot="{ errors }">
                    <b-form-input
                      name="sale_price"
                      v-model="form.salePrice"
                      type="text"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
              <b-form-group
                  label="Descripción"
                  label-for="description"
                  class="mb-0"
                >
                <ValidationProvider name="Descripción" rules="required|regex:^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" v-slot="{ errors }">
                  <b-form-textarea
                    v-model="form.description"
                    placeholder="Ingrese una descripción"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
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
                    @click="$bvModal.hide('bv-modal-products')"
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
  data: () => ({
    form: {
      reference: '',
      name: '',
      image: null,
      stock: 0,
      purchasePrice: 0,
      salePrice: 0,
      description: ''
    },
    image: null,
  }),
  methods: {
    onSubmit: function() {
      let data = new FormData();
      data.append('reference', this.form.reference);
      data.append('name', this.form.name);
      data.append('stock', this.form.stock);
      data.append('purchasePrice', this.form.purchasePrice);
      data.append('salePrice', this.form.salePrice);
      data.append('description', this.form.description);
      data.append('image', this.form.image);
      let self = this
      window.axios.post('/api/products/create', data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          self.$toastr.s("SE HA CREADO EL PRODUCTO", "Operación exitosa");
        }
      })
      .catch(function () {
        self.$toastr.e("HA OCURRIDO UN ERROR");
      });
    },
    uploadImage(e){
      this.form.image = e.target.files[0];
    }
  }
}
</script>

<style>
.text-danger {
  color: red;
}
</style>