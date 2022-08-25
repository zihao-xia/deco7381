import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router