<template>
  <!--订单详情 支付方式-->
  <div class="pay-type paycomon">
    <p class="title">{{ $t('lang.compon.patt.title') }}</p>
    <div class="pay-methods">
      <template v-if="!weixin">
        <div
          v-show="!weixin"
          :class="{ on: patternPayment === 'weixin' }"
          class="method"
          @click="clickPayBtn('weixin')"
        >
          <img src="../../assets/img/wechat.png" alt="">
          <span>{{ $t('lang.compon.patt.wx') }}</span>
        </div>
      </template>
      <template v-if="!zhifubao">
        <div
          v-show="!zhifubao"
          :class="{ on:patternPayment === 'zhifubao' }"
          class="method"
          @click="clickPayBtn('zhifubao')"
        >
          <img src="../../assets/img/alipay.png" alt="">
          <span>{{ $t('lang.compon.patt.zfb') }}</span>
        </div>
      </template>
      <template v-if="!paypal">
        <div
          v-show="!paypal"
          :class="{ on:patternPayment === 'paypal' }"
          class="method"
          @click="clickPayBtn('paypal')"
        >
          <img class="paypal" src="../../assets/img/paypal.png" alt="">
        </div>
      </template>
      <template v-if="!vipcar">
        <div
          v-show="!vipcar"
          :class="{ on:patternPayment === 'vipCar' }"
          class="method"
          @click="clickPayBtn('vipCar')"
        >
          <img src="../../assets/img/vip.png" alt="">
          <span>{{ $t('lang.compon.patt.car') }}</span>
        </div>
      </template>
      <template v-if="!youhuima">
        <div
          v-show="!youhuima"
          :class="{ on:patternPayment === 'youhuima' }"
          class="method"
          @click="clickPayBtn('youhuima')"
        >
          <img src="../../assets/img/yhm.png" alt="">
          <span>{{ $t('lang.compon.patt.yhm') }}</span>
        </div>
      </template>
    </div>
    <template v-if="patternPayment === 'vipCar'">
      <div class="vip-car">
        <h3>
          {{ $t('lang.user.vip.title') }}
        </h3>
        <ul>
          <li>{{ $t('lang.user.vip.online') }} {{ userInfo.vip_data.meeting || '0' }} {{ $t('lang.user.vip.hour') }}</li>
          <li>{{ $t('lang.user.vip.question') }} {{ userInfo.vip_data.question || '0' }} {{ $t('lang.user.vip.ci') }}</li>
          <li>{{ $t('lang.user.vip.activity') }} {{ userInfo.vip_data.activity || '0' }} {{ $t('lang.user.vip.ci') }}</li>
          <li>{{ $t('lang.user.vip.metting') }} {{ userInfo.vip_data.meeting_room || '0' }} </li>
        </ul>
        <div @click="$router.push('/clients')">{{ $t('lang.user.vip.upgrade') }}</div>
      </div>
    </template>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
      model:{
        prop:'patternPay',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        patternPay: {
          type: String,
          default: ''
        },
        zhifubao: {
          type: Boolean,
          default: false
        },
        weixin: {
          type: Boolean,
          default: false
        },
        youhuima: {
          type: Boolean,
          default: false
        },
        paypal: {
          type: Boolean,
          default: false
        },
        vipcar: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          patternPayment: ''
        }
      },
      computed: {
        ...mapState(['userInfo']),
      },
      watch: {
        patternPayment(val) {
          this.$emit('input', val)
        }
      },
      methods: {
        clickPayBtn(str) {
          this.patternPayment = str;
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .pay-type {
    .vip-car {
      border-radius: 10px;
      padding: 58px 30px 35px;
      background: #e79b5b;
      h3 {
        border-bottom: 1px solid #ffffff;
        line-height: 60px;
        font-size: 36px;
        color: #fefefe;
      }
      ul {
        margin-top: 20px;
        margin-bottom: 30px;
        li {
          color: #fefefe;
          line-height: 40px;
          font-size: 24px;
        }
      }
      div {
        width: 228px;
        height: 60px;
        background: #ffffff;
        line-height: 60px;
        font-size: 22px;
        text-align: center;
        color: #e79b5b;
      }
    }
  }
</style>
