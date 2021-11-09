<template>
  <b-modal id="bv-modal-sale-detail" class="modal-backdrop fade show" size="lg" hide-footer hide-header-close>
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
                
                <template #cell(unit_price)="data">
                    {{ data.item.unit_price | formatNumberCurrency }}
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
            {key: 'unit_price', label: 'Precio Unitario'},
        ],
    }),
    methods: {
        hideModal: function(){
            this.$bvModal.hide('bv-modal-sale-detail');
        }
    }
}
</script>