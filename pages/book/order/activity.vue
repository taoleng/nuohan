<template>
  <!--问题咨询 订单页 详情页-->
  <div class="oarder-question">
    <div class="inner-block">
      <div class="order-item">
        <i class="iconfont icon-dingdan"></i>
        <p>{{ $t('lang.book.order.activity.number') }}</p>
        <div class="data">{{ orderData.order_id }}</div>
      </div>
      <template v-if="$route.query.state === 'details'">
        <div class="order-item">
          <i class="iconfont icon-dingdan1"></i>
          <p>{{ $t('lang.book.order.activity.state') }}</p>
          <div class="data">{{ orderData.payState }}</div>
        </div>
        <div class="order-item">
          <i class="iconfont icon-shouliren"></i>
          <p>{{ $t('lang.book.order.activity.receiver') }}</p>
          <template v-if="!orderData.manage">
            <div class="data">{{ $t('lang.book.order.activity.unsbd') }}</div>
          </template>
          <template v-else>
            <div class="data">{{ orderData.manage.truename }} {{ orderData.manage.mobile }}</div>
          </template>
        </div>
      </template>
      <div class="order-item">
        <i class="iconfont icon-renshu"></i>
        <p>{{ $t('lang.book.order.activity.num') }}</p>
        <div class="data">{{ orderData.people }}</div>
      </div>
      <div class="order-item">
        <div class="order-item-intro">
          <img :src="orderData.cover" :alt="orderData.title" class="order-img">
          <h3 class="order-title">{{ orderData.title }}</h3>
          <div v-html="orderData.content" class="order-content"></div>
          <p class="o-item">{{ $t('lang.book.activity.price2') }}：<span>￥{{ parseInt(orderData.total_price) }}{{ $t('lang.book.activity.price_unit') }}</span></p>
          <p class="o-item">{{ $t('lang.book.activity.shijian') }}：<span>{{ orderData.start }} - {{ orderData.end }}</span></p>
          <p class="o-item">{{ $t('lang.book.activity.side') }}：<span class="place">{{ orderData.address }}</span></p>
        </div>
      </div>

      <div class="result">
        <template v-if="$route.query.state === 'details'">
          <!--订单流程-->
          <business :value="orderData.payState"></business>
          <!--订单消息-->
          <business-msg :message="orderData.message"></business-msg>
        </template>
        <div class="item">
          <span>{{ $t('lang.book.order.activity.price') }}</span>
          <span class="pay-num">￥{{ orderData.total_price }}</span>
        </div>
        <template v-if="!($route.query.state === 'details')">
          <div class="item">
            <pay-type v-model="patternPay"></pay-type>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <patt :value="orderData.payType"></patt>
          </div>
        </template>
        <clause
          v-model="isTy"
          v-if="!(orderData.numstate >= 5)"
        ></clause>
        <ul class="order-comon-btn">
          <template v-if="orderData.numstate == 4">
            <li class="cancel-btn" @click="goToPj">
              <span>{{ $t('lang.user.order.evaluate') }}</span>
            </li>
          </template>
          <template v-else-if="orderData.numstate <= 3">
            <li class="cancel-btn" @click="offOrder">
              <span>{{ $t('lang.btn.cancelOrder') }}</span>
            </li>
          </template>
          <template v-if="!($route.query.state === 'details')">
            <li class="pay-btn" @click="goOfflineTalks">
              <i></i>
              <span>{{ $t('lang.btn.subOrder') }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import payType from '~/components/order/pay-type';
  import business from '~/components/order/business';
  import patt from '~/components/order/patt';
  import businessMsg from '~/components/order/business-msg';
  import clause from '~/components/common/clause';
  import { toast } from '~/assets/js/tool'
  export default {
    components: {
      payType,
      clause,
      business,
      businessMsg,
      patt,
    },
    data() {
      return {
        // 支付方式
        patternPay: '',
        isTy: false
      }
    },
    computed: {
      ...mapState(['orderData', 'userInfo','hasLogin','token']),
    },
    watch: {
      patternPay(val) {
      }
    },
    methods: {
      ...mapMutations(['payPc', 'orderCancelCommon']),
      loadImg(uploadList) {
        this.fileList = uploadList || [];
      },
      goOfflineTalks() {
        // 没登陆 下单去登陆
        if (!(this.hasLogin && this.token)) {
          this.$router.push({
            path: '/user/login'
          })
          return;
        }
        var type;
        // 判断支付方式
        if (!this.patternPay) {
          toast(this.$t('lang.common.selectpay'))
          return;
        }else if (this.patternPay === 'zhifubao') {
          type = 1;
        }else if (this.patternPay === 'weixin') {
          type = 2;
        }else if (this.patternPay === 'paypal') {
          type = 3;
        }else if (this.patternPay === 'vipCar') {
          type = 4;
        }else if (this.patternPay === 'youhuima') {
          type = 5;
        }
        this.payPc({
          _this: this,
          type: type,
          order_id: this.$route.query.id,
          payedType: 'activity'
        })
      },
      offOrder() {
        if (this.$route.query.state === 'details') {
          // 弹出取消原因 弹窗
          this.$emit('show-model', true);
        } else {
          this.orderCancelCommon({
            order_id: this.orderData.order_id,
            str: 'activity',
            _this: this
          });
        }
      },
      goToPj(){
        this.$router.push({
          path:'/user/order',
          query:{
            id : this.$route.query.id,
            pj:true
          }
        })
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .order-item-intro{
    .order-img{
      display: block;
      width: 100% ;
      margin-top: 20px;
    }
    .order-title{
      font-size:32px;
      color: #333;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 24px auto 10px;
      text-align: justify;
    }
    .o-item{
      font-size: 26px;
      color: #999999;
      margin-top: 10px;
      span{
        color: #dd7116;
      }
    }
    .order-content{
      img{
        display: none;
      }
      p{
        display: none;
      }
      span{
        display: none;
      }
      p:nth-child(1){
        font-size: 26px;
        height:80px;
        line-height:42px;
        color: #999999;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        text-align: justify;
      }
    }
  }
</style>
