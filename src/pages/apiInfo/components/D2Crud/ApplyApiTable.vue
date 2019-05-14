<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecoapi-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
  </div>
</template>

<script>
  //import Vue from 'vue'
  import D2Crud from '@d2-projects/d2-crud'
  import {mapActions} from 'vuex'
  import VersionList from '../../../microserviceVersion/components/D2Crud/D2Crud';
  import _ from 'lodash'

  //Vue.use(D2Crud)

  export default {
    name:'api-table',
    components:{D2Crud, VersionList},
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

        ],
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
      ...mapActions({
        queryApiInfoPage: 'queryApiInfoPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
      handleRowClick(row, event, column) {
        if (column.property === 'name') {
          this.isShowDetail = true;
          this.detailData = row;
        }
      },
      handleCloseDetail() {
        this.isShowDetail = false;
      }
    }
  }
</script>
