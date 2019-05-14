<template>
  <div>
    <el-form-item v-for="(item, index) in items"
      :label="value.text + index"
      :prop="'items.' + index.value"
      label-width='200'
    >
      <el-input v-model="item.value" style="width:40%;margin:8px"></el-input>
      <el-button type="danger" @click.prevent="removeFilter(item)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addFilter">新增{{value.text}}</el-button>
    </el-form-item>
  </div>

</template>
<script>
  export default {
    name: 'filter-list',
    props:{
      value:{
        text: '',
        list: [],
      },
    },
    data() {
      return {
        items: this.value.list,
      };
    },
    methods: {
      removeFilter(item) {
        var index = this.items.indexOf(item)
        if (index !== -1) {
          this.items.splice(index, 1)
        }
      },
      addFilter() {
        console.log(this.list);
        this.items.push({
          value: '',
          key: Date.now()
        });
      }
    }
  };
</script>