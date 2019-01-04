<template>
  <div class="home-container" @click="hideMenu">
    <c-head/>
    <nuxt/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import cHead from '../components/common/cHead';

  export default {
    components: {
      cHead
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
  .home-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
  }
</style>
