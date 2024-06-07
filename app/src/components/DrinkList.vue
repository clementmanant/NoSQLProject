<template>
  <h1>Liste des Boissons</h1>
  <div class="row">
    <router-link v-for="drink in drinks" :key="drink._id" :to="'/drink/' + drink.name" class="col-xl-4 col-md-6 col-12 pt-3 d-flex" :drink="drink.name">
      <div class="card h-100 w-100" style="width: 18rem; height: 12rem; overflow: hidden; width: 100%; height: 100%; object-fit: cover;">
        <img class="card-img-top" :src="drink.imageUrl" alt="Card image cap" width="100px" height="400px">
        <div class="card-body">
          <h5 class="card-title">{{ drink.name }}</h5>
          <p class="card-text">{{ drink.price }} €</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
  
  <script>
  export default {
    props: ['drinks'],
  };
  </script>
  
  <style scoped>
  .drink-list {
    padding: 20px;
  }
  
  .thumbnails {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .thumbnail {
    width: 45%;
    margin-bottom: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .thumbnail-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .drink-details {
    padding: 10px;
  }
  
  .drink-details h3 {
    margin-top: 0;
    font-size: 18px;
  }
  
  .drink-details p {
    margin: 5px 0;
    font-size: 14px;
  }
  </style>
  