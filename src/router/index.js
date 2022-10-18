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
                path: '/',
                name: 'Home',
                component: () => import('@/components/home.vue')
            },
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
            },
            {
                path: '/notification',
                name: 'Notification',
                meta: {
                    title: 'Notification',
                    hideDashboard: true
                },
                component: () => import('../pages/notification.vue')
            },
            {
                path: '/user',
                name: 'User Info',
                meta: {
                    title: 'My Board'
                },
                component: () => import('@/components/userinfo.vue')
            },
            {
                path: '/taskmanagement',
                name: 'TaskManagement',
                meta: {
                    title: 'Task Management'
                },
                component: () => import('@/components/taskmanagement.vue')
            },
            {
                path: '/calendar',
                name: 'Calendar',
                meta: {
                    title: 'Calendar',
                    hideDashboard: true
                },
                component: () => import('../pages/calendar.vue')
            },
            {
                path: '/discussionboard',
                name: 'DiscussionBoard',
                meta: {
                    title: 'Discussion Board',
                    hideDashboard: true
                },
                component: () => import('../pages/discussionboard.vue')
            },
            {
                path: '/tutorNotification',
                name: 'Tutor Notification',
                meta: {
                    title: 'Tutor Notification',
                    hideDashboard: true
                },
                component: () => import('../pages/tutornotification.vue')
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
        path: '/signup',
        name: 'SignUp',
        meta: {
            title: 'Sign Up'
        },
        component: () => import('@/views/signup.vue')
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router