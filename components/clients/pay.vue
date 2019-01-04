<template>
  <div v-if="popShow" class="detail">
    <div class="main">
      <div class="inner">
        <div class="close" @click="pclose"><i class="iconfont icon-quxiao"></i></div>
        <h2 class="main_title">{{ title(data.title) }}</h2>
        <template v-if="data.title === 'circle'">
          <p class="main_text">1.{{ $t('lang.clients.online') }}{{ data.list[circleIndex].meeting_num }}{{ $t('lang.common.hour') }}<br>2.{{ $t('lang.clients.question') }}{{ data.list[circleIndex].question_num }}{{ $t('lang.common.time') }}<br>3.{{ $t('lang.clients.active') }}{{ data.list[circleIndex].activity_num }}{{ $t('lang.common.time') }}</p>
        </template>
        <template v-else-if="data.title === 'vip'">
          <p class="main_text">{{ data.list[circleIndex].intro }}</p>
        </template>
        <p class="main_pay">{{ $t('lang.compon.patt.title') }}</p>
        <div class="main_inner">
          <div class="main_item" :class="{'on':onNum ===0}" @click="onNum=0">
            <div class="item pay_zfb"></div>
          </div>
          <div class="main_item" :class="{'on':onNum ===1}" @click="onNum=1">
            <div class="item pay_wx"></div>
          </div>
          <div class="main_item" :class="{'on':onNum ===2}" @click="onNum=2">
            <div class="item pay_pp"></div>
          </div>
        </div>
      </div>
      <div class="main_btm">
        <div class="btm-main">
          <div class="top">{{ $t('lang.compon.vippay.buy') }}：</div>
          <div class="midd">
            <span>{{ title(data.title) }}</span>
            <span v-if="data.title === 'vip'">￥{{ vipPrice }}</span>
            <span v-else-if="data.title === 'circle'">￥{{ circlePrice }}</span>
          </div>
          <div class="btm">
            <span @click="buy">{{ $t('lang.btn.pay') }}</span>
            <span @click="pclose">{{ $t('lang.btn.no') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_bg"></div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {is_weixn,toast} from '../../assets/js/tool'
  export default {
    // filters:{
    //   title(name){
    //     let txt = ""
    //     if(name ==='personal'){
    //       txt = this.$t('lang.clients.personage')
    //     }else if(name ==='circle'){
    //       txt = this.$t('lang.compon.vippay.zk')
    //     }else if(name ==='vip'){
    //       txt = this.$t('lang.compon.vippay.zx')
    //     }else if(name ==='topclub'){
    //       txt = this.$t('lang.compon.vippay.top')
    //     }
    //     return txt;
    //   }
    // },
    props: {
      data : {
        type : Object,
        default : () => {
          return {}
        }
      },
      popShow: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      vipPrice:{
        type : Number,
        default : () => {
          return 0
        }
      },
      circlePrice:{
        type : Number,
        default : () => {
          return 0
        }
      },
      circleIndex:{
        type : Number,
        default : () => {
          return 0
        }
      }
    },
    data(){
      return {
        onNum:0
      }
    },
    computed:{
      ...mapState(['hasLogin','token'])
    },
    methods: {
      ...mapActions(['orderMember']),
      pclose() {
        this.$emit('open', false)
      },
      title(name){
        let txt = ""
        if(name ==='personal'){
          txt = this.$t('lang.clients.personage')
        }else if(name ==='circle'){
          txt = this.$t('lang.compon.vippay.zk')
        }else if(name ==='vip'){
          txt = this.$t('lang.compon.vippay.zx')
        }else if(name ==='topclub'){
          txt = this.$t('lang.compon.vippay.top')
        }
        return txt;
      },
      buy(){
        if(is_weixn()){
          toast(this.$t('lang.common.wxsilde'));
          return
        };
        if(!(this.hasLogin && this.token)){
          this.$router.push('./user/login');
          return
        }
        // vip     会员类别，可选circle,vip
        // level   会员等级，可选1，2，3
        // type    支付方式，可选1，2，3 //1支付宝，2-微信，3-paypal
        // client  选填，PC端、手机端支付，mobile为手机端，其它为PC端
        let type = "";
        let vip = this.data.title;
        let level = this.circleIndex+1 ;
        if(this.onNum===0){
          //支付宝
          type = 1
        }else if(this.onNum === 1){
          //微信
          type = 2
        }else if(this.onNum === 2){
          //paypal
          type = 3
        }
        let param = {
          client:"mobile",
          type : type,
          vip : vip,
          level : level
        }
        this.orderMember(param).then(res => {
          if(res.state === 'error'){
            return false;
          }
          window.location.href = res.data.url;
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    z-index: 99;
    .detail_bg {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      i {
        font-size: 50px;
      }
    }
    .main_price{
      color: #999999;
      font-size: 24px;
      span{
        font-size: 30px;
        color: #dd7116;
      }
    }
    .main {
      position: absolute;
      width: 640px;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ffffff;
      border-radius: 8px;
    }
    .inner {
      padding: 0 40px;
    }
    .main_title {
      height: 116px;
      line-height: 116px;
      border-bottom: 1px solid #ececec;
      font-size: 40px;
      color: #333333;
      font-weight: normal;
    }
    .main_num,.main_zx{
      font-weight: normal;
      font-size: 28px;
      color: #dd7116;
      margin: 36px auto 30px;
    }
    .main_zx{
      margin-bottom: 10px;
    }
    .main_text,.main_zx_xq {
      font-size: 24px;
      color: #dd7116;
      line-height: 40px;
      padding-bottom: 32px;
      padding-top: 30px;
      border-bottom: 1px solid #ececec;
    }
    .main_zx_xq{
      border-bottom: none;
      padding-bottom: 10px;
    }
    .main_btm {
      width: 100%;
      height: 286px;
      background: #dd7116;
      margin-top: 32px;
      color: #fff;
      .btm-main{
        padding: 0 40px;
      }
      .top{
        padding-top:30px;
        font-size: 36px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e59550;
      }
      .midd{
        display: flex;
        justify-content: space-between;
        height:80px;
        line-height:80px;
        font-size: 28px;
        span{
          height:80px;
          line-height:80px;
        }
      }
      .btm{
        display: flex;
        justify-content: space-between;
        span{
          width: 260px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          border: 1px solid #fff;
          border-radius:6px;
          &:nth-child(1){
            background: #fff;
            color: #dd7116;
          }
        }
      }
    }
    .main_pay{
      font-size: 26px;
      color: #333333;
      padding-top:20px;
    }
    .main_inner {
      text-align: center;
      font-size: 0;
      margin-top: 28px;
      .main_item {
        width: 160px;
        height: 88px;
        border: 1px solid #999;
        display: inline-block;
        overflow: hidden;
        box-sizing: content-box;
        margin: 0 10px;
        color: #666666;
        &.on {
          border-color: #dd7116;
        }
      }
      .item {
        width: 160px;
        height: 88px;
        &.pay_pp{
          background: url("~assets/img/pay_pp.png") no-repeat;
          background-size: 100% 100%;
        }
        &.pay_wx{
          background: url("~assets/img/pay_wx.png") no-repeat;
          background-size: 100% 100%;
        }
        &.pay_zfb{
          background: url("~assets/img/pay_zfb.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .text {
        padding: 56px 32px 0;
        font-size: 36px;
        white-space: nowrap;
        line-height: 60px;
      }
      .money {
        font-size: 40px;
        margin-top: 50px;
      }
    }
  }
</style>
