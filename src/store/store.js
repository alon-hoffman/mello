import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { boardStore } from './board.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    boardStore,
  },
  state: {
    isScreen: false,
  },
  getters: {
    isScreen(state) {
      return state.isScreen
    }
  },
  mutations: {
    toggleScreen(state) {
      state.isScreen = !state.isScreen
    },
  },
  actions: {
  }
})
