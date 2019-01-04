<template>
  <div v-if="popShow" class="detail">
    <div class="main">
      <div class="inner">
        <div class="close" @click="pclose"><i class="iconfont icon-quxiao"></i></div>
        <h2 class="main_title">{{ title(data.title) }}</h2>
        <h3 class="main_num">{{ $t('lang.clients.enjoy') }}</h3>
        <div class="main_text">
          <p v-html="data.content"></p>
        </div>
        <div class="main_inner">
          <div class="main_item" v-for="(item,index) in data.list" :class="{'on':index===onFlag}" :key="index" @click="choose(index,item)">
            <div class="item">
              <template v-if="data.title === 'vip'">
                <p class="text">{{ item.intro }}</p>
              </template>
              <template v-else-if="data.title === 'circle'">
                <p class="text">{{ $t('lang.clients.online') }} {{ item.meeting_num }} {{ $t('lang.common.hour') }}<br>{{ $t('lang.clients.question') }} {{ item.question_num }} {{ $t('lang.common.time') }}<br>{{ $t('lang.clients.active') }} {{ item.activity_num }} {{ $t('lang.common.time') }}</p>
              </template>
              <p class="money">￥{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main_btm">
        <template v-if="data.title === 'personal'">
          <a href="/user/register" class="main_link zc">{{ $t('lang.clients.register') }}</a>
        </template>
        <template v-else-if="data.title === 'topclub'">
          <a :href="data.link" class="main_link zc">{{ $t('lang.clients.becomeVip') }}</a>
        </template>
        <template v-else-if="data.title === 'vip'">
          <p class="main_btm_price"><span>￥</span>{{ vipPrice }}</p>
          <a @click="openPay" class="main_link">{{ $t('lang.clients.becomeVip') }}</a>
        </template>
        <template v-else-if="data.title === 'circle'">
          <p class="main_btm_price"><span>￥</span>{{ circlePrice }}</p>
          <a @click="openPay" class="main_link">{{ $t('lang.clients.becomeVip') }}</a>
        </template>
      </div>
    </div>
    <div class="detail_bg"></div>
  </div>
</template>

<script>
  import index from "../../service";

  export default {
    // filters:{
    //   title(name){
    //     let txt = ""
    //     if(name ==='personal'){
    //       txt = "个人会员"
    //     }else if(name ==='circle'){
    //       txt = "智客会员"
    //     }else if(name ==='vip'){
    //       txt = "智享会员"
    //     }else if(name ==='topclub'){
    //       txt = "璞华会TOP Club"
    //     }
    //     return txt;
    //   }
    // },
    props: {
      popShow: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      data : {
        type : Object,
        default : () => {
          return {}
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
      }
    },
    data(){
      return {
        onFlag : 0
      }
    },
    created(){
      // circlePrice
    },
    mounted(){

    },
    methods: {
      pclose() {
        this.$emit('open', false)
      },
      choose(index,item){
        this.onFlag = index;
        if(this.data.title === "circle"){
          this.setCirclePrice(item,index);
        }else if(this.data.title === "vip"){
          this.setVipPrice(item)
        }
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
      setVipPrice(item){
        this.$emit("setVipPrice",item.price)
      },
      setCirclePrice(item,index){
        this.$emit("setCirclePrice",{price:item.price,index:index})
      },
      setCircleIndex(index){
        this.$emit("setCirclePrice",index)
      },
      openPay(){
        this.$emit('openPay',this.data.title)
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
      right: 10px;
      top: 10px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      i {
        font-size: 50px;
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
    .main_num {
      font-weight: normal;
      font-size: 28px;
      color: #dd7116;
      margin: 14px auto 10px;
    }
    .main_text {
      font-size: 24px;
      color: #999999;
      line-height:30px;
      padding-bottom:10px;

      border-bottom: 1px solid #ececec;
      margin-bottom: 20px;
      p{
        height: 170px;
        overflow: scroll;
      }
    }
    .main_btm {
      width: 100%;
      height: 200px;
      background: #dd7116;
      text-align: center;
      margin-top: 32px;
      position: relative;
      .zc{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
      }
      .main_link {
        display: block;
        height: 66px;
        width: 294px;
        line-height: 64px;
        margin: 0 auto;
        border-radius: 8px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 28px;
      }
      .main_btm_price {
        color: #fff;
        font-size:50px;
        height: 50px;
        line-height:50px;
        padding-top:30px;
        padding-bottom:30px;
      }
      span {
        font-size: 32px;
      }
    }
    .main_inner {
      font-size: 0;
      margin-top:14px;
      .main_item {
        margin-bottom:10px;
        color: #666666;
        &.on {
          .item{
            &:before{
              border-color: #dd7116;
            }
          }
        }
      }
      .item {
        position: relative;
        padding-left: 30px;
        &:before{
          content:"";
          position: absolute;
          top: 10px;
          left: 0;
          width: 10px;
          height: 10px;
          border: 4px solid #ddd;
          border-radius:50%;
        }
      }
      .text {
        font-size: 24px;
        width: 400px;
      }
      .money {
        position: absolute;
        height: 26px;
        line-height: 26px;
        top: 50%;
        right: 0;
        margin-top: -13px;
        font-size: 26px;
        color: #dd7116;
      }
    }
  }
</style>
