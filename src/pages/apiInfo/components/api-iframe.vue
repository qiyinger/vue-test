<template>
  <iframe class="padding-0" style="height:calc(100vh - 200px);" :src="url" width="95%" frameborder="0"
          scrolling="auto"></iframe>
</template>
<script>

  import _ from "lodash";
  import {mapActions} from 'vuex';


  export default {
    comments: {},
    computed: {
      url(){
        console.log(this.$store.state.apiInfo.url);
        return this.$store.state.apiInfo.url;
      }
    },
    props: {
      query: null,
    },
    watch: {
      query: {
        handler(newVal) {
          console.log(newVal);
          this.queryApiInfoUrl({versionId: newVal.microserviceId})
        },
        deep: true
      }
    },
    data(){
      return {
      }
    },
    mounted(){
    },
    methods: {
      ...mapActions({
        queryApiInfoUrl: 'queryApiInfoUrlAction', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
    }
  }
</script>
