<template>
  <div class="activity-detail">
    <img class="cover" :src="info.cover" alt="">
    <div class="section inner-block detail-info">
      <p class="title">{{ info.title }}</p>
      <!--p class="date">{{ info.start_time | dateFormat }} - {{ info.end_time | dateFormat }}</p-->
      <p class="item">{{ $t('lang.book.activity.price2') }}<span>￥{{ info.price }} {{ $t('lang.book.activity.price_unit') }}</span></p>
      <p class="item">{{ $t('lang.book.activity.shijian') }}<span>{{ info.start_time | dateFormat }} {{ info.start_time | time }}</span></p>
      <p class="item">{{ $t('lang.book.activity.side') }}<span class="place">{{ info.address }}</span></p>
      <div class="intro-wrapper">
        <p class="gray">{{ $t('lang.book.activity.synopsis') }}</p>
        <p class="intro gray-content" v-html="info.intro"></p>
      </div>
    </div>
    <div class="separate"></div>
    <div class="section inner-block">
      <p class="title">{{ $t('lang.book.activity.activity') }}</p>
      <div class="gray gray-content" v-html="info.content"></div>
    </div>
    <div class="separate"></div>
    <div class="section inner-block">
      <!--<p class="title">报名须知</p>-->
      <!--div class="notes">
        <p>
          <i class="iconfont icon-shijian"></i>
          <span>活动时长 :</span>
          <span class="text">{{ info.notice.active_duration || "--" }}小时</span>
        </p>
        <p>
          <i class="iconfont icon-shuoming"></i>
          <span>限购说明 :</span>
          <span class="text">不限购</span>
        </p>
        <p>
          <i class="iconfont icon-xianzhi"></i>
          <span>购买限制 :</span>
          <span class="text">{{ info.notice.buy_terms || "--" }}</span>
        </p>
        <p>
          <i class="iconfont icon-shijian"></i>
          <span>入场时间 :</span>
          <span class="text">{{ info.notice.enter_time || "--" }}</span>
        </p>
        <p>
          <i class="iconfont icon-shijian"></i>
          <span>禁止携带 :</span>
          <span class="text">{{ info.notice.forbid || "--" }}</span>
        </p>
      </div-->
      <div class="btm">
        <div class="bm">
          <p class="people">{{ $t('lang.book.activity.num') }}</p>
          <div class="num">
            <num @on-change="onStationNumChange"></num><span class="peo">{{ $t('lang.book.activity.ren') }}</span>
          </div>
          <p class="gray">{{ $t('lang.book.activity.total') }}</p>
          <p class="price" v-if="info.price">￥{{ info.price*stationNum }}</p>
        </div>
        <div>
          <a href="javascript:;" class="common-submit-btn" :class="{'end' : info.state===0}" @click="goBm(info.id)">
            <i class="iconfont icon-xiangyoujiaohuan"></i>
            <span>{{ $t('lang.book.activity.apply') }}</span>
          </a>
          <span class="gray">{{ $t('lang.book.activity.yijin') }} {{ info.signup }} {{ $t('lang.book.activity.baoming') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {getDateInfo,toast} from '../../../assets/js/tool'
  import num from '../../../components/appt/num'
  export default {
    components:{
      num
    },
    filters: {
      dateFormat(val) {
        return getDateInfo({date: val * 1000}).date;
      },
      time(val) {
        return getDateInfo({date: val * 1000}).time;
      }
    },
    data() {
      return {
        id: '',
        info: {},
        stationNum:0
      }
    },
    computed:{
      ...mapState(['hasLogin','token'])
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivity')
      }
    },
    mounted() {
      this.id = this.$route.query.id || '';
      this.getDetail();
    },
    methods: {
      ...mapActions(['activityDetail','activityOrderDown']),
      getDetail() {
        if (!this.id) {
          return false
        }
        this.activityDetail({id: this.id}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.info = res.data || {};
        })
      },
      onStationNumChange(val) {
        this.stationNum = val;
      },
      goBm(id){
        if (!(this.hasLogin && this.token)) {
          this.$router.push({
            path: '/user/login'
          })
          return;
        }
        if(!id){
          return false;
        }

        if(!this.stationNum){
          toast( this.$t('lang.book.activity.request_num') );
          return false
        }
        if(this.info.state===0){
          toast( this.$t('lang.book.activity.already_expired')  );
          return false
        }
        let param={
          people:this.stationNum ? this.stationNum : 0,
          id:id
        }
        this.activityOrderDown(param).then(res =>{
          if(res.state === 'error'){
            return false
          }
          toast(this.$t('lang.book.activity.success'))

          this.$router.push({path:'/book/order/activity',query:{id:res.data.order_id}})
        })
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";

  .activity-detail {
    .default-margin;
    .cover {
      width: 100%;
    }
    .bm{
      .num-controller{
        margin-bottom: 10px;
      }
    }

    .btm{
      margin-top: 30px;
      .common-submit-btn {
        display: inline-block;
        width: 400px;
        margin-top: 20px;
        margin-right: 20px;
        &.end{
          background: #999;
        }
      }
      .num{
        position: relative;
        span.peo{
          position: absolute;
          top:6px;
          left:320px;
          font-size:30px;
          color: #999;
        }
      }
      .people{
        font-size: 24px;
        margin-bottom: 10px;
        color: #999;
      }
      .price {
        color: @themColor;
        font-size: 62px;
        font-weight: bold;
        height: 100px;
      }
      .gray{
        display: inline-block;
        margin-top: 20px;
      }
    }

    .section {
      line-height: 1.8;
      padding: 40px 0;
      .title {
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 18px;
      }
      .gray-content{
        text-align: justify;
        span{
          display: block!important;
        }
        img{
          display: block!important;
          width: 80%;
          margin:20px auto;
        }
      }
      &.detail-info {
        .title {
          margin-bottom: -4px;
        }
        .date {
          .gray;
          font-size: 30px;
          margin-bottom: 30px;
        }
        .item {
          span {
            color: @themColor;
            margin-left: 32px;
            &.place {
              color: #333;
            }
          }
        }
        .intro-wrapper {
          line-height: 1.8;
          margin: 40px 0;
        }
      }
      .notes {
        color: @themColor;
        i, span {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .separate {
      height: 18px;
      background: #f9f9f9;
    }
  }
</style>
