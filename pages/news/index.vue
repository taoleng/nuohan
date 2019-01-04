<template>
  <div class="news news-wrapper">
    <div class="inner-block">
      <div class="news-class" v-for="(item, index) in list" :key="index">
        <div class="headline" :id="'id'+index">
          <p class="sub-title">{{ item.catname_en }}</p>
          <p>{{ item.catname }}</p>
        </div>
        <div class="headline href">
          <a v-for="(h, num) in list" :key="num" :href="'#id'+num" v-if="num !== index">
            <p>{{ h.catname }}<i class="icon" :class="{'t':num < index}"></i> </p>
          </a>
        </div>
        <item :list="item.list"></item>
        <nuxt-link v-if="item.hasmore" :to="'/news/list?cid=' + item.cid" class="view-more pay-btn"><span>{{ $t('lang.btn.lookmore2') }}</span><i></i></nuxt-link>
        <!--<nuxt-link v-if="item.hasmore" :to="'/news/list?cid=' + item.cid" class="view-more"><span>{{ $t('lang.btn.lookmore2') }}</span><i></i></nuxt-link>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import item from '~/components/news/item'

  export default {
    components: {
      item
    },
    data() {
      return {
        list: []
      }
    },
    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      ...mapActions(['newsList']),
      getList() {
        this.newsList().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.list = res.data;
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import '../../assets/less/common';

  .news {
    .news-class {
      margin-top: 20px;
      position: relative;
      .headline {
        font-size: 36px;
        font-weight: bold;
        border-bottom: 1px solid @borderColor;
        padding-bottom: 10px;
        margin-bottom: 10px;
        display: block;
        .sub-title {
          color: #ababab;
          font-size: 26px;
          font-weight: normal;
        }
      }
      .href{
        position: absolute;
        top:38px;
        right: 0;
        border-bottom: none;
        white-space: nowrap;
        display: flex;
        a{
          margin-left:20px;
          color: #666;
          font-weight: normal;
        }
        .icon{
          display: inline-block;
          width: 28px;
          height: 28px;
          background: url(~assets/img/news_icon.png) no-repeat;
          background-size: 100% 100%;
          margin-left: 12px;
          &.t{
            transform:rotate(180deg)
          }
        }
      }
      .view-more {
        display: block;
        height: 88px;
        line-height: 88px;
        font-size: 30px;
        text-align: center;
        color: #fff;
        background: @themColor;
        border-radius: 10px;
        margin: 60px 0 100px;
        span, i {
          display: inline-block;
          vertical-align: middle;
        }
        i {
          margin-left:40px;
          top:4px;
        }
      }
    }
  }
</style>
