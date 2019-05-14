<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-GatewayDetail">
    <div style="height:40%;width:90%">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="网关编码">
          <span>{{ detail.code }}</span>
        </el-form-item>
        <el-form-item label="网关名称">
          <span>{{ detail.name }}</span>
        </el-form-item>
        <el-form-item label="所属系统">
          <span>{{ detail.systemId }}</span>
        </el-form-item>
        <el-form-item label="网关状态">
          <span>{{ detail.status }}</span>
        </el-form-item>
        <el-form-item label="路由描述">
          <span>{{ detail.description }}</span>
        </el-form-item>
      </el-form>
    </div>
    <hr/>
    <route-list :gateway-id="gatewayId"></route-list>
    <template slot="header">网关详情</template>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
  // 组件
  import _ from 'lodash';
  import {mapActions} from 'vuex'
  import RouteList from '../../route/components/D2Crud/D2Crud';

  // 请删除下面代码中你不需要的部分
  export default {
    name: 'gateway-detail',
    components: {RouteList},
    computed: {
      detail() {
        return _.cloneDeep(this.$store.state.gateway.one);
      },
    },
    // 数据
    data () {
      return {
        gatewayId: '',
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
      this.gatewayId = this.$route.params.gatewayId;
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
        queryGatewayById: 'queryGatewayByIdAction',
      }),
      refresh() {
        this.queryGatewayById(this.gatewayId);
      },
    }
  }
</script>