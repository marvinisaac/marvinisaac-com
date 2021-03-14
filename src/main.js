import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/AppRouter.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
