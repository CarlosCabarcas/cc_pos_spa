<template>
  <b-modal id="bv-modal-purchase-detail" class="modal-backdrop fade show" size="lg" hide-footer hide-header-close>
    <template #modal-title>
        Detalle de la factura #{{ number }}
    </template>

    <b-row>
        <b-col cols="12">
            <b-table striped hover :items="details" :fields="fields">
                <template #cell(product)="data">
                    {{ data.item.product.name }} 
                </template>

                <template #cell(quantity)="data">
                    {{ data.item.amount }} 
                </template>
                
                <template #cell(total)="data">
                    ${{ data.item.total_price | formatNumber }} 
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
                Cerrar
            </b-button>
        </div>
    </div>
  </b-modal>
</template>

<script>
export default {
    props: {
        details: Array,
        number: String
    },
    data: () => ({
        fields: [
            {key: 'product', label: 'Producto'},
            {key: 'quantity', label: 'Cantidad'},
            {key: 'total', label: 'Total'},
        ],
    }),
    methods: {
        hideModal: function(){
            this.$bvModal.hide('bv-modal-purchase-detail');
        }
    }
}
</script>

<style>

</style>