<template>
  <div class="tab-table">
    <el-tabs value="apiInfo">
      <el-tab-pane label="接口列表" name="apiInfo"  lazy="false">
        <ApiInfoTable/>
      </el-tab-pane>
      <el-tab-pane label="订阅接口" name="applyApi" lazy="false">
        <ApplyApiTable/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import DeleteBalloon from './components/DeleteBalloon';
import EditDialog from './components/EditDialog';
import response from './tab-table.json';
import ApiInfoTable from '../D2Crud/D2Crud';
import ApplyApiTable from '../D2Crud/ApplyApiTable';

export default {
  components: {
    BasicContainer,
    DeleteBalloon,
    EditDialog,
    ApiInfoTable,
    ApplyApiTable,
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource: [],
      tabs: [
        { tab: '接口列表', key: 'my-api' },
        { tab: '订阅接口', key: 'apply-api' },

      ],
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '发布时间',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '操作',
          key: 'action',
        },
      ],
    };
  },

  created() {},

  mounted() {
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
