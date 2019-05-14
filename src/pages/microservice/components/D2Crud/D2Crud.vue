<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecomicroservice-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <micro-search :query="query" @query-micro="fetchData"/>
    <SystemDialog
      :isShowDetail="isShowDetail"
      :detail="detailData"
      @close-detail="handleCloseDetail"/>
    <d2-crud
      ref="d2Crud"
      index-row
      :columns="columns"
      :options="options"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      title="微服务列表"
      add-title="添加微服务"
      :add-template="addTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      edit-title="修改微服务"
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
import {mapActions} from 'vuex'
import MicroserviceApi from '@/api/microservice'
import SystemDialog from '../microservice-dialog';
import MicroSearch from '@/pages/common/micro-search';
import util from '@/libs/util.js'
import _ from 'lodash'

//Vue.use(D2Crud)

export default {
  name:'microservice-table',
  components:{D2Crud,SystemDialog,MicroSearch},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.microservice.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.microservice.res.page)
    }
  },
  data() {
    return {
      query: {
        name:'',
        code:'',
        appId:'',
      },
      isShowDetail: false,
      detailData : {},
      columns: [
        {
          title: '微服务编号',
          key: 'code',
        },
        {
          title: '微服务名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '所属应用',
          key: 'appId'
        },
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
          title: '微服务编号',
          value: '',
          component: {
            span: 12
          }
        },
        name: {
          title: '微服务名称',
          value: '',
          component: {
            span: 12
          }
        },
        appId: {
          title: '所属应用',
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
          title: '微服务编号',
          value: '',
          component: {
            span: 10,
            disabled: true,

          }
        },
        name: {
          title: '微服务名称',
          value: '',
          component: {
            span: 10
          }
        },
        appId: {
          title: '所属应用',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '微服务描述',
          value: '',
          component: {
            span: 20
          }
        },
      },
      formRules: {
        code: [ { required: true, message: '请输入微服务编号', trigger: 'blur' } ],
        name: [ { required: true, message: '请输入微服务名称', trigger: 'blur' } ],
        appId: [ { required: true, message: '请选择所属应用', trigger: 'blur' } ],
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
      this.queryMicroservicePage({});
    }*/
  },
  mounted() {
   /* this.queryMicroservicePage({
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
      this.queryMicroservicePage({...this.page,...this.query});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      MicroserviceApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      this.queryMicroservicePage({...this.page});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      MicroserviceApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryMicroservicePage({...this.page});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      MicroserviceApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      });
      done()
      this.queryMicroservicePage({...this.page});
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryMicroservicePage({...this.page});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryMicroservicePage: 'queryMicroservicePageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveMicroservice: 'saveMicroserviceAction',
      deleteMicroservice: 'deleteMicroserviceAction',
      updateMicroservice: 'updateMicroserviceAction',
    }),
    cloneDeep(val){
      return _.cloneDeep(val);
    },
    handleRowClick(row, column, event) {
      if (column.property === 'name') {
        //  this.isShowDetail = true;
     //   this.detailData = row;
     //   let name = 'microserviceDetail';
        this.$router.push({
          name: 'microservice-detail',
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
