import ServiceInstanceApi from '@/api/serviceInstance'

export default {
  state: {
    res: {},
  },
  actions: {
    queryServiceInstanceListAction({commit}, data){
      ServiceInstanceApi.list(data).then(res => {
        commit('queryServiceInstanceListMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    shutdownServiceInstanceAction({commit}, data) {
      ServiceInstanceApi.shutdown(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
  },
  mutations: {
    queryServiceInstanceListMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    shutdownServiceInstanceMutations(state, res) {

    },
  },

}