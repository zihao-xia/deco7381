import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        meta: {
            title: 'Home'
        }, children: [
            {
                path: '/healthScore',
                name: 'Health Score',
                meta: {
                    title: 'Health Score',
                    hideDashboard: true
                },
                component: () => import('../pages/healthscore.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login'
        },
        component: () => import('@/views/login.vue')
    },
    {
        path: '/notification',
        name: 'Notification',
        meta: {
            title: 'Notification'
        },
        component: Layout
    },
    {
        path: '/myBoard',
        name: 'My Board',
        meta: {
            title: 'My Board'
        },
        component: Layout
    },
    {
        path: '/more',
        name: 'Show More',
        meta: {
            title: 'Show More'
        },
        component: Layout,
        children: [
            {
                path: '/goals',
                name: 'Goals',
                meta: {
                    title: 'Goals'
                },
                component: Layout
            },
            {
                path: '/messages',
                name: 'Messages',
                meta: {
                    title: 'Messages'
                },
                component: Layout
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router