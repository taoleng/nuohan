<template>
  <div class="pay-success order-detail">
    <div class="detail-title">
      <div class="point">
        <div class="inner-block">
          <img src="~/assets/img/yes.png" alt="">
          <span>{{ $t('lang.clients.paymentSuccess') }}</span>
        </div>
      </div>
      <div class="inner-block">
        <p>{{ Msg || $t('lang.clients.orderNotification') }}</p>
      </div>
    </div>
    <div class="inner-block content">
      <img src="~/assets/img/success.png" alt="">
      <p>{{ $t('lang.clients.paymentSuccess') }}</p>
      <div class="btn-wrapper">
        <nuxt-link to="/" class="common-submit-btn return">
          <span>{{ $t('lang.btn.home') }}</span>
        </nuxt-link>
        <p @click="lookOrder" class="common-submit-btn">
          <i class="iconfont icon-xiangyoujiaohuan"></i>
          <span>{{ $t('lang.btn.orderdetail') }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapMutations} from 'vuex';

  export default {
    data() {
      return {
        Msg: '',
        obj: {}
      }
    },
    head(){
      return {
        title:this.$t('lang.title.order')
      }
    },
    created() {
      this.getUserInfo().then(res=>{
        if(res.status === 'error'){
          return false
        }
        let userInfo = res.data;
        this.SET_USER_INFO(userInfo)
      })
    },
    mounted() {
      this.obj = JSON.parse(localStorage.getItem('pjson'));
      var route = this.obj.type;
      this.payMessage().then((res) => {
        if (res.status === 'error') {
          return false;
        }
        let data = res.data;
        if (route === 'activity') {
          this.Msg = data.activity
        } else if (route === 'meeting') {
          this.Msg = data.onlineTalks
        } else if (route === 'talks') {
          this.Msg = data.offlineTalks
        } else if (route === 'service') {
          this.Msg = data.serve
        } else if (route === 'office') {
          this.Msg = data.office
        } else if (route === 'room') {
          this.Msg = data.conference
        } else if (route === 'question') {
          this.Msg = data.answer
        }
      })
    },
    methods: {
      ...mapActions(['payMessage','getUserInfo']),
      ...mapMutations(['SET_USER_INFO']),
      lookOrder() {
        this.$router.push({
          path: '/book/order/' + this.obj.type,
          query: {
            state: 'details',
            id: this.obj.id,
            type: this.obj.type
          }
        })
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
      img {
        width: 138px;
      }
      p {
        opacity: .6;
        margin-top: 40px;
      }
      .btn-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 96px;
        p{
          opacity: 1;
        }
        .common-submit-btn {
          width: 45%;
          background: #dd7116;
          &.return {
            color: #999;
            background: #f6f6f6;
          }
        }
      }
    }
  }
</style>
