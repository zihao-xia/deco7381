import router from './index'
import store from '@/store'

const whiteList = ['/login', '/signup']
// navigation guards
router.beforeEach((to, from, next) => {
    // check if logged in by token
    if (store.getters.token) {
        store.dispatch('user/GetUserInfo').then(res => {
            //console.log(res)
        }).catch(err => {
            console.log(err)
        })
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})