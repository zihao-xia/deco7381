import { routes } from '@/router'
const state = {
  routers: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.routers = routers
  }
}

const actions = {
  getRouters({ commit }) {
    return new Promise(resolve => {
      const res = routes
      commit('SET_ROUTERS', res)
      resolve(res)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
