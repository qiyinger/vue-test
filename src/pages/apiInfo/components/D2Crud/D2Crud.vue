<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecoapi-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <api-search @query-api="searchApi"/>
    <hr/>
    <api-iframe :query="query"/>
  </div>
</template>

<script>
//import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud';
import ApiSearch from '@/pages/common/api-search';
import {mapActions} from 'vuex';
import ApiInfoApi from '@/api/apiInfo';
import VersionList from '../../../microserviceVersion/components/D2Crud/D2Crud';
import ApiIframe from '../api-iframe';
import _ from 'lodash';

//Vue.use(D2Crud)

export default {
  name:'api-table',
  components:{D2Crud,VersionList,ApiSearch,ApiIframe},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.apiInfo.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.apiInfo.res.page)
    }
  },
  data() {
    return {
      query: {
        microserviceId:'',
      },
      isShowDetail: false,
      detailData : {},
      columns: [
        {
          title: '接口名称',
          key: 'name'
        },
        {
          title: '请求路径',
          key: 'path',
        },
        {
          title: '请求协议',
          key: 'protocol',
        },
        {
          title: '请求方法',
          key: 'method',
        },
        {
          title: '类型',
          key: 'type',
        },
        {
          title: '微服务版本',
          key: 'serviceVersionId',
        },
        {
          title: '是否有效',
          key: 'invalid',
        },
        {
          title: '发布状态',
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
        name: {
          title: '接口名称',
          value: '',
          component: {
            span: 12
          }
        },
        serviceVersionId: {
          title: '微服务版本',
          value: '',
          component: {
            span: 12
          }
        },
        path: {
          title: '请求路径',
          value: '',
          component: {
            span: 12
          }
        },
        protocol: {
          title: '请求协议',
          value: '',
          component: {
            span: 12
          }
        },
        method: {
          title: '请求方法',
          value: '',
          component: {
            span: 12
          }
        },
        type: {
          title: '类型',
          value: '',
          component: {
            span: 12
          }
        },
        description: {
          title: '系统描述',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        name: [ { required: true, message: '请输入接口名称', trigger: 'blur' } ],
        serviceVersionId: [ { required: true, message: '请选择微服务版本', trigger: 'blur' } ],
        path: [ { required: true, message: '请输入请求路径', trigger: 'blur' } ],
        protocol: [ { required: true, message: '请输入请求协议', trigger: 'blur' } ],
        method: [ { required: true, message: '请输入请求方法', trigger: 'blur' } ],
        type: [ { required: true, message: '请输入请求类型', trigger: 'blur' } ],
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
      this.queryApiInfoPage({});
    }*/
  },
  mounted() {
   /* this.queryApiInfoPage({
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
      this.queryApiInfoPage({...this.page});
      this.loading = false;
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      ApiInfoApi.save(row).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.queryApiInfoPage({...this.page});
      }).catch();
      done();
      this.formOptions.saveLoading = false
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      ApiInfoApi.update(row).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      this.queryApiInfoPage({...this.page});
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleRowRemove ({index, row}, done) {
      ApiInfoApi.deletes({"ids": row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      this.queryApiInfoPage({...this.page});
      });
      done()
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
      this.queryApiInfoPage({...this.page});
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    ...mapActions({
      queryApiInfoPage: 'queryApiInfoPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveApiInfo: 'saveApiInfoAction',
      deleteApiInfo: 'deleteApiInfoAction',
      updateApiInfo: 'updateApiInfoAction',
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
    },
    searchApi(val) {
      console.log(val);
      this.query.microserviceId = val;
      console.log(this.query);
    }
  }
}
</script>
