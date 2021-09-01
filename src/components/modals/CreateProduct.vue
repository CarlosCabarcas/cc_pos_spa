<template>
    <b-modal id="bv-modal-products" class="modal-backdrop fade show" size="lg" hide-footer>
        <template #modal-title>
            Crear Nuevo Producto
        </template>


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
            >
              Crear
            </b-button>
          </div>
        </div>
    </b-modal>
</template>

<script>
export default {

}
</script>

<style>

</style>