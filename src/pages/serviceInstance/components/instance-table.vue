<template>
  <el-table
    :data="data"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="实例ID">
            <span>{{ props.row.instanceId }}</span>
          </el-form-item>
          <el-form-item label="主机名">
            <span>{{ props.row.hostName }}</span>
          </el-form-item>
          <el-form-item label="IP地址">
            <span>{{ props.row.ipAddr }}</span>
          </el-form-item>
          <el-form-item label="启用状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="服务主页">
            <span>{{ props.row.homePageUrl }}</span>
          </el-form-item>
          <el-form-item label="操作时间">
            <span>{{ props.row.lastUpdatedTimestamp }}</span>
          </el-form-item>
          <el-form-item label="操作类型">
            <span>{{ props.row.actionType }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="实例ID" prop="instanceId"/>
    <el-table-column label="主机名" prop="hostName"/>
    <el-table-column label="启用状态" prop="status"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger" @click="handleShutdown(scope.$index, scope.row)">停止实例
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import {mapActions} from 'vuex';

  export default {

    name: 'instance-table',
    props: {
      versionId: {},
    },
    computed: {
      data() {
        return _.cloneDeep(this.$store.state.serviceInstance.res)
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true;
        this.queryServiceInstanceList({versionId: this.versionId});
        this.loading = false;
      },
      handleShutdown(index, row) {
        this.shutdownServiceInstance({instanceId: row.instanceId, serviceName: row.serviceName})
      },
      ...mapActions({
        queryServiceInstanceList: 'queryServiceInstanceListAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        shutdownServiceInstance: 'shutdownServiceInstanceAction',
      }),
    },

  };
</script>