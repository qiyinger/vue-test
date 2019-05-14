<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecomicroserviceVersion-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      index-row
      :columns="columns"
      :options="options"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      title="微服务版本列表"
      add-title="添加微服务版本"
      :add-template="addTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      edit-title="修改微服务版本"
      :edit-template="editTemplate"
      @row-edit="handleRowEdit"
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
  import {mapActions} from 'vuex';
  import MicroserviceVersionApi from '@/api/microserviceVersion';
  import _ from 'lodash'

  //Vue.use(D2Crud)

export default {
  name:'microservice-version-table',
  components:{D2Crud},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.microserviceVersion.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.microserviceVersion.res.page)
    }
  },
  props: {
    serviceId: '',
  },
  data() {
    return {
      isShowDetail: false,
      detailData : {},
      columns: [
        {
          title: '微服务版本',
          key: 'version',
        },
        {
          title: '上线状态',
          key: 'online_status'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '所属微服务',
          key: 'microserviceId'
        },
        {
          title: '微服务描述',
          key: 'description'
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
        code: {
          title: '微服务版本',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '微服务描述',
          value: '',
          component: {
            span: 24
          }
        },
      },
      editTemplate: {
        code: {
          title: '微服务版本',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '微服务描述',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        version: [ { required: true, message: '请输入微服务版本号', trigger: 'blur' } ],
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
   /* handleRowAdd: function () {
      this.queryMicroserviceVersionPage({});
    }*/
  },
  mounted() {
   /* this.queryMicroserviceVersionPage({
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
    fetchData() {
      this.loading = true;
      this.queryMicroserviceVersionPage({...this.page, microserviceId: this.serviceId});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      MicroserviceVersionApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      this.queryMicroserviceVersionPage({...this.page, microserviceId: this.serviceId});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      MicroserviceVersionApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryMicroserviceVersionPage({...this.page, microserviceId: this.serviceId});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      MicroserviceVersionApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      });
      done()
      this.queryMicroserviceVersionPage({...this.page, microserviceId: this.serviceId});
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryMicroserviceVersionPage({...this.page, microserviceId: this.serviceId});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryMicroserviceVersionPage: 'queryMicroserviceVersionPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveMicroserviceVersion: 'saveMicroserviceVersionAction',
      deleteMicroserviceVersion: 'deleteMicroserviceVersionAction',
      updateMicroserviceVersion: 'updateMicroserviceVersionAction',
    }),
    cloneDeep(val){
      return _.cloneDeep(val);
    },
    handleRowClick(row, column, event) {
      if (column.property === 'version') {
        //  this.isShowDetail = true;
     //   this.detailData = row;
     //   let name = 'microserviceVersionDetail';
        this.$router.push({
          name: 'microserviceVersion-detail',
          params: _.cloneDeep(row),
        });
      }
    },
    handleCloseDetail() {
      this.isShowDetail = false;
    }
  }
}
</script>
