<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-application">
    <template slot="header">应用列表</template>
    <d2-crud/>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
// 组件
import D2Crud from './components/D2Crud/D2Crud'
// 请删除下面代码中你不需要的部分
export default {
  name: 'application',
  components: {
    D2Crud
  },
  // 数据
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
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

<style lang="scss" scoped>
@import './Application.scss';
</style>
