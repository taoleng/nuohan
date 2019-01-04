<template>
  <div class="container">
    <c-head class="common-head"/>
    <nuxt class="main-panel" />
    <c-foot></c-foot>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import cHead from '../components/common/cHead';
  import cFoot from '../components/common/cFoot';

  export default {
    components: {
      cHead, cFoot
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['IS_MENU_SHOW']),
      hideMenu() {
        this.IS_MENU_SHOW(false);
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../assets/less/common";
  .container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    .common-head {
      .return {
        display: inline-block;
      }
      .menu-btn {
        span {
          background: @themColor;
        }
      }
    }
    .main-panel {
      min-height: 80vh;
      padding-bottom: 98px;
      overflow: hidden;
    }
  }
</style>
