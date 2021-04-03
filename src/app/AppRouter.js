import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import Post from './pages/Post/Post.vue'

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '/timeline',
        component: () => import(/* webpackChunkName: "timeline" */ './pages/Timeline/Timeline.vue')
    }, {
        path: '/post/:id',
        component: Post,
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
