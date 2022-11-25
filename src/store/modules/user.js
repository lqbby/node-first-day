import { login } from '@/api/user'
import { setToken , getToken, removeToken } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    uname:'',
    userInfo: {}
  },
  mutations: {
    setToken(state, val) {
      state.token = val.token
      state.uname = val.userName
      state.userInfo = val
      setToken(val.token)
    },
    // getCode(state, payload) {
    //   state.token = payload
    // },
    getUserInfo(state, payload) {
      state.userInfo = payload
    },
    removeToken(state){
      state.token = null
      state.uname = ''
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction (context, payload) {
      const {data} = await login(payload)
      console.log(data)
      if (data.success) {
        context.commit('setToken', data)
        router.push('/')
      } else {
      console.log('登录失败')
      }
    },
    // getCode(context, payload) {
    //   context.commit('getCode', payload)
    // },
    getUserInfo(context, payload) {
      context.commit('getUserInfo', payload)
    },
    removeToken(context){
      context.commit('removeToken')
    }
  }
}
