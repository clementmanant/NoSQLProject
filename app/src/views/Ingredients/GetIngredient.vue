<template>
    <div class="container">
        <div class="row">
            <div class="text-center col-12">
                <h3 class="pt-3">Ingredients</h3>
                <router-link :to="{name: 'AddIngredient'}">
                    <button class="btn btn-primary" style="float: right;">Add ingredient</button>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div 
                v-for="ingredient of ingredients" 
                :key="ingredient._id" 
                class="col-xl-4 col-md-6 pt-3 d-flex"
            >
                <IngredientBox :ingredient="ingredient" />
            </div>
        </div>
    </div>
</template>

<script>
    import IngredientBox from '../../components/Ingredients/IngredientBox.vue'

    export default {
        name: "GetIngredients",
        components: {IngredientBox},
        props: ["ingredients"]
    }
</script>

<style scoped>
</style>