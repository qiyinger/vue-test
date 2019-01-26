<template>
  <el-dialog title="微服务详情"
             :visible.sync="isShow"
             :before-close="handleClose"
             center="true">
    <div style="height:100%;width:100%">
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务ID：</span></el-col>
        <el-col :span="2"><span>{{item.id}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务编号：</span></el-col>
        <el-col :span="2"><span>{{item.code}}</span></el-col>
      </el-row>
      <br>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务名称：</span></el-col>
        <el-col :span="2"><span>{{item.name}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>创建时间：</span></el-col>
        <el-col :span="2"><span>{{item.createTime}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>所属应用：</span></el-col>
        <el-col :span="2"><span>{{item.appId}}</span></el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="4"><span>微服务描述：</span></el-col>
        <el-col :span="2"><span>{{item.description}}</span></el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "microservice-dialog",
    props: {
     isShowDetail: Boolean,
     detail: Object,
    },
    data() {
      return {
        item: this.detail,
        isShow : false,
      }
    },
    watch: {
      isShowDetail() {
        this.isShow = this.isShowDetail
      },
      detail: {
        deep: true,
        handler: function (val) {
          this.item = val;
        }
      }
    },
    methods: {
      handleClose(done) {
        this.isShow = false;
        this.$emit("close-detail");
        done();
      }
    }
  }
</script>

<style scoped>
   span {
    font-size: 16px;
  }

</style>