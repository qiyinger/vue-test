<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecoapi-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <api-search @query-api="searchApi"/>
    <hr/>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="概览" name="first">
        <api-iframe :query="query"/>
      </el-tab-pane>
      <el-tab-pane label="调用链路" name="second">
        <trace-iframe :query="query"/>
      </el-tab-pane>

      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
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
import TraceIframe from '../trace-iframe';
import _ from 'lodash';

//Vue.use(D2Crud)

export default {
  name:'api-table',
  components:{D2Crud,VersionList,ApiSearch,ApiIframe,TraceIframe},
  computed: {
  },
  data() {
    return {
      query: {
        microserviceId: '',
      },
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
  },
  methods: {
    ...mapActions({
      queryApiInfoPage: 'queryApiInfoPageAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      saveApiInfo: 'saveApiInfoAction',
      deleteApiInfo: 'deleteApiInfoAction',
      updateApiInfo: 'updateApiInfoAction',
    }),
    searchApi(val) {
      console.log(val);
      this.query.microserviceId = val;
      console.log(this.query);
    }
  }
}
</script>
