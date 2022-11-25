//表单
export default {
  namespaced: true,
  state: {
    bh: '', // 编号
    zt: '', // 状态
  },
  mutations: {
    getBh(state, payload) {
      state.bh = payload
    },
    getZt(state, payload) {
      state.zt = payload
    },
  },
  actions: {
    getBh(context, payload) {
      context.commit('getBh', payload)
    },
    getZt(context, payload) {
      context.commit('getZt', payload)
    },
  },
}
