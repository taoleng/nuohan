<template>
  <div class="share-btn" v-if="config">
    <a v-for="(item, index) in config.iconList" :key="index" :href="item.link" target="_blank"><img :src="item.icon" alt=""></a>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['config'])
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .share-btn {
    a {
      margin-right: 30px;
      img {
        width: 35px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
