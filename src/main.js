import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/AppRouter.js'
import './app/AppStyle.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
