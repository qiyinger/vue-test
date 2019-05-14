import ApmApi from '@/api/apm'

export default {
  state: {
    dashboard: {},
    trace: {}
  },
  actions: {
    queryDashBoardUrlAction({commit}, data) {
      ApmApi.dashBoardUrl(data).then(res => {
        console.log(res)
        commit('queryDashBoardUrlMutation', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    queryTraceUrlAction({commit}, data) {
      ApmApi.traceUrl(data).then(res => {
        console.log(res)
        commit('queryTraceUrlMutation', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
  },
  mutations: {
    queryDashBoardUrlMutation(state, res) {
      state.dashboard = res;
    },
    queryTraceUrlMutation(state, res) {
      state.trace = res;
    },
  },

}