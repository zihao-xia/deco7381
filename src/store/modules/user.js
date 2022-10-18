import { loginByUsername, getUserInfo } from '@/api/login'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    id: '',
    token: localStorage.getItem('token') || '',
    type: '',
    name: '',
    teamId: '',
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setType(state, type) {
      state.type = type
    },
    setName(state, name) {
      state.name = name
    },
    setTeam(state, teamId) {
      state.teamId = teamId
    }
  },
  actions: {
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.username, userInfo.password).then(res => {
          commit('setToken', res.data.data.token)
          router.replace('/')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data.data
          commit('setId', data.user.id)
          commit('setType', data.user.type)
          commit('setName', data.user.name)
          commit('setTeam', data.user.teamId)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit }) {
      commit('setToken', '')
      commit('setId', '')
      commit('setType', '')
      commit('setName', '')
      commit('setTeam', '')
    }
  }
}