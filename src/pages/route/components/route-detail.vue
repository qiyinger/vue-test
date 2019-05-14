<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-routeDetail">
    <div style="height:40%;width:90%">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="路由编码">
          <span>{{ detail.code }}</span>
        </el-form-item>
        <el-form-item label="路由名称">
          <span>{{ detail.name }}</span>
        </el-form-item>
        <el-form-item label="所属网关">
          <span>{{ detail.gatewayId }}</span>
        </el-form-item>
        <el-form-item label="绑定服务">
          <span>{{ detail.bindId }}</span>
        </el-form-item>
        <el-form-item label="路由状态">
          <span>{{ detail.status }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{ detail.createTime }}</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{ detail.updateTime }}</span>
        </el-form-item>
        <el-form-item label="路由描述">
          <span>{{ detail.description }}</span>
        </el-form-item>
      </el-form>
    </div>
    <hr/>
    <el-form size="small">
      <el-form-item v-for="(filter, index) in filters"
                    :label="'过滤器' + index"
                    :prop="'filters.' + index.value"
                    label-width='200'
      >
        <el-input :disabled="!isFilterEdit" v-model="filter.value" style="width:20%;margin:3px"></el-input>
        <el-button type="danger" v-if="isFilterEdit" @click.prevent="removeFilter(filter)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="editFilter" v-if="!isFilterEdit">编辑过滤器</el-button>
        <el-button @click="addFilter" v-if="isFilterEdit">新增过滤器</el-button>
        <el-button @click="saveFilter()" v-if="isFilterEdit">保存</el-button>
        <el-button @click="cancelFilter" v-if="isFilterEdit">取消</el-button>

      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <hr/>
    <el-form size="small">
      <el-form-item v-for="(predicate, index) in predicates"
                    :label="'路由规则' + index"
                    :prop="'predicates.' + index.value"
                    label-width='200'
      >
        <el-input :disabled="!isPredicateEdit" v-model="predicate.value" style="width:20%;margin:3px"></el-input>
        <el-button type="danger" v-if="isPredicateEdit" @click.prevent="removePredicate(predicate)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="editPredicate" v-if="!isPredicateEdit">编辑路由规则</el-button>
        <el-button @click="addPredicate" v-if="isPredicateEdit">新增路由规则</el-button>
        <el-button @click="savePredicate" v-if="isPredicateEdit">保存</el-button>
        <el-button @click="cancelPredicate" v-if="isPredicateEdit">取消</el-button>
      </el-form-item>
    </el-form>

    <template slot="header">路由{{detail.code}}详情</template>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
  // 组件
  import _ from 'lodash';
  import {mapActions} from 'vuex'

  // 请删除下面代码中你不需要的部分
  export default {
    name: 'route-detail',
    components: {},
    computed: {
      detail() {
        return _.cloneDeep(this.$store.state.route.one);
      },
    },
    // 数据
    data () {
      return {
        routeId: '',
        filters: [],
        predicates: [],
        isFilterEdit: false,
        isPredicateEdit: false,
      }
    },
    // 侦听器
    watch: {
    },
    // 生命周期钩子
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
      this.routeId = this.$route.params.routeId;
      this.refresh();
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
        queryRouteById: 'queryRouteByIdAction',
        updateRouteFilters: 'updateRouteFiltersAction',
        updateRoutePredicates: 'updateRoutePredicatesAction',
      }),
      refresh() {
        this.queryRouteById(this.routeId);
        this.filters = _.cloneDeep(this.detail.filters).map(filter => {
          return {value: filter}
        });
        this.predicates = _.cloneDeep(this.detail.predicates).map(predicate => {
          return {value: predicate}
        });
      },
      removeFilter(item) {
        var index = this.filters.indexOf(item)
        if (index !== -1) {
          this.filters.splice(index, 1)
        }
      },
      addFilter() {
        this.filters.push({
          value: '',
          key: Date.now()
        });
      },
      editFilter() {
        this.isFilterEdit = true;
      },
      saveFilter() {
        this.isFilterEdit = false;
        this.updateRouteFilters({
          id: this.detail.id,
          filters: this.filters.map(filter => filter.value)
        });
        this.refresh();
      },
      cancelFilter() {
        this.isFilterEdit = false;
        this.refresh();
      },
      removePredicate(item) {
        var index = this.filters.indexOf(item)
        if (index !== -1) {
          this.predicates.splice(index, 1)
        }
      },
      addPredicate() {
        this.predicates.push({
          value: '',
          key: Date.now()
        });
      },
      editPredicate() {
        this.isPredicateEdit = true;
      },
      savePredicate() {
        this.isPredicateEdit = false;
        this.updateRoutePredicates({
          id: this.detail.id,
          predicates: this.predicates.map(predicate => predicate.value)
        });
        this.refresh();
      },
      cancelPredicate() {
        this.isPredicateEdit = false;
        this.refresh();
      }
    }
  }
</script>