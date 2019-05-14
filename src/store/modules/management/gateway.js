import GatewayApi from '@/api/gateway'

export default {
  state: {
    res: {},
    one: {},
  },
  actions: {
    queryGatewayPageAction({commit}, data){
      GatewayApi.page(data).then(res => {
        commit('queryGatewayPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    queryGatewayByIdAction({commit}, id) {
      GatewayApi.queryById(id).then(res => {
        commit('queryGatewayByIdMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveGatewayAction({commit}, data) {
      GatewayApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateGatewayAction({commit}, data) {
      GatewayApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryGatewayPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteGatewayAction({commit}, data) {
      GatewayApi.deletes(data).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
  },
  mutations: {
    queryGatewayPageMutations(state, res) {
      state.res = res;
    },
    queryGatewayByIdMutations(state, res) {
      state.one = res
    },
    saveGatewayMutations(state, res) {

    },
    updateGatewayMutations(state, res) {
    },
    deleteGatewayMutations(state, res) {
    },
  },

}