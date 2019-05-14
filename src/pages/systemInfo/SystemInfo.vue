<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-systemInfo">
    <template slot="header">系统列表</template>
    <!-- 这里注意一下, props不能通过异步传值。。最好的方法是通过vuex的action进行分发，然后action调用mutations的同步方法 -->
    <system-table/>
    <router-view/>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
  // 组件D
  import SystemTable from './components/D2Crud/D2Crud'

  // 请删除下面代码中你不需要的部分
export default {
  name: 'systemInfo',
  components: {SystemTable},
  // 数据
  computed:{
    // 计算属性
    result(){
      return this.$store.state.systemInfo.res;
    }
  },
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  beforeMount () {},
  created() {
  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import './SystemInfo.scss';
</style>
