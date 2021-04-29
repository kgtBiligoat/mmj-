import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    isLogin: false,
    id: -1
  },
  mutations: {
    LOGIN(state, payload) {
      state.username = payload.username
      state.id = payload.id
      state.isLogin = true
    },
    LOGOUT(state) {
      state.username = '',
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
