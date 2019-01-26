import ApplicationApi from '@/api/application'

export default {
  state: {
    res: {},
  },
  actions: {
    queryApplicationPageAction({commit}, data){
      ApplicationApi.page(data).then(res => {
        commit('queryApplicationPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveApplicationAction({commit}, data) {
      ApplicationApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateApplicationAction({commit}, data) {
      ApplicationApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryApplicationPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteApplicationAction({commit}, data) {
      ApplicationApi.deletes(data).then(res => {
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
    queryApplicationPageMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    saveApplicationMutations(state, res) {

    },
    updateApplicationMutations(state, res) {
    },
    deleteApplicationMutations(state, res) {
    },
  },

}