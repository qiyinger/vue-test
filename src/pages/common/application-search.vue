<template>
  <el-form ref="form" v-model="thisQuery">
    <el-row :gutter="20" type="flex">
      <el-col>
        <el-input placeholder="应用名称" v-model="thisQuery.name"></el-input>
      </el-col>
      <el-col>
        <el-input placeholder="应用编号" v-model="thisQuery.code"></el-input>
      </el-col>
      <el-col>
        <el-select v-model="thisQuery.systemId" placeholder="所属系统" clearable>
          <el-option
            v-for="item in systemList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        <el-button class="margin-left-20" @click="search">查询</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import {mapActions} from 'vuex';
  import _ from 'lodash';
  export default {
    name: 'application-search',
    components: {
    },
    props: {
      query:{

      }
    },
    // 数据
    data() {
      return {
        thisQuery:{},
      }
    },
    // 计算属性
    computed: {
      systemList() {
        return this.$store.state.systemInfo.list
      },
    },
    // 侦听器
    watch: {

    },
    // 生命周期钩子
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted() {
      this.thisQuery = _.cloneDeep(this.query);
      this.querySystemInfoSelectList({});
    },
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {},
    // 事件处理方法
    methods: {
      ...mapActions({
        querySystemInfoSelectList: 'querySystemInfoSelectListAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
      search() {
        this.query.systemId = this.thisQuery.systemId;
        this.query.code = this.thisQuery.code;
        this.query.name = this.thisQuery.name;
        this.$emit('queryApplication');
      }
    }
  }
</script>

