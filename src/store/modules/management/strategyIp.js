import StrategyIpApi from '@/api/strategyIp'

export default {
  state: {
    res: {},
  },
  actions: {
    queryStrategyIpPageAction({commit}, data){
      StrategyIpApi.page(data).then(res => {
        commit('queryStrategyIpPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveStrategyIpAction({commit}, data) {
      StrategyIpApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateStrategyIpAction({commit}, data) {
      StrategyIpApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryStrategyIpPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteStrategyIpAction({commit}, data) {
      StrategyIpApi.deletes(data).then(res => {
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
    queryStrategyIpPageMutations(state, res) {
      state.res = res;
    },
    saveStrategyIpMutations(state, res) {

    },
    updateStrategyIpMutations(state, res) {
    },
    deleteStrategyIpMutations(state, res) {
    },
  },

}