<template>
    <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top embed-responsive-item" :src="product.imageUrl" alt="Card image cap">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.price }} €</p>
            <div v-if="admin === true">
                <router-link :to="{name: 'EditProducts', params: {id: product._id}}">
                    <button class="btn btn-primary">Edit</button>
                </router-link>
            </div>
            <div v-if="admin === false">
                <button class="btn btn-primary" @click="addToCart">Add to cart</button>
            </div>
            <div v-if="cart === true">
                <button class="btn btn-danger" @click="removeFromCart">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');
    const sweetalert = require('sweetalert');
    export default {
        name: "ProductBox",
        props: ["product", "admin", "baseUrl", "cart"],
        methods: {
            async addToCart() {
                axios({
                    method: 'post',
                    url: `${this.baseUrl}redis/basket/userId/`,
                    data: JSON.stringify(this.product),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    sweetalert({
                        text: "Product added to cart successfully",
                        icon: "success"
                    })
                }).catch((err) => {
                    console.log(err)
                    sweetalert({
                        text: "Error adding product to cart",
                        icon: "error"
                    });
                })
            },
            async removeFromCart() {
                axios({
                    method: 'put',
                    url: `${this.baseUrl}redis/basket/userId/${this.product._id}`,
                    data: JSON.stringify(this.product),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    sweetalert({
                        text: "Product removed from cart successfully",
                        icon: "success"
                    });
                    this.$emit('product-removed');
                }).catch((err) => {
                    console.log(err)
                    sweetalert({
                        text: "Error removing product from cart",
                        icon: "error"
                    });
                })
            }
        }
    };
</script>

<style scoped>
    .card-img-top {
        object-fit: cover;
    }
</style>
