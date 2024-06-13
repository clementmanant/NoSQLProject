<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="pt-3">Edit Ingredient</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form v-if="ingredient">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="ingredient.name" required>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="ingredient.imageUrl" required>
                    </div>
                    <button type="button" class="btn btn-primary" @click="editIngredient">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');
    const sweetalert = require('sweetalert');
    export default {
        data() {
            return {
                ingredient: null,
                id: null
            }
        },
        props: ["baseUrl", "ingredients"],
        methods: {
            async editIngredient() {
                await axios.put(`${this.baseUrl}ingredients/${this.id}/`, this.ingredient)
                .then(() => {
                    this.$emit("fetchData");
                    this.$router.push({name: 'GetIngredients'})
                    sweetalert({
                        text: "Ingredient updated successfully",
                        icon: "success"
                    })
                })
                .catch((err) => console.log('err', err))
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.ingredient = this.ingredients.find(ingredient => ingredient._id === this.id)
        }
    }
</script>