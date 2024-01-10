import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
