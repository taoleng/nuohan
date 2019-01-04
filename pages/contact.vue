<template>
  <div class="contact" :style="'background:url('+data.bgimg+') no-repeat top center;'">
    <div class="inner-block">
      <p class="title">{{ data.title }}</p>
      <p class="sub-title">{{ data.subtitle }}</p>
      <div class="line"></div>
      <div class="contact-info">
        <div class="info-item" v-for="(item,index) in data.block" :key="index">
          <span>{{ item.title }}</span>
          <div>
            <p>{{ item.email }}</p>
            <p>{{ item.mobile }}</p>
          </div>
        </div>
      </div>
      <div class="code">
        <img :src="data.qrcode">
        <div>
          <p>{{ $t('lang.contact.learnMore') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return {
        data:{}
      }
    },
    created(){
      this.init();
    },
    head(){
      return {
        title:this.$t('lang.title.contactus')
      }
    },
    methods:{
      ...mapActions(['contactus']),
      init(){
        this.contactus().then(res => {
          if(res.status === 'error'){
            return false;
          }
          this.data = res.data;
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .contact {
    color: #fff;
    /*background: #352f2f url("../assets/img/contactbg.jpg") top center no-repeat;*/
    background-size: cover!important;
    .title {
      margin-top: 155px;
      font-size: 60px;
    }
    .sub-title {
      font-size: 36px;
    }
    .line {
      width: 16px;
      height: 1PX;
      background: #fff;
      margin: 20px 0 40px;
    }
    .contact-info {
      .info-item {
        border-bottom: 1px solid rgba(255, 255, 255, .15);
        padding: 20px 0;
        margin-bottom: 20px;
        overflow: hidden;
        span {
          float: left;
          font-size: 34px;
          /*word-break: break-all;*/
          word-wrap: break-word;
          line-height: 44px;
          width:200px;
        }
        > div {
          font-size: 32px;
          color: rgba(255, 255, 255, .5);
          margin-left: 200px;
        }
      }
    }
    .code {
      margin: 62px 0;
      overflow: hidden;
      img {
        float: left;
        width: 140px
      }
      > div {
        color: rgba(255, 255, 255, .5);
        line-height: 1.6;
        padding-top: 28px;
        margin-left: 200px;
      }
    }
  }
</style>
