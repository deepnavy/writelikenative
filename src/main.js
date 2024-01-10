import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import './assets/main.css'
import router from './router'
import VueGtag from 'vue-gtag'

const app = createApp(App)

// Use Vue Router
app.use(router)

app.use(
    VueGtag,
    {
        appName: 'Write Like a Native',
        pageTrackerScreenviewEnabled: true,
        config: { id: import.meta.env.VITE_MEASUREMENT_ID }
    },
    router
)

// Mount the app
app.mount('#app')


