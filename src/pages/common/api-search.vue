<template>
  <el-form ref="form" v-model="thisQuery">
    <el-row :gutter="20" type="flex">
      <el-col>
        <el-cascader
          clearable
          v-model="value"
          :options="cascadeData"
          @active-item-change="handleItemChange"
          :props="props"
          style="width: 300px"
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
  import MicroApi from '@/api/microservice';
  import MicroVersionApi from '@/api/microserviceVersion';
  import lodash from 'lodash';
  export default {

    name: "api-search",
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
        microList:[],
        versionList:[],
      }
    },
    mounted() {
      console.log(this.query);
      this.thisQuery = _.cloneDeep(this.query);
      SystemInfoApi.selectList({}).then(res => {
        this.cascadeData = res;
        this.cascadeData.forEach(sys => sys.children = []);
      }).catch(err => {
        // 异常情况
      });
      ApplicationApi.selectList({}).then(res => {
        this.appList = res;
        this.appList.forEach(app => app.children = []);
      })
      MicroApi.selectList({}).then(res => {
        this.microList = res;
        this.microList.forEach(micro => micro.children = []);
      })
      MicroVersionApi.selectList({}).then(res => {
        this.versionList = res;
      })
    },
    methods: {
      ...mapActions({
        querySystemInfoSelectList: 'querySystemInfoSelectListAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        queryApplicationSelectList: 'queryApplicationSelectListAction',
      }),
      search() {
        let data = '';
        if (this.value.length === 4) {
          data = this.value[3];
        }
        this.$emit('query-api', data);

      },
      handleItemChange(val) {
        if (val.length === 1) {
          if (!lodash.isEmpty(this.appList)) {
            let arr = this.appList.filter(app => app.systemId === val[0]);
            this.cascadeData.forEach(sys => {
              if (sys.id === val[0]) {
                sys.children = arr;
              }
            })
          }
        }  else if (val.length === 2) {
          if (!lodash.isEmpty(this.microList)) {
            let arr = this.microList.filter(micro => micro.appId === val[1]);
            this.cascadeData.forEach(sys => {
              if (sys.id === val[0]) {
                sys.children.forEach(app => {
                  if (app.id === val[1]) {
                    app.children = arr;
                  }
                })
              }
            })
          }
        } else if (val.length === 3) {
          if (!lodash.isEmpty(this.versionList)) {
            let arr = this.versionList.filter(version => version.microserviceId === val[2]).map(
                version => {
                  version.name = version.version;
                  return version;
                });
            this.cascadeData.forEach(sys => {
              if (sys.id === val[0]) {
                sys.children.forEach(app => {
                  if (app.id === val[1]) {
                    app.children.forEach(micro => {
                      if (micro.id === val[2]) {
                        micro.children = arr;
                      }
                    })
                  }
                })
              }
            })
          }
        }
      },
    }
  };
</script>

<style scoped>

</style>