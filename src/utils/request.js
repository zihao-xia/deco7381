import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
//import getToken from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 5000
})

service.interceptors.request.use(config => {
    // if (store.getters.token) {
    //     config.headers['x-token'] = getToken()
    // }
    config.headers.common['Authorization'] = window.sessionStorage.getItem('token') === null ? null : window.sessionStorage.getItem('token')
    return config
  },
  error => {
        console.log(error)
        Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
    const res = response.data
    if (res.code === 1) {
        return response
    } else {
        ElMessage.error(res.meta.msg)
        return Promise.reject(response)
    }
  }, error => {
    console.log('err' + error)
    ElMessage({
        message: 'Login connection timed out',
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service