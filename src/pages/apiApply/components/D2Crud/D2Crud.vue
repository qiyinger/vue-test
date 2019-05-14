<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecoapi-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      index-row
      :columns="columns"
      :options="options"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      title="我的审核"
      @row-click="handleRowClick"
      @pagination-current-change="paginationCurrentChange">
    </d2-crud>
  </div>
</template>

<script>
//import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import {mapActions} from 'vuex'
import ApiApplyApi from '@/api/apiApply'
import _ from 'lodash'

//Vue.use(D2Crud)

export default {
  name:'api-table',
  components:{D2Crud},
  computed: {
    data() {
      return _.cloneDeep(this.$store.state.apiApply.res.records)
    },
    pagination() {
      return _.cloneDeep(this.$store.state.apiApply.res.page)
    }
  },
  data() {
    return {
      isShowDetail: false,
      detailData : {},
      columns: [
        {
          title: '接口/微服务版本标识',
          key: 'asId'
        },
        {
          title: '申请类型',
          key: 'type',
        },
        {
          title: '申请人',
          key: 'applicant',
        },
        {
          title: '申请时间',
          key: 'applyTime',
        },
        {
          title: '修改时间',
          key: 'modifyTime',
        },
        {
          title: '微服务版本',
          key: 'serviceVersionId',
        },
        {
          title: '审核人',
          key: 'auditorName',
        }
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
      this.queryApiApplyPage({});
    }*/
  },
  mounted() {
   /* this.queryApiApplyPage({
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
    paginationCurrentChange (currentPage) {
      this.page.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true;
      this.queryApiApplyPage({...this.page});
      this.loading = false;
    },
    ...mapActions({
      queryApiApplyPage: 'queryApiApplyPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
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
