import SystemInfoApi from '@/api/systemInfo'

export default {
  state: {
    res: {},
  },
  actions: {
    querySystemInfoPageAction({commit}, data){
      SystemInfoApi.page(data).then(res => {
        commit('querySystemInfoPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveSystemInfoAction({commit}, data) {
      SystemInfoApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateSystemInfoAction({commit}, data) {
      SystemInfoApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.querySystemInfoPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteSystemInfoAction({commit}, data) {
      SystemInfoApi.deletes(data).then(res => {
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
    querySystemInfoPageMutations(state, res) {
      state.res = res;
      console.warn(state.res);
    },
    saveSystemInfoMutations(state, res) {

    },
    updateSystemInfoMutations(state, res) {
    },
    deleteSystemInfoMutations(state, res) {
    },
  },

}