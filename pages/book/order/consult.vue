<template>
  <div class="consult-confirm order-detail">
    <div class="detail-title">
      <div class="point">
        <div class="inner-block">
          <img src="~/assets/img/order-icon.png" alt="">
          <span>确认订单</span>
        </div>
      </div>
      <div class="inner-block">
        <p>请确认您的信息是正确的</p>
      </div>
    </div>
    <div class="inner-block">
      <div class="order-item">
        <i class="iconfont icon-dingdan"></i>
        <p>订单号</p>
        <div class="data">00015012623300</div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-dingdan"></i>
        <p>会谈地点</p>
        <div class="data">诺汉总部
          <div class="navigate">
            <i class="iconfont icon-daohang"></i>
            <span>导航前往</span>
          </div>
        </div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-shijian"></i>
        <p>会面时间</p>
        <div class="data">已选择：2018年10月1日  上午10：00-12：00</div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-leixing"></i>
        <div class="btn-box">
          <p>咨询类型</p>
          <div class="on">工商类</div>
          <div>工商注册</div>
        </div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-xiugai1"></i>
        <p>会面时间</p>
        <div class="data">外国人如何在华注册公司，需要当面咨询相关细则以及步骤  谢谢！</div>
      </div>
      <div class="order-item img-wrapper">
        <img src="~/assets/img/talks.png" alt="">
        <img src="~/assets/img/talks.png" alt="">
        <img src="~/assets/img/talks.png" alt="">
      </div>
      <div class="result">
        <div class="item">
          <span>支付金额</span>
          <span class="pay-num">￥900</span>
        </div>
        <div class="item">
          <p class="title">{{ $t('lang.common.patt.title') }}</p>
          <div class="pay-methods">
            <div class="method on">
              <img src="~/assets/img/alipay.png" alt="">
              <span>支付宝</span>
            </div>
            <div class="method">
              <img src="~/assets/img/wechat.png" alt="">
              <span>微信</span>
            </div>
            <div class="method">
              <img class="paypal" src="~/assets/img/paypal.png" alt="">
            </div>
            <div class="method">
              <span>选择优惠码</span>
            </div>
          </div>
        </div>
        <div class="item">
          <p class="title agree">支付即代表同意《诺汉协议》《隐私政策》</p>
        </div>
        <nuxt-link to="/book/payed" class="common-submit-btn option-btn">
          <i class="iconfont icon-xiangyoujiaohuan"></i>
          <span>提交</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang='less' type="text/less">
  @import "../../../assets/less/common";

  .consult-confirm {
    .order-item {
      .data {
        position: relative;
        .navigate {
          position: absolute;
          bottom: 10px;
          right: 0;
          i {
            font-size: @baseFont;
          }
          span {
            font-size: 28px;
          }
        }
      }
      &.img-wrapper {
        padding: 20px 0;
        img {
          width: 166px;
        }
      }
    }
    .result {
      border: none;
      .item .pay-methods .method img {
        &.paypal {
          width: 120px;
        }
      }
    }
  }
</style>
