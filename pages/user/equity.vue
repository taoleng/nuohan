<template>
  <div class="equity">
    <c-head></c-head>
    <div class="inner-block">
      <div class="base-info">
        <p class="info-title">{{ $t('lang.user.vip.title') }}</p>
        <div class="items">
          <span class="label">{{ $t('lang.user.vip.online') }}</span>
          <span class="answer">{{ userInfo.vip_data.meeting || '0' }} {{ $t('lang.common.hour') }}</span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.vip.question') }}</span>
          <span class="answer">{{ userInfo.vip_data.question || '0' }} {{ $t('lang.common.time') }}</span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.vip.activity') }}</span>
          <span class="answer">{{ userInfo.vip_data.activity || '0' }} {{ $t('lang.common.time') }}</span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.vip.metting') }}</span>
          <span class="answer">{{ userInfo.vip_data.meeting_room || '0' }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cHead from '../../components/user/cHead'
  import {mapState} from 'vuex'
  import {empty_obj,getDateInfo,_filterDateString} from '../../assets/js/tool'
  export default {
    components: {
      cHead
    },
    data() {
      return {
        data:{}
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    created(){
      // var userInfo =  ;
      // console.log(userInfo)
      // if(empty_obj(userInfo)){
      //   this.data = userInfo
      // }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";
  .equity {
    background: #f6f6f6;
    .base-info {
      background: #fff;
      padding: 22px 22px 32px;
      border: 1px solid #e5e5e5;
      margin-top: 94px;
      .info-title {
        font-size: 40px;
        margin: 10px 0 20px;
      }
      .items {
        height: 85px;
        font-size: 0;
        line-height: 85px;
        border-top: 1px solid #f6f6f6;
        position: relative;
        * {
          font-size: @baseFont;
        }
        .label {
          display: inline-block;
          vertical-align: middle;
          /*width: 50%;*/
          color: #999999;
        }
        .answer{
          position: absolute;
          top: 0;
          right: 0;
          height: 85px;
          line-height: 85px;
          font-size: 28px;
          color: #dd7116;
        }
      }
    }
  }
</style>
