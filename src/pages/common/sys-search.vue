<template>
  <el-form ref="form" v-model="thisQuery">
    <el-row :gutter="20" type="flex">
      <el-col>
        <el-input placeholder="系统名称" v-model="thisQuery.name"></el-input>
      </el-col>
      <el-col>
        <el-input placeholder="系统编号" v-model="thisQuery.code"></el-input>
      </el-col>
      <el-col>
        <el-button class="margin-left-20" @click="search">查询</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'sys-search',
    components: {},
    props: {
      query: {}
    },
    // 数据
    data() {
      return {
        thisQuery: {},
      }
    },
    // 侦听器
    watch: {},
    // 生命周期钩子
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.thisQuery = _.cloneDeep(this.query);
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    // 事件处理方法
    methods: {
      search() {
        this.query.code = this.thisQuery.code;
        this.query.name = this.thisQuery.name;
        this.$emit('querySystem');
      }
    }
  }
</script>

