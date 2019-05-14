import ApiApplyApi from '@/api/apiApply'

export default {
  state: {
    res: {},
  },
  actions: {
    queryApiApplyPageAction({commit}, data){
      ApiApplyApi.page(data).then(res => {
        commit('queryApiApplyPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveApiApplyAction({commit}, data) {
      ApiApplyApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateApiApplyAction({commit}, data) {
      ApiApplyApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryApiApplyPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteApiApplyAction({commit}, data) {
      ApiApplyApi.deletes(data).then(res => {
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
    queryApiApplyPageMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    saveApiApplyMutations(state, res) {

    },
    updateApiApplyMutations(state, res) {
    },
    deleteApiApplyMutations(state, res) {
    },
  },

}