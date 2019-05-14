import StrategyCallApi from '@/api/strategyCall'

export default {
  state: {
    res: {},
  },
  actions: {
    queryStrategyCallPageAction({commit}, data){
      StrategyCallApi.page(data).then(res => {
        commit('queryStrategyCallPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveStrategyCallAction({commit}, data) {
      StrategyCallApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateStrategyCallAction({commit}, data) {
      StrategyCallApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryStrategyCallPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteStrategyCallAction({commit}, data) {
      StrategyCallApi.deletes(data).then(res => {
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
    queryStrategyCallPageMutations(state, res) {
      state.res = res;
    },
    saveStrategyCallMutations(state, res) {

    },
    updateStrategyCallMutations(state, res) {
    },
    deleteStrategyCallMutations(state, res) {
    },
  },

}