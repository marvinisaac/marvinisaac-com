import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '/not-found',
        component: NotFound
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
