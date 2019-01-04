<template>
  <div class="vip">
    <div class="inner-block">
      <div class="point">
        <p class="title">{{ $t('lang.clients.title') }}</p>
        <p class="sub-title">{{ $t('lang.clients.title2') }}</p>
      </div>
      <div class="types" v-if="success">
        <div class="vip-type type1">
          <div class="title">{{ $t('lang.clients.personage') }}</div>
          <div class="price">
            <span class="price-fh">￥</span>
            <span class="price-money">0</span>
            <span class="price-text">{{ $t('lang.common.unit') }}</span>
          </div>
          <a href="./user/register" class="link">{{ $t('lang.clients.register') }}</a>
          <p class="view-more" @click="detail('personal',personal)">{{ $t('lang.user.news.lookDetails') }}</p>
        </div>
        <div class="vip-type type2">
          <div class="title">{{ $t('lang.compon.vippay.zk') }}</div>
          <div class="price">
            <span class="price-fh">￥</span>
            <span class="price-money">{{ circlePrice }}</span>
            <span class="price-text">{{ $t('lang.common.unit') }}</span>
          </div>
          <a href="javascript:;" class="link" @click="popPayShow('circle')">{{ $t('lang.clients.upgrade') }}</a>
          <p class="view-more" @click="detail('circle',circle)">{{ $t('lang.user.news.lookDetails') }}</p>
        </div>
        <div class="vip-type type3">
          <div class="title">{{ $t('lang.compon.vippay.zx') }}</div>
          <div class="price">
            <span class="price-fh">￥</span>
            <span class="price-money">{{ vipPrice }}</span>
            <span class="price-text">{{ $t('lang.common.unit') }}</span>
          </div>
          <a href="javascript:;" class="link" @click="popPayShow('vip')">{{ $t('lang.clients.upgrade') }}</a>
          <p class="view-more" @click="detail('vip',vip)">{{ $t('lang.user.news.lookDetails') }}</p>
        </div>
        <div class="vip-type type4">
          <div class="title">{{ $t('lang.compon.vippay.top') }}</div>
          <a :href="topclub.link" class="link">{{ $t('lang.clients.becomeVip') }}</a>
          <p class="view-more" @click="detail('topclub',topclub)">{{ $t('lang.user.news.lookDetails') }}</p>
        </div>
      </div>
    </div>
    <clients-detail
      :data="data"
      :popShow="detailShow"
      @open="detailOpen"
      :vipPrice="vipPrice"
      :circlePrice="circlePrice"
      @setVipPrice="setVipPrice"
      @setCirclePrice="setCirclePrice"
      @openPay="openPay"
    ></clients-detail>
    <clients-pay
      :data="data"
      :vipPrice="vipPrice"
      :circlePrice="circlePrice"
      :popShow="payShow"
      :circleIndex="circleIndex"
      @setCirclePrice="setCirclePrice"
      @open="payOpen"
    ></clients-pay>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import clientsDetail from '~/components/clients/detail'
  import clientsPay from '~/components/clients/pay'

  export default {
    components: {
      clientsDetail,clientsPay
    },
    data() {
      return {
        personal: {},
        company: {},
        circle: {},
        vip: {},
        topclub: {},
        success : false,//请求数据成功
        detailShow : false,//选择弹窗
        payShow : false,//付款弹窗
        circlePrice:0,
        vipPrice:0,
        circleIndex:0,
        data:{
          title:"--",
          content:"--",
          list:[
            {
              content:'--',
              price:0
            }
          ]
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.clients')
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      ...mapActions(['clients']),
      getInfo() {
        this.clients().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.personal = res.data.personal || {};
          this.company = res.data.company || {};
          this.circle = res.data.circle || {};
          this.vip = res.data.vip || {};
          this.topclub = res.data.topclub || {};
          this.success = true;
          this.circlePrice = this.circle.data[0].price;
          this.vipPrice = this.vip.data[0].price;
        })
      },
      detail(type,obj){
        if(type === 'personal'){
          this.data = {
            title:'personal',
            content:obj.intro,
            list:[]
          }
        }else if(type === 'circle'){
          this.data = {
            title:'circle',
            content:obj.intro,
            list:obj.data
          }
        }else if(type === 'vip'){
          this.data = {
            title:'vip',
            content:obj.intro,
            list:obj.data
          }
        }else if(type === 'topclub'){
          // console.log(obj.link)
          this.data = {
            title:"topclub",
            content:obj.intro,
            list:[],
            link:obj.link
          }
        }
        this.detailOpen(true)
      },
      detailOpen(bool){
        this.detailShow = bool ;
      },
      payOpen(bool){
        this.payShow = bool ;
      },
      setVipPrice(num){
        this.vipPrice = num
      },
      setCirclePrice(item){
        this.circlePrice = item.price;
        this.circleIndex = item.index;
      },
      popPayShow(type){
        this.payShow = true ;
        if(type === 'vip'){
          this.detail(type,this.vip)
        }else if(type === 'circle'){
          this.detail(type,this.circle)
        }
        this.detailOpen(false);
      },
      openPay(type){
        this.popPayShow(type)
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../assets/less/common";

  .vip {
    background: #342f2c url("../assets/img/vipbg.jpg") top center no-repeat;
    background-size: cover;
    .point {
      text-align: center;
      margin: 172px 0 60px;
      .title {
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .sub-title {
        color: rgba(51, 51, 51, .45);
        font-size: 26px;
        margin: 0 auto;
        .lines(3);
        text-align: center;
      }
    }
    .types {
      font-size: 0;
      .price{
        font-size: 32px;
        color: #999;
        line-height: 70px;
        height: 70px;
        margin-top:44px;
        .price-fh{
          position: relative;
          left: 4px;
        }
        .price-money{
          font-size: 70px;
          color: #333333;
        }
        .price-text{
          position: relative;
          right:4px  ;
        }
      }
      .vip-type {
        display: inline-block;
        vertical-align: top;
        width: 48%;
        font-size: @baseFont;
        text-align: center;
        height: 370px;
        .gradual-bgx(#fefefe, #dbdbdb);
        border-radius: 10px;
        margin: 30px 4% 0 0;
        padding-bottom: 30px;
        &:nth-of-type(2n) {
          margin-right: 0;
        }
        .title {
          height: 104px;
          line-height: 110px;
          color: #fff;
          border-radius: 10px;
        }
        &.type1 .title {
          .gradual-bgx(#d4746a, #bb4040);
        }
        &.type2 .title {
          .gradual-bgx(#e7e7e7, #7a7a7a);
        }
        &.type3 .title {
          .gradual-bgx(#ffcb4e, #e99030);
        }
        &.type4 .title {
          height: 218px;
          line-height: 230px;
          .gradual-bgx(#39efcf, #00cc8e);
        }

        a.link{
          display: block;
          width: 70%;
          line-height: 60px;
          color: @themColor;
          border:2px solid #dd7116;
          border-radius: 10px;
          margin:30px auto 0;
        }
        .view-more {
          position: relative;
          display: inline-block;
          color: #999;
          font-size: 30px;
          margin: 20px 0;
          &:after {
            content: '';
            position: absolute;
            top: 6px;
            right: -54px;
            width: 0;
            height: 0;
            border-width: 14px 18px;
            border-style: solid;
            border-color: transparent transparent transparent #999999;
          }
        }
        .content {
          text-align: left;
          font-size: 26px;
          color: #666;
          margin: 0 20px;
        }
      }
    }
  }
</style>
