<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <ApplicationDialog
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
      title="应用列表"
      add-title="添加应用"
      :add-template="addTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      edit-title="修改应用"
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
import ApplicationApi from '@/api/application'
import ApplicationDialog from '../application-dialog'
import _ from 'lodash'

//Vue.use(D2Crud)

export default {
  name:'application-table',
  components:{D2Crud,ApplicationDialog},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.application.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.application.res.page)
    }
  },
  data() {
    return {
      isShowDetail: false,
      detailData : {},
      columns: [
        {
          title: '应用编号',
          key: 'code',
        },
        {
          title: '应用名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '所属系统',
          key: 'systemId',
        },
        {
          title: 'api数量',
          key: 'apiCount',
        },
        {
          title: '启用状态',
          key: 'status',
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
          title: '应用编号',
          value: '',
          component: {
            span: 12
          }
        },
        name: {
          title: '应用名称',
          value: '',
          component: {
            span: 12
          }
        },
        systemId: {
          title: '所属系统',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '应用描述',
          value: '',
          component: {
            span: 24
          }
        },
      },
      editTemplate: {
        code: {
          title: '应用编号',
          value: '',
          component: {
            span: 12,
            disabled: true
          }
        },
        name: {
          title: '应用名称',
          value: '',
          component: {
            span: 12
          }
        },
        systemId: {
          title: '所属系统',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '应用描述',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        code: [ { required: true, message: '请输入应用编号', trigger: 'blur' } ],
        name: [ { required: true, message: '请输入应用名称', trigger: 'blur' } ],
        systemId: [ { required: true, message: '请选择所属系统', trigger: 'blur' } ],
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
      this.queryApplicationPage({});
    }*/
  },
  mounted() {
   /* this.queryApplicationPage({
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
      this.queryApplicationPage({...this.page});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      ApplicationApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      this.queryApplicationPage({...this.page});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      ApplicationApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryApplicationPage({...this.page});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      ApplicationApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      this.queryApplicationPage({...this.page});
      });
      done()
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryApplicationPage({...this.page});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryApplicationPage: 'queryApplicationPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveApplication: 'saveApplicationAction',
      deleteApplication: 'deleteApplicationAction',
      updateApplication: 'updateApplicationAction',
    }),
    cloneDeep(val){
      return _.cloneDeep(val);
    },
    handleRowClick(row, event, column) {
      if (column.property === 'name') {
        this.isShowDetail = true;
        this.detailData = row;
      }
      console.log("hahahhhhhaahhaa");
    },
    handleCloseDetail() {
      this.isShowDetail = false;
    }
  }
}
</script>
