import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/AppRouter.js'
import './app/AppStyle.css'
import store from './app/AppStore.js'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
