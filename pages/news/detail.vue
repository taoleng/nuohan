<template>
  <div class="news-detail news-wrapper">
    <div class="inner-block">
      <div class="class-title" v-if="data.category">
        <p class="sub">{{ data.category.title_en }}</p>
        <p>{{ data.category.title }}</p>
        <!-- div class="share" @click="popShow = true">
          <i class="share_icon"></i>
        </div -->
      </div>
      <div class="content">
        <div class="title">{{ data.title }}</div>
        <div class="time">{{ data.create_time }}</div>
        <div v-html="data.content" class="con"></div>
      </div>
      <div class="link">
        <nuxt-link v-if="data.prev" :to="'/news/detail?id=' + data.prev.id">{{ $t('lang.news.prev') }}{{ data.prev.title }}</nuxt-link>
        <nuxt-link v-if="data.next" :to="'/news/detail?id=' + data.next.id">{{ $t('lang.news.next') }}{{ data.next.title }}</nuxt-link>
      </div>
    </div>
    <!--div class="pop" v-if="popShow">
      <div class="pop-main">
        <div class="pop-close" @click="popShow = hide">
          <i class="iconfont icon-quxiao"></i>
        </div>
        <div class="pop-top">分享</div>
        <div class="pop-mid">
          <div class="item">
            <div class="icon icon-xlwb"></div>
            <p>新浪微博</p>
          </div>
          <div class="item">
            <div class="icon icon-pyq"></div>
            <p>朋友圈</p>
          </div>
          <div class="item">
            <div class="icon icon-wxhy"></div>
            <p>微信好友</p>
          </div>
        </div>
      </div>
    </div-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        data: {},
        id: '',
        // popShow:false 控制分享弹窗变量
      }
    },
    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    watch: {
      '$route.query.id'() {
        this.getDetail();
      }
    },
    mounted() {
      this.getDetail();
    },
    methods: {
      ...mapActions(['newsDetail']),
      getDetail() {
        this.id = this.$route.query.id;
        if (!this.id) {
          return false;
        }
        this.newsDetail({id: this.id}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.data = res.data;
          window.scrollTo(0,0);
        })
      }
    }
  }
</script>

<style lang='less' type="text/less">
.news-detail{
  .con{
    p{
      text-indent: 2em!important;
    }
    span{
      text-indent: 0em!important;
    }
    p,span{
      font-size: 28px!important;
      line-height: 2!important;
      margin-bottom: 0!important;
      font-weight: normal!important;
      font-style: normal!important;
    }
  }
  .content {
    div{
      p {
        text-indent: 2em;
        color: #8e8e8e;
        line-height: 2;
        margin-bottom: 20px;
        overflow: hidden;
        text-align: justify;
        &.img-wrapper {
          text-indent: 0;
          padding: 10px 0 20px;
        }
        img {
          float: left;
          width: 100%;
        }
      }
    }
  }
}

</style>
<style scoped lang='less' type="text/less">
  @import '../../assets/less/common';

  .news-detail {
    padding-top: 20px;
    .class-title {
      position: relative;
      font-size: 32px;
      border-bottom: 1px solid @borderColor;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .sub {
        color: #ababab;
        font-size: 26px;
      }
    }
    .share{
      position: absolute;
      top: 0;
      right: -40px;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 120px;
    }
    .share_icon{
      display:inline-block;
      width: 30px;
      height: 34px;
      background:url(~assets/img/share.png) no-repeat;
      background-size: 100% 100%;
    }
    .content {
      border-bottom: 2px solid @borderColor;
      padding-bottom: 20px;
      margin-bottom: 30px;
      color: #8e8e8e;
      .title {
        font-size: 46px;
        margin: 30px 0 6px;
        color: #333333;
      }
      .time {
        margin-bottom: 20px;
      }
      div{
        p {
          background-color: red;
          text-indent: 2rem;
          color: #8e8e8e;
          line-height: 2;
          margin-bottom: 20px;
          &.img-wrapper {
            text-indent: 0;
            padding: 10px 0 20px;
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .link {
      a {
        display: block;
        line-height: 2;
      }
    }
  }
  /*.pop{
    position:fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    background: rgba(0,0,0,0.2);
    .pop-main{
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
      background:#fff;
      width: 438px;
      padding:28px 68px 40px;
      border-radius:8px;
    }
    .pop-close{
      position: absolute;
      top: 10px;
      right:10px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }
    .pop-top{
      font-size: 30px;
      height: 80px;
      line-height:80px;
      border-bottom: 1px solid #ececec;
      text-align: center;
    }
    .pop-mid{
      display: flex;
      justify-content: space-between;
      flex-wrap:wrap;
      margin-top: 26px;
      .item{
        width: 120px;
        text-align: center;
        .icon{
          width: 70px;
          height: 60px;
          background-size: 100% 100%!important;
          background-repeat: no-repeat!important;
          margin:0 auto;
          &.icon-pyq{
            background: url(~assets/img/icon-pyq.png);
          }
          &.icon-wxhy{
            background: url(~assets/img/icon-wx.png);
          }
          &.icon-xlwb{
            background: url(~assets/img/icon-xlwb.png);
          }
        }
        p{
          font-size: 24px;
          color: #333;
          margin-top: 10px;
        }
      }
    }
  }*/
</style>
