<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{name: 'Admin'}">Admin</router-link> |
    <router-link to="/cart">Cart</router-link>
  </nav>
  <router-view v-if="ingredients && products"
    :baseUrl="baseUrl"
    :products="products"
    :ingredients="ingredients"
    @fetchData:="fetchData"
  >
  </router-view>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        baseUrl: 'http://localhost:3000/api/',
        ingredients: null,
        products: null
      }
    },
    methods: {
      async fetchData() {
        await axios.get(this.baseUrl + "products/")
        .then(res => {
          this.products = res.data
        })
        .catch((err) => console.log('err', err));

        await axios.get(this.baseUrl + "ingredients/")
        .then(res => {
          this.ingredients = res.data
        })
        .catch((err) => console.log('err', err));
      }
    },
    mounted() {
      this.fetchData();
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
