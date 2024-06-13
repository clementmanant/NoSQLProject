<template>
    <div class="container">
        <div class="row">
            <div class="text-center col-12">
                <h3 class="pt-3">Products</h3>
                <router-link :to="{name: 'AddProduct'}">
                    <button class="btn btn-primary" style="float: right;">Add Product</button>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div 
                v-for="product of products" 
                :key="product._id" 
                class="col-xl-4 col-md-6 pt-3 d-flex"
            >
                <ProductBox :product="product" :admin="true"></ProductBox>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductBox from "../../components/Products/ProductBox.vue";

    export default {
        name: "GetProducts",
        props: ["products"],
        components: {ProductBox},
    }
</script>

<style scoped>
</style>