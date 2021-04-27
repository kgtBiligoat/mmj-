import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    isLogin: false
  },
  mutations: {
    LOGIN(state, payload) {
      state.username = payload.username,
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
