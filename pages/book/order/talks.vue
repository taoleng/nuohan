<template>
  <!--商务会面 订单页 详情页-->
  <div class="order-talks">
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
      </template>
      <div class="order-item">
        <i class="iconfont icon-dingwei"></i>
        <p>{{ $t('lang.book.order.talks.side') }}</p>
        <div class="data">{{ orderData.place_title }}</div>
        <div class="navigate">
          <i class="iconfont icon-daohang"></i>
          <a :href="orderData.place_map_link" target="_blank">
            <span>{{ $t('lang.book.order.talks.daohang') }}</span>
          </a>
        </div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-shijian"></i>
        <p>{{ $t('lang.book.order.talks.sideTime') }}</p>
        <div class="data">{{ $t('lang.common.selected') }}：<br>{{ orderData.start }} ~ {{ orderData.end }}</div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-leixing"></i>
        <div class="btn-box">
          <p>{{ $t('lang.book.appt.meeting.item1') }}</p>
          <div
            class="on"
            v-for="(item, index) in orderData.type_title"
            :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-xiugai1"></i>
        <p>{{ $t('lang.common.talks_content') }}</p>
        <div class="data">{{ orderData.question }}</div>
      </div>
      <template v-if="$route.query.state === 'details'">
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
            <pay-type v-model="patternPay" :vipcar="true"></pay-type>
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
      patt
    },
    data() {
      return {
        // 支付方式
        patternPay: '',
        isTy: false
      }
    },
    computed: {
      ...mapState(['orderData', 'userInfo','hasLogin','token','payReplyTimer']),
    },
    head(){
      return {
        title:this.$t('lang.title.order')
      }
    },
    methods: {
      ...mapMutations(['payPc', 'orderCancelCommon']),
      goOfflineTalks() {
        // 没登录 下单去登录
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
        }
        if (this.patternPay === 'zhifubao') {
          type = 1;
        }else if (this.patternPay === 'weixin') {
          type = 2;
        }else if (this.patternPay === 'paypal') {
          type = 3;
        }else if (this.patternPay === 'youhuima') {
          type = 5;
        }
        this.payPc({
          _this: this,
          type: type,
          order_id: this.$route.query.id,
          payedType: 'talks'
        })
      },
      offOrder() {
        if (this.$route.query.state === 'details') {
          // 弹出取消原因 弹窗
          this.$emit('show-model', true);
        } else {
          this.orderCancelCommon({
            order_id: this.orderData.order_id,
            str: 'talks',
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

<style scoped lang='less' type="text/less">
  .order-item{
    position: relative;
  }
  .navigate{
    position: absolute;
    bottom:0;
    right:0;
  }
  .btn-box{
    div{
      width: auto;
    }
  }
</style>
