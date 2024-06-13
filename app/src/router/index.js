import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeView from '@/views/HomeView.vue'
import AddProduct from '../views/Products/AddProduct.vue'
import GetProducts from '../views/Products/GetProduct.vue'
import EditProducts from '../views/Products/EditProduct.vue'
import AdminView from '../views/AdminView.vue'
import GetIngredient from '../views/Ingredients/GetIngredient.vue'
import AddIngredient from '../views/Ingredients/AddIngredient.vue'
import EditIngredients from '../views/Ingredients/EditIngredient.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue')
  },
  {
    path: '/admin/product/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/admin/product/',
    name: 'GetProducts',
    component: GetProducts
  },
  {
    path: '/admin/product/:id',
    name: 'EditProducts',
    component: EditProducts
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/admin/ingredient',
    name: 'GetIngredients',
    component: GetIngredient
  },
  {
    path: '/admin/ingredient/add',
    name: 'AddIngredient',
    component: AddIngredient
  },
  {
    path: '/admin/ingredient/:id',
    name: 'EditIngredients',
    component: EditIngredients
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
