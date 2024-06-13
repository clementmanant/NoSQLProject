<template>
    <div class="container">
        <div class="row">
            <div class="text-center col-12">
                <h3 class="pt-3">Add ingredient</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="imageUrl">
                    </div>
                    <button type="button" class="btn btn-primary" @click="addIngredient">Submit</button>
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
        name: "AddIngredient",
        data() {
            return {
                name: "",
                imageUrl: "",
            }
        },
        methods: {
            addIngredient() {
                const newIngredient = {
                    name: this.name,
                    imageUrl: this.imageUrl
                }

                const baseUrl = "http://localhost:3000/api";

                axios({
                    method: 'post',
                    url: `${baseUrl}/ingredients/`,
                    data: JSON.stringify(newIngredient),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    sweetalert({
                        text: "Ingredient added successfully",
                        icon: "success"
                    })
                }).catch((err) => {
                    console.log(err)
                    sweetalert({
                        text: "Error adding ingredient",
                        icon: "error"
                    });
                })
            }
        }
    }
</script>

<style scoped>
</style>