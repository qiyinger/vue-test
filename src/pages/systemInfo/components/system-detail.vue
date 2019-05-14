<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane label="系统详情">
        <el-form ref="form" :inline="true" :model="detail" >
          <el-form-item label="系统名称" >
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item label="系统编码">
            <el-input v-model="detail.code"></el-input>
          </el-form-item>
          <el-form-item label="系统描述">
            <el-input v-model="detail.description"></el-input>
          </el-form-item>
          <el-form-item label="系统状态">
            <el-input v-model="detail.status"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="detail.createTime"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="detail.userName"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  //import Vue from 'vue'
  import _ from 'lodash'
  export default {
    name: 'system-detail',
    props: {},
    components: {},
    data() {
      return {
        detail: {},
      };
    },
    watch: {},
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.detail = _.cloneDeep(this.$route.params);
        console.log(this.detail);
      },
      cloneDeep(val) {
        return _.cloneDeep(val);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
   margin-top: 10px;
  }
</style>

