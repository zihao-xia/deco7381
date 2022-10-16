import Vuex from 'vuex'
// import app from './modules/app'
// import permission from './modules/permission'
// import user from './modules/user'
import getters from './getters'
import { createStore } from 'vuex'
import user from './modules/user'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    user
  }
})

export default store
