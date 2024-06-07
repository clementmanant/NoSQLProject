<template>
    <div>
      <!-- Contenu des détails de la boisson -->
      <h1>Details de la boisson</h1>
      <h2>{{ hello }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    // Logique du composant
    props: ["drink"],
    mounted() {
      console.log(this.$route.params)
    }
  };
  </script>
  
  <style>
  /* Styles du composant */
  </style>
  