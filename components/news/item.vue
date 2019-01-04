<template>
  <div>
    <nuxt-link class="news-item" v-for="(item, index) in list" :key="index" :to="'/news/detail?id=' + item.id">
      <div class="img-wrapper">
        <img alt="" v-lazy="item.cover">
      </div>
      <div class="text">
        <div class="time">{{ item.create_time }}</div>
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.intro }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import '../../assets/less/common';

  .news-item {
    font-size: 26px;
    color: #999;
    line-height: 1.8;
    border-bottom:2px solid @borderColor;
    padding-bottom: 30px;
    overflow: hidden;
    display: block;
    .img-wrapper {
      width: 100%;
      height: 342px;
      border-radius: 10px;
      overflow: hidden;
      margin: 50px 0 35px;
      img {
        width: 100%;
      }
    }
    .text {
      margin: 0 24px;
    }
    .title {
      font-size: 32px;
      color: #333;
      margin-bottom: 4px;
    }
    .content{
      .lines(4);
      max-height: 190px;
    }
  }
</style>
