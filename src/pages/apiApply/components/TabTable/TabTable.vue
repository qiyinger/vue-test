<template>
  <div class="tab-table">
    <el-tabs value="apiCheck">
      <el-tab-pane label="我的审核" name="apiCheck" lazy="false">
        <MyApiCheckTable/>
      </el-tab-pane>
      <el-tab-pane label="我的申请" name="apiApply" lazy="false">
        <MyApiApplyTable/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import BasicContainer from '@vue-materials/basic-container';
  import DeleteBalloon from './components/DeleteBalloon';
  import EditDialog from './components/EditDialog';
  import MyApiApplyTable from '../D2Crud/MyApiApplyTable'
  import MyApiCheckTable from '../D2Crud/D2Crud'

  export default {
    components: {
      BasicContainer,
      DeleteBalloon,
      EditDialog,
      MyApiApplyTable,
      MyApiCheckTable,
    },
    name: 'TabTable',

    data() {
      return {
        tabKey: 'all',
        dataSource: [],
        tabs: [
          {tab: '我的审核', key: 'apiCheck'},
          {tab: '我的申请', key: 'apiApply'},
        ],
      };
    },

    created() {
    },

    methods: {
      handleClick(tab) {
        console.log(tab);
      },
    },
  }

</script>

<style>
  .tab-table {

  }
</style>
