// NPM Modules
import { createRouter, createWebHashHistory } from 'vue-router';

// Views / Components
import Home from '../views/Home.vue';
import Departments from '../views/Departments.vue';
import Category from '../views/Category.vue';
import Items from '../views/Items.vue';
import AllItems from '../views/AllItems.vue';
import Cart from '../views/Cart.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments
  },
  {
    path: '/departments/:department',
    name: 'Categories',
    component: Category
  },
  ,
  {
    path: '/departments/:department/:category',
    name: 'Items',
    component: Items
  },
  {
    path: '/items',
    name: 'All Items',
    component: AllItems
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
