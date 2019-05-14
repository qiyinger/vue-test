import ApiInfoApi from '@/api/apiInfo'

export default {
  state: {
    res: {},
    url:{},
  },
  actions: {
    queryApiInfoPageAction({commit}, data){
      ApiInfoApi.page(data).then(res => {
        commit('queryApiInfoPageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveApiInfoAction({commit}, data) {
      ApiInfoApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    queryApiInfoUrlAction({commit}, data) {
      ApiInfoApi.url(data).then(res => {
        console.log(res)
        commit('queryApiInfoUrlMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    importApiInfoAction({commit}, data) {
      ApiInfoApi.imports(data).then(() => {
        this.$message({
          message: '导入成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateApiInfoAction({commit}, data) {
      ApiInfoApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryApiInfoPageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    deleteApiInfoAction({commit}, data) {
      ApiInfoApi.deletes(data).then(res => {
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
    queryApiInfoPageMutations(state, res) {
      state.res = res;
    },
    queryApiInfoUrlMutations(state, res) {
      state.url = res;
    },
    importApiInfoMutations(state, res) {

    },
    saveApiInfoMutations(state, res) {

    },
    updateApiInfoMutations(state, res) {
    },
    deleteApiInfoMutations(state, res) {
    },
  },

}