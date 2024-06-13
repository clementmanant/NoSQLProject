<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="pt-3">Edit product</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form v-if="product">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="product.name" required>
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" class="form-control" v-model="product.quantity" required>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" v-model="product.price" required>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="product.imageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Steps</label><br>
                        Input steps using the following format : 
                        <br>
                        [ { "ingredient_id": "{ingredientId}", "ordre": 1, "quantity": 4 }, <br>{ "ingredient_id": "{ingredientId}", "ordre": 2, "quantity": 8 } ]
                        <textarea type="text" class="form-control" v-model="stepsJson" required />
                    </div>
                    <button type="button" class="btn btn-primary" @click="editProduct">Submit</button>
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
                product: null,
                id: null,
                stepsJson: null
            }
        },
        props: ["baseUrl", "products"],
        methods: {
            async editProduct() {
                const steps = JSON.parse(this.stepsJson)
                this.product.steps = steps
                console.log('product', this.product)
                await axios.put(`${this.baseUrl}products/${this.id}/`, this.product)
                .then(() => {
                    this.$emit("fetchData");
                    this.$router.push({name: 'GetProducts'})
                    sweetalert({
                        text: "Product updated successfully",
                        icon: "success"
                    })
                })
                .catch((err) => console.log('err', err))
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.product = this.products.find(product => product._id === this.id)

            if (this.product && this.product.steps) {
            this.stepsJson = JSON.stringify(this.product.steps, null, 2);
        }
        }
    }
</script>