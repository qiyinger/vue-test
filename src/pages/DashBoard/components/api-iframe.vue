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
        return this.$store.state.apm.dashboard;
      }
    },
    props: {
      query: null,
    },
    watch: {
      query: {
        handler(newVal) {
          this.queryDashBoardUrl({versionId: newVal.microserviceId})
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
        queryDashBoardUrl: 'queryDashBoardUrlAction'
      }),
    }
  }
</script>
