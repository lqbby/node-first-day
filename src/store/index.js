import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexPersisted from 'vuex-persistedstate'
import biaodan from './modules/biaodan'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    biaodan
  },
  getters,
  plugins: [
    createVuexPersisted({

    })
  ]

})

export default store
