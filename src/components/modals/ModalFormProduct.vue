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
                  <ValidationProvider name="Referencia" rules="required|alpha" v-slot="{ errors }">
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
                  <b-form-input
                    name="name"
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                  ></b-form-input>
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
      reference: ''
    }
  }),
  methods: {
    onSubmit: function() {
      console.log('submit')
    }
  }
}
</script>

<style>
.text-danger {
  color: red;
}
</style>