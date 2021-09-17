<template>
  <div>
    <div class="breadcrumb">
        <h1 class="mr-2">Punto de venta</h1>
        <ul>
            <li>Ventas</li>
            <li>Punto de venta</li>
        </ul>
    </div>
    <div class="separator-breadcrumb border-top"></div>

    <b-row class="mt-4">
      <b-col cols="6">

        <b-row>
          <b-col cols="4" v-for="product in products" :key="product.id">
            <b-card
              :title="product.name"
              :sub-title="product.sale_price | formatNumberCurrency"
              :img-src="image.imageUrlBase+product.image"
              img-top
              img-height="200"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Some quick example.
              </b-card-text>

              <b-button href="#" variant="primary" @click="addToCart(product.id)"><i class="i-Add"></i> Agregar</b-button>
            </b-card>
          </b-col>
        </b-row>
        <pagination class="mt-4" align="center" :data="data" @pagination-change-page="getProducts"></pagination>
      </b-col>

      <b-col cols="6">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Detalles de la venta</div>
            <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Producto</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Total</th>
                      <th scope="col">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in productsCart" :key="product.id">
                      <td scope="row"><img class="profile-picture avatar-sm mb-2 mr-2 img-fluid" :src="image.imageUrlBase+product.image" alt="alt" />
                        <div class="ul-product-cart__detail d-inline-block align-middle">
                          <a>
                            <h6 class="heading">{{ product.name }}</h6>
                          </a>
                          <span class="text-mute">{{ product.description }}</span>
                        </div>
                      </td>
                      <td>{{ product.price | formatNumberCurrency }}</td>
                      <td>
                        {{ product.quantity }}
                        <a class="cursor-pointer" @click="addQuantity(product.id)"><i class="i-Add text-success mr-1"></i></a>
                        <a class="cursor-pointer" @click="substractQuantity(product.id)"><i class="i-Remove text-danger font-weight-700"></i></a>
                      </td>
                      <td>{{ product.quantity * product.price | formatNumberCurrency }}</td>
                      <td><a class="cursor-pointer" @click="removeItem(product.id)"><i class="i-Close-Window text-19 text-danger font-weight-700"></i></a></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="row">
              <div class="col-lg-12 mt-5">
                <div class="ul-product-cart__invoice">
                  <div class="card-title">
                    <h4 class="heading text-primary">Total a pagar</h4>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th class="text-16" scope="row">Subtotal</th>
                        <td class="text-16 text-success font-weight-700">
                          {{ total | formatNumberCurrency }}
                        </td>
                      </tr>
                      <tr>
                        <th class="text-16" scope="row">Descuento</th>
                        <td>
                          <ul class="list-unstyled mb-0">
                            <li>
                              <div>
                                {{ discount }}%
                                <a class="cursor-pointer" @click="addDiscount()"><i class="i-Add text-success mr-1"></i></a>
                                <a class="cursor-pointer" @click="substractDiscount()"><i class="i-Remove text-danger font-weight-700"></i></a>
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th class="text-primary text-16" scope="row">
                          Total:
                        </th>
                        <td class="font-weight-700 text-16">{{ total - ( (total * discount) / 100 ) | formatNumberCurrency }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import pagination from 'laravel-vue-pagination'

export default {
  components: {
    pagination
  },
  data () {
    return {
      currency: '$',
      products: [],
      productsCart: [],
      total: 0,
      discount: 0,
      data: {
        type:Object,
        default:null
      },
      image: {
        imageProps: { width: 50, height: 50, class: 'm1' },
        imageUrlBase: process.env.VUE_APP_API_URL+'/images/'
      }
    }
  },
  methods: {
    getProducts: async function(page = 1){
      await window.axios.get('/api/products/6?page='+page)
      .then((response) => {
        this.products = response.data.data.data
        this.data = response.data.data
      })
    },
    addToCart: function(id){
      this.products.forEach(product => {
        if (product.id == id){
          this.productsCart.push(
            { 
              id: id, 
              name: product.name, 
              description: product.description, 
              image: product.image,
              price: product.sale_price,
              quantity: 1
            }
          );
          this.sumTotal();
        }
      });
    },
    addQuantity: function(id){
      for(var i = 0; i < this.productsCart.length; i++) {
        if(this.productsCart[i].id == id) {
          this.productsCart[i].quantity = this.productsCart[i].quantity + 1
          break;
        }
      }
      this.sumTotal();
    },
    substractQuantity: function(id){
      for(var i = 0; i < this.productsCart.length; i++) {
        if(this.productsCart[i].id == id) {
          if (this.productsCart[i].quantity > 1) {
            this.productsCart[i].quantity = this.productsCart[i].quantity - 1
          }
          break;
        }
      }
      this.sumTotal();
    },
    removeItem: function(id){
      for(var i = 0; i < this.productsCart.length; i++) {
        if(this.productsCart[i].id == id) {
          this.productsCart.splice(i, 1);
          break;
        }
      }
      this.sumTotal();
    },
    sumTotal: function(){
      this.total = 0
      this.productsCart.forEach(product => {
        this.total += product.quantity * product.price;
      });
    },
    addDiscount: function(){
      this.discount++
    },
    substractDiscount: function(){
      if (this.discount > 0) {
        this.discount--
      }
    }
  },
  mounted () {
    this.getProducts();
  }
}
</script>

<style>

</style>