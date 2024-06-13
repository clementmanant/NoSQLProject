<template>
    <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top embed-responsive-item" :src="ingredient.imageUrl" alt="Card image cap">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ ingredient.name }}</h5>
            <p class="card-text">{{ ingredient._id }}</p>
            <router-link :to="{name: 'EditIngredients', params: {id: ingredient._id}}">
                <button class="btn btn-primary">Edit</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IngredientBox',
        props: ["ingredient"]
    }
</script>

<style scoped>
    .card-img-top {
        object-fit: cover;
    }
</style>