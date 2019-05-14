import MicroserviceVersionApi from '@/api/microserviceVersion'

export default {
  state: {
    res: {},
  },
  actions: {
    queryMicroserviceVersionPageAction({commit}, data){
      MicroserviceVersionApi.page(data).then(res => {
        commit('queryMicroserviceVersionPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveMicroserviceVersionAction({commit}, data) {
      MicroserviceVersionApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateMicroserviceVersionAction({commit}, data) {
      MicroserviceVersionApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryMicroserviceVersionPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteMicroserviceVersionAction({commit}, data) {
      MicroserviceVersionApi.deletes(data).then(res => {
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
    queryMicroserviceVersionPageMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    saveMicroserviceVersionMutations(state, res) {

    },
    updateMicroserviceVersionMutations(state, res) {
    },
    deleteMicroserviceVersionMutations(state, res) {
    },
  },

}