import MicroserviceApi from '@/api/microservice'

export default {
  state: {
    res: {},
  },
  actions: {
    queryMicroservicePageAction({commit}, data){
      MicroserviceApi.page(data).then(res => {
        commit('queryMicroservicePageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveMicroserviceAction({commit}, data) {
      MicroserviceApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateMicroserviceAction({commit}, data) {
      MicroserviceApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryMicroservicePageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteMicroserviceAction({commit}, data) {
      MicroserviceApi.deletes(data).then(res => {
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
    queryMicroservicePageMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    saveMicroserviceMutations(state, res) {

    },
    updateMicroserviceMutations(state, res) {
    },
    deleteMicroserviceMutations(state, res) {
    },
  },

}