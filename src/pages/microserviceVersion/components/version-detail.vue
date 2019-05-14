<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-microserviceDetail">
    <div style="height:40%;width:90%">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="微服务ID">
          <span>{{ detail.microserviceId }}</span>
        </el-form-item>
        <el-form-item label="微服务版本">
          <span>{{ detail.version }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{ detail.createTime }}</span>
        </el-form-item>
        <el-form-item label="上线状态">
          <span>{{ detail.onlieStatus }}</span>
        </el-form-item>
        <el-form-item label="微服务版本描述">
          <span>{{ detail.description }}</span>
        </el-form-item>
      </el-form>
    </div>
    <hr/>
    <instance-table :version-id="detail.id"/>
    <template slot="header">{{detail.microserviceId}} - {{detail.version}}</template>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
  // 组件
  import _ from 'lodash';
  import InstanceTable from '../../serviceInstance/components/instance-table';
  // 请删除下面代码中你不需要的部分
  export default {
    name: 'microserviceVersion-detail',
    components: { InstanceTable},
    computed: {
      detail() {
        return _.cloneDeep(this.$route.params)
      }
    },
    // 数据
    data () {
      return {

      }
    },
    // 侦听器
    watch: {},
    // 生命周期钩子
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
    },
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {},
    // 事件处理方法
    methods: {}
  }
</script>