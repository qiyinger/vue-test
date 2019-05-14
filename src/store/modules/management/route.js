import RouteApi from '@/api/route'

export default {
  state: {
    res: {},
    one: {},
  },
  actions: {
    queryRoutePageAction({commit}, data){
      RouteApi.page(data).then(res => {
        commit('queryRoutePageMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    queryRouteByIdAction({commit}, id) {
      RouteApi.queryById(id).then(res => {
        commit('queryRouteByIdMutations', res);
      })
      .catch(err => {
        // 异常情况
      })
    },
    saveRouteAction({commit}, data) {
      RouteApi.save(data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateRouteAction({commit}, data) {
      RouteApi.update(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryRoutePageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateRouteFiltersAction({commit}, data) {
      RouteApi.updateFilters(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryRoutePageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },
    updateRoutePredicatesAction({commit}, data) {
      RouteApi.updatePredicates(data).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.queryRoutePageAction(data);
      })
      .catch(err => {
        // 异常情况
      })
    },

    deleteRouteAction({commit}, data) {
      RouteApi.deletes(data).then(res => {
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
    queryRoutePageMutations(state, res) {
      state.res = res;
    },
    queryRouteByIdMutations(state, res) {
      state.one = res
    },
    saveRouteMutations(state, res) {

    },
    updateRouteMutations(state, res) {
    },
    deleteRouteMutations(state, res) {
    },
  },

}