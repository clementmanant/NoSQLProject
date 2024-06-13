<template>
    <router-link :to="{name: 'GetProducts'}">
        <button class="btn btn-primary btn-lg">Admin Products</button>
    </router-link>
    <br>
    <router-link :to="{name: 'GetIngredients'}">
        <button class="btn btn-primary btn-lg">Admin Ingredients</button>
    </router-link>
</template>

<script>
    export default {

    }
</script>

<style>
    .btn {
        margin-bottom: 20px;
    }
</style>