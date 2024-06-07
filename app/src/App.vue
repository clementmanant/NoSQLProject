<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view
  :drinks="drinks"
  :ingredients="ingredients"
  ></router-view>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        drinks: [],
        ingredients: []
      }
    },
    methods: {
      async fetchData() {
        await axios.get('http://localhost:3000/api/products')
        .then(res => {this.drinks = res.data})
        .catch((err) => {console.log(err)})

        await axios.get('http://localhost:3000/api/ingredients')
        .then(res => {this.ingredients = res.data})
        .catch((err) => {console.log(err)})
      }
    },
    mounted() {
      this.fetchData()
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
