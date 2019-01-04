<template>
  <div class="patt paycomon">
    <p class="title">{{ $t('lang.compon.patt.title') }}</p>
    <div class="pay-methods">
      <div
        v-show="value === 'weixin'"
        class="method"
      >
        <img src="../../assets/img/wechat.png" alt="">
        <span>{{ $t('lang.compon.patt.wx') }}</span>
      </div>
      <div
        v-show="value === 'zhifubao'"
        class="method"
      >
        <img src="../../assets/img/alipay.png" alt="">
        <span>{{ $t('lang.compon.patt.zfb') }}</span>
      </div>

      <div
        v-show="value === 'paypal'"
        class="method"
      >
        <img class="paypal" src="../../assets/img/paypal.png" alt="">
      </div>
      <div
        v-show="value === 'vip'"
        class="method"
      >
        <img src="../../assets/img/vip.png" alt="">
        <span>{{ $t('lang.compon.patt.car') }}</span>
      </div>
      <div
        v-show="value === 'youhuima'"
        class="method"
      >
        <img src="../../assets/img/yhm.png" alt="">
        <span>{{ $t('lang.compon.patt.yhm') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .patt {

  }
</style>
