<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-microserviceDetail">
    <div style="height:40%;width:100%">
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务ID：</span></el-col>
        <el-col :span="2"><span>{{detail.id}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务编号：</span></el-col>
        <el-col :span="2"><span>{{detail.code}}</span></el-col>
      </el-row>
      <br>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务名称：</span></el-col>
        <el-col :span="2"><span>{{detail.name}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>创建时间：</span></el-col>
        <el-col :span="2"><span>{{detail.createTime}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>所属应用：</span></el-col>
        <el-col :span="2"><span>{{detail.appId}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务描述：</span></el-col>
        <el-col :span="2"><span>{{detail.description}}</span></el-col>
      </el-row>
    </div>
    <hr/>
    <version-list :service-id="detail.microserviceId"></version-list>
    <template slot="header">{{detail.code}} - {{detail.name}}</template>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
// 组件
import _ from 'lodash'
// 请删除下面代码中你不需要的部分
import VersionList from '../../microserviceVersion/components/D2Crud/D2Crud';
export default {
  name: 'microservice-detail',
  components: {VersionList},
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