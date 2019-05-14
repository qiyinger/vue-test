<template>
  <el-form ref="form" v-model="thisQuery">
    <el-row :gutter="20" type="flex">
      <el-col>
        <el-input placeholder="微服务名称" v-model="thisQuery.name"></el-input>
      </el-col>
      <el-col>
        <el-input placeholder="微服务编号" v-model="thisQuery.code"></el-input>
      </el-col>
      <el-col>
        <el-cascader
          v-model="value"
          :options="cascadeData"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
      </el-col>
      <el-col>
        <el-button class="margin-left-20" @click="search">查询</el-button>
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
  import {mapActions} from 'vuex';
  import SystemInfoApi from '@/api/systemInfo';
  import ApplicationApi from '@/api/application';
  import lodash from 'lodash';

  export default {
    name: "micro-search",
    props: {
      query:{
        code: '',
        name: '',
        appId:'',
      }
    },
    data() {
      return {
        cascadeData: [],
        props: {
          value: 'id',
          label: 'name',
        },
        value: [],
        appList: [],
        thisQuery: {},
      }
    },
    mounted() {
      console.log(this.query);
      this.thisQuery = _.cloneDeep(this.query);
      SystemInfoApi.selectList({}).then(res => {
        this.cascadeData = res;
        console.log(this.cascadeData);
        this.cascadeData.forEach(sys => sys.children = []);
      }).catch(err => {
        // 异常情况
      });
      ApplicationApi.selectList({}).then(res => {
        this.appList = res;
      })
    },
    methods: {
      ...mapActions({
        querySystemInfoSelectList: 'querySystemInfoSelectListAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        queryApplicationSelectList: 'queryApplicationSelectListAction',
      }),
      handleItemChange(val) {
        setTimeout(_ => { if (!lodash.isEmpty(this.appList)) {
          let arr = this.appList.filter(app => app.systemId === val[0]);
          this.cascadeData.forEach(sys => {
            if (sys.id === val[0]) {
              sys.children = arr;
            }
          })
        }},500)
      },
      search() {
        this.query.name = this.thisQuery.name;
        this.query.code = this.thisQuery.code;
        this.query.appId = this.value[1];
        this.$emit('query-micro');

      }
    }
  }
</script>

<style scoped>

</style>