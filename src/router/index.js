import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        meta: {
            title: 'Home'
        },
        children: [
            {
                path: '/healthScore',
                name: 'Health Score',
                meta: {
                    title: 'Health Score',
                    hideDashboard: true
                },
                component: () => import('../pages/healthscore.vue'),
                children: [
                    {
                        path: '/healthScore/team',
                        name: 'Team Health Score',
                        meta: {
                            title: 'Team Health Score'
                        },
                        component: () => import('../pages/components/teamhealthscore.vue')
                    },
                    {
                        path: '/healthScore/personal',
                        name: 'Personal Health Score',
                        meta: {
                            title: 'Personal Health Score'
                        },
                        component: () => import('../pages/components/personalhealthscore.vue')
                    }
                ]
            },
            {
                path: '/tutor',
                name: 'Tutor',
                meta: {
                    title: 'Tutor',
                    hideDashboard: true
                },
                component: () => import('../pages/tutor.vue')
            },
            {
                path: '/teams/:course',
                name: 'Teams',
                meta: {
                    title: 'Teams',
                    hideDashboard: true
                },
                component: () => import('../pages/teams.vue')
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