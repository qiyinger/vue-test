<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      index-row
      :columns="columns"
      :options="options"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      title="路由列表"
      add-title="添加路由"
      :add-template="addTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      @row-click="handleRowClick"
      @pagination-current-change="paginationCurrentChange">
      <el-button icon="el-icon-plus" slot="header" size="middle"
                 style="margin-bottom: 5px" @click="addRow">新增</el-button>
    </d2-crud>
  </div>
</template>

<script>
//import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import {mapActions} from 'vuex'
import RouteApi from '@/api/route'
import _ from 'lodash';
import FilterList from '../filter-list';

//Vue.use(D2Crud)

export default {
  name:'route-table',
  components:{D2Crud,FilterList},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.route.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.route.res.page)
    }
  },
  props: {
    gatewayId: '',
  },
  data() {
    return {
      detailData : {},
      columns: [
        {
          title: '路由名称',
          key: 'name'
        },
        {
          title: '路由编码',
          key: 'code',
        },
        {
          title: '绑定类型',
          key: 'bindType',
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '所属网关',
          key: 'gatewayId',
        },
        {
          title: '发布状态',
          key: 'active',
        },
      ],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '操作',
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            return true;
          },
          disabled (index, row) {
            return false;
          }
        }
      },
      addTemplate: {
        name: {
          title: '路由名称',
          value: '',
          component: {
            span: 12
          }
        },
        code: {
          title: '路由编码',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '路由描述',
          value: '',
          component: {
            span: 24
          }
        },
        gatewayId: {
          title: '所属网关',
          value: '',
          component: {
            span: 12
          }
        },
        bindId: {
          title: '绑定id',
          value: '',
          component: {
            span: 12
          }
        },
        filters: {
          title: '过滤器',
          value: {text:'过滤器', list:[{value:''}]},
          component: {
            name: FilterList,
          }
        },
        predicates: {
          title: '匹配规则',
          value: {text:'匹配规则', list:[{value:''}]},
          component: {
            name: FilterList,
          }
        },
        priority: {
          title: '优先级',
          value: '',
          component: {
            span: 12
          }
        }
      },
      editTemplate: {
        name: {
          title: '路由名称',
          value: '',
          component: {
            span: 12
          }
        },
        code: {
          title: '路由编码',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '路由描述',
          value: '',
          component: {
            span: 24
          }
        },
        uri: {
          title: '路由地址',
          value: '',
          component: {
            span: 12
          }
        },
        filters: {
          title: '过滤器',
          value: '',
          component: {
            span: 24
          }
        },
        predicates: {
          title: '匹配规则',
          value: '',
          component: {
            span: 24
          }
        },
        priority: {
          title: '优先级',
          value: '',
          component: {
            span: 12
          }
        }
      },
      formRules: {
        name: [ { required: true, message: '请输入路由名称', trigger: 'blur' } ],
        code: [ { required: true, message: '请输入路由编码', trigger: 'blur' } ],
        gatewayId: [ { required: true, message: '请选择所属网关', trigger: 'blur' } ],
        description: [ { required: false} ]
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      options: {
        stripe: true
      }

    }
  },
  watch: {
    gatewayId: function (val) {
      this.queryRoutePage({...this.page, gatewayId: val});
    }
  },
  mounted() {
   /* this.queryRoutePage({
      id: "",
      code: "",
      name: "",
      status: "",
      startCreateTime: "",
      endCreateTime: "",
      createTime: "",
      description: "",
      rsskey: "",
      userId: "",
      userName: "",
    });*/
    if (_.isEmpty(this.gatewayId)) {
      this.queryRoutePage({...this.page, gatewayId: this.gatewayId});
    }
    this.fetchData();
  },
  methods: {
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    paginationCurrentChange (currentPage) {
      this.page.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true;
      this.queryRoutePage({...this.page});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true;
      row.filters = row.filters.list.map(item => item.value);
      row.predicates = row.predicates.list.map(item => item.value);
      RouteApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      this.queryRoutePage({...this.page});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      RouteApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryRoutePage({...this.page});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      RouteApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      this.queryRoutePage({...this.page});
      });
      done()
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryRoutePage({...this.page});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryRoutePage: 'queryRoutePageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveRoute: 'saveRouteAction',
      deleteRoute: 'deleteRouteAction',
      updateRoute: 'updateRouteAction',
    }),
    cloneDeep(val){
      return _.cloneDeep(val);
    },
    handleRowClick(row, column, event) {
      if (column.property === 'name') {
        this.$router.push({
          name: 'route-detail',
          params: {routeId: row.id},
        });
      }
    },
  }
}
</script>
