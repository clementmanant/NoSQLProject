import { createRouter, createWebHistory } from 'vue-router';
import DrinkList from './components/DrinkList.vue';
import DrinkDetails from './components/DrinkDetails.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: DrinkList
  },
  { 
    path: '/drink/:id', 
    name: 'Details',
    component: DrinkDetails,
  }
  // Vous pouvez ajouter d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
