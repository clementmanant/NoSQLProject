<template>
  <div class="container">
      <div class="row">
          <div class="text-center col-12">
              <h3 class="pt-3">Products</h3>
          </div>
      </div>
      <div class="row">
          <div 
              v-for="product of products" 
              :key="product._id" 
              class="col-xl-4 col-md-6 pt-3 d-flex"
          >
              <ProductBox :product="product" :admin="false" :baseUrl="baseUrl"></ProductBox>
          </div>
      </div>
  </div>
</template>

<script>
  import ProductBox from "../components/Products/ProductBox.vue";

  export default {
      name: "GetProducts",
      props: ["products", "baseUrl"],
      components: {ProductBox},
  }
</script>

<style scoped>
</style>