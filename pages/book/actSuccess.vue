<template>
  <div class="pay-success order-detail">
    <div class="detail-title">
      <div class="point">
        <div class="inner-block">
          <img src="~/assets/img/yes.png" alt="">
          <span>{{ $t('lang.book.payed.title1') }}</span>
        </div>
      </div>
    </div>
    <div class="inner-block content">
      <!--<img src="~/assets/img/success.png" alt="">-->
      <div class="iconAct">
        <i class="iconfont icon-faqihuodongchenggong"></i>
      </div>
      <p>{{ $t('lang.book.payed.title1') }}</p>
      <div class="btn-wrapper">
        <nuxt-link to="/" class="common-submit-btn return">
          <span>{{ $t('lang.btn.home') }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head(){
      return {
        title:this.$t('lang.title.order')
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";

  .pay-success {
    .detail-title {
      margin-bottom: 100px;
    }
    .content {
      text-align: center;
      color: @themColor;
      margin-top:120px;
      .iconAct{
        height: 150px;
        line-height: 150px;
        font-size: 0;
        i{
          font-size: 150px;
          color: #faeadc;
        }
      }
      img {
        width: 138px;
      }
      p {
        opacity: .6;
        margin-top: 40px;
      }
      .btn-wrapper {
        margin-top: 96px;
        .common-submit-btn {
          width: 45%;
          &.return {
            color: #fff;
            background: #dd7116;
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>
