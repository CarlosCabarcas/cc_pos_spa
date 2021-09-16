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
}
</script>

<style>

</style>