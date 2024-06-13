<template>
  <div class="container">
    <div class="row">
      <div class="text-center col-12">
        <h3 class="pt-3">Cart</h3>
        <h3 class="pt-3">Prix total: {{ totalPrice }} €</h3>
        <button type="button" class="btn btn-primary" @click="sendToWaitingList">Pay</button>
      </div>
    </div>
  
    <div class="row" v-if="cartProducts && cartProducts.cocktails">
      <div 
        v-for="product in cartProducts.cocktails" 
        :key="product._id" 
        class="col-xl-4 col-md-6 pt-3 d-flex"
      >
        <ProductBox 
          :product="product" 
          :cart="true" 
          :baseUrl="baseUrl"
          @product-removed="getCart"
        ></ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductBox from "../components/Products/ProductBox.vue";
  const axios = require('axios');
  const sweetalert = require('sweetalert');
  
  export default {
    props: ["baseUrl"],
    components: { ProductBox },
    data() {
      return {
        cartProducts: null,
        totalPrice: 0
      }
    },
    methods: {
      async getCart() {
        await axios.get(this.baseUrl + "redis/basket/userId/")
        .then(res => {
          this.cartProducts = res.data;
          this.calculateTotalPrice();
        })
        .catch((err) => console.log('err', err));
      },
      calculateTotalPrice() {
        if (this.cartProducts && this.cartProducts.cocktails) {
          this.totalPrice = this.cartProducts.cocktails.reduce((total, product) => {
            return total + product.price;
          }, 0).toFixed(2);
        }
      },
      async sendToWaitingList() {
    axios({
      method: 'post',
      url: `${this.baseUrl}redis/list/`,
      data: JSON.stringify(this.cartProducts),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      sweetalert({
        text: "Cart sent to waiting list successfully",
        icon: "success"
      });
      this.$emit('cart-sent');
      this.cartProducts = null;
      this.totalPrice = 0;
    }).catch((err) => {
      console.log(err);
      sweetalert({
        text: "Error sending cart to waiting list",
        icon: "error"
      });
    });
  }
    },
    mounted() {
      this.getCart();
    }
  }
</script>
