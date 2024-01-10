import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const baseUrl =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_FLASK_APP_BASE_URL_LOCAL
    : import.meta.env.VITE_FLASK_APP_BASE_URL_PROD;
    

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
  history: createWebHistory(baseUrl),
  routes
})

export default router
