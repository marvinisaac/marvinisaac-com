import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '/timeline',
        component: () => import(/* webpackChunkName: "timeline" */ './pages/Timeline/Timeline.vue')
    }, {
        path: '/post/:id',
        component: () => import(/* webpackChunkName: "post" */ './pages/Post/Post.vue'),
        props: true
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
