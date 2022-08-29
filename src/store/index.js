import { createStore } from 'vuex'

export default createStore({
  state: {
    // 状态变量
  },
  mutations: {
    // 状态更改的地方
    // 这里只能进行同步代码
  },
  actions: {
    // 异步操作mutations （变相让mutation支持异步）
  },
  modules: {
    // vuex 模块化
  }
})