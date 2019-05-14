<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecostrategyIp-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      index-row
      :columns="columns"
      :options="options"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      title="IP策略"
      add-title="添加IP策略"
      :add-template="addTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      edit-title="修改IP策略"
      :edit-template="editTemplate"
      @row-edit="handleRowEdit"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
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
import StrategyIpApi from '@/api/strategyIp'
import util from '@/libs/util.js'
import _ from 'lodash'

//Vue.use(D2Crud)

export default {
  name:'strategyIp-table',
  components:{D2Crud},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.strategyIp.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.strategyIp.res.page)
    }
  },
  data() {
    return {
      detailData : {},
      columns: [
        {
          title: '策略名称',
          key: 'name',
        },
        {
          title: '策略类型',
          key: 'type'
        },
        {
          title: '所属网关',
          key: 'gatewayId',
        },
        {
          title: '策略描述',
          key: 'description',
        },
        {
          title: 'IP列表',
          key: 'ipList',
        }
      ],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '操作',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
          show (index, row) {
            return true;
          },
          disabled (index, row) {
            return false;
          }
        },
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
          title: '策略名称',
          value: '',
          component: {
            span: 12
          }
        },
        type: {
          title: '策略类型',
          value: '',
          component: {
            span: 12
          }
        },
        gatewayId: {
          title: '所属网关',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '策略描述',
          value: '',
          component: {
            span: 24
          }
        },
        ipList: {
          title: 'IP列表',
          value: '',
          component: {
            text: 24
          }
        },
      },
      editTemplate: {
        name: {
          title: '策略名称',
          value: '',
          component: {
            span: 12
          }
        },
        type: {
          title: '策略类型',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '策略描述',
          value: '',
          component: {
            span: 24
          }
        },
        ipList: {
          title: 'IP列表',
          value: '',
          component: {
            text: 24
          }
        },
      },
      formRules: {
        name: [{required: true, message: '请输入IP策略名称', trigger: 'blur'}],
        type: [{required: true, message: '请输入IP策略类型', trigger: 'blur'}],
        ipList: [{required: true, message: '请输入IP列表', trigger: 'blur'}],
        description: [{required: false}]
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
   /* handleRowAdd: function () {
      this.queryStrategyIpPage({});
    }*/
  },
  mounted() {
   /* this.queryStrategyIpPage({
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
      this.queryStrategyIpPage({...this.page});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      StrategyIpApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      this.queryStrategyIpPage({...this.page});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      StrategyIpApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryStrategyIpPage({...this.page});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      StrategyIpApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.queryStrategyIpPage({...this.page});
      });
      done()
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryStrategyIpPage({...this.page});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryStrategyIpPage: 'queryStrategyIpPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveStrategyIp: 'saveStrategyIpAction',
      deleteStrategyIp: 'deleteStrategyIpAction',
      updateStrategyIp: 'updateStrategyIpAction',
    }),
    cloneDeep(val){
      return _.cloneDeep(val);
    },
  }
}
</script>
