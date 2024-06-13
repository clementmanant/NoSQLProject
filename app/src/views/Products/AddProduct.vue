<template>
    <div class="container">
        <div class="row">
            <div class="text-center col-12">
                <h3 class="pt-3">Add product</h3>
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
                        <label>Quantity</label>
                        <input type="number" class="form-control" v-model="quantity">
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" v-model="price" />
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="imageUrl">
                    </div>
                    <div class="form-group">
                        <label>Steps</label><br>
                        Input steps using the following format : 
                        <br>
                        [ { "ingredient_id": "{ingredientId}", "ordre": 1, "quantity": 4 }, <br>{ "ingredient_id": "{ingredientId}", "ordre": 2, "quantity": 8 } ]
                        <textarea class="form-control" v-model="stepsJson"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addProduct">Submit</button>
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
        name: "AddProduct",
        data() {
            return {
                name: "",
                quantity: 0,
                price: 0,
                imageUrl: "",
                stepsJson: ""
            }
        },
        methods: {
            addProduct() {
                const steps = JSON.parse(this.stepsJson);
                
                const newProduct = {
                    name: this.name,
                    quantity: this.quantity,
                    price: this.price,
                    available: true,
                    imageUrl: this.imageUrl,
                    steps: steps
                }

                const baseUrl = "http://localhost:3000/api";

                axios({
                    method: 'post',
                    url: `${baseUrl}/products/`,
                    data: JSON.stringify(newProduct),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    sweetalert({
                        text: "Product added successfully",
                        icon: "success"
                    })
                }).catch((err) => {
                    console.log(err)
                    sweetalert({
                        text: "Error adding product",
                        icon: "error"
                    });
                })
            }
        }
    }
</script>

<style scoped>
</style>