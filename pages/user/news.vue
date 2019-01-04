<template>
  <div class="news user-center-wrapper">
    <c-head></c-head>
    <div class="inner-block">
      <div class="base-info">
        <p class="info-title">{{ $t('lang.user.news.allMsg') }}</p>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <div class="items" v-for="(item, index) in list" :key="index">
            <span class="dot" :class="{'on': item.unread}"></span>
            <div class="info-top" v-if="item.msgtype==1">
              <p>{{ item.create_time }}</p>
              <p>{{ $t('lang.common.orderMsg') }}：{{ item.type | typeFormat }}</p>
              <p>{{ $t('lang.book.order.activity.number') }}：{{ item.order_id }}</p>
            </div>
            <div class="info-top" v-else>
              <p>{{ item.create_time }}</p>
              <p>{{ $t('lang.user.news.systemMsg') }}：</p>
            </div>
            <template v-if="item.msgtype==1">
              <div class="info-text msg" v-html="item.message"></div>
            </template>
            <template v-else>
              <div class="info-text" v-html="item.message" :class="{'open':item.openFlag}"></div>
            </template>
            <div class="go" v-if="item.msgtype==1" @click="goDetail(item)">{{ $t('lang.model.lookod') }} <i class="iconfont icon-xiangyou"></i></div>
            <div class="go" v-else @click="goDetail(item)"><p>{{ item.openFlag ? $t('lang.user.news.open') : $t('lang.user.news.close') }} <i class="iconfont icon-xiangyou"></i></p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import cHead from '../../components/user/cHead'
  import {typeFormat,loadingHide} from '../../assets/js/tool'

  export default {
    components: {
      cHead
    },
    filters: {
      typeFormat
    },
    data() {
      return {
        list: [],
        page: 1,
        pagesize:8,
        loadFlag:false,
        loading:true
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      ...mapActions(['userMessage','readmsg']),
      init() {
        this.userMessage({
          pagesize: this.pagesize,
          page: this.page
        }).then(res => {
          if (res.status === 'error') {
            return false;
          }
          let d = res.data.list;
          d.forEach(item =>{
            item.openFlag = 1
          });
          if(d.length > 0){
            this.list=this.list.concat(d);
            this.loadFlag = true;
            this.loading = false;
          }else{
            this.loadFlag = false;
          }
          if(this.loadFlag){
            loadingHide()
          }
        })
      },
      goDetail(item){
        var arr = [
          '',
          'office',
          'room',
          'talks',
          'meeting',
          'question',
          'service',
          'activity'
        ];
        item.openFlag = !item.openFlag;
        if(item.unread){
          this.readmsg({order_id:item.order_id}).then(res=>{
            if(res.status === 'error'){
              return false;
            }
          })
        };
        if(item.order_id == "0"){
          return false;
        };
        this.$router.push({
          path: '/book/order/' + arr[item.type],
          query: {
            id: item.order_id,
            state: 'details',
            isPersonal: 'true'
          }
        })
      },
      loadMore(){
        if(this.list.length % this.pagesize !== 0 ){
          return false
        }
        if(this.loadFlag){
          this.page++;
          this.loading = true;
          this.init()
        }
      }
    }
  }
</script>
<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";

  .news {
    .base-info {
      padding: 22px 22px 52px;
      .info-title {
        font-size: 40px;
        margin: 10px 0 20px;
      }
      .items {
        position: relative;
        border-top: 1px solid #f5f2f2;
        padding: 25px 0 25px 5%;
        box-sizing: content-box;
        .dot {
          position: absolute;
          top: 40px;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &.on {
            background: @themColor;
          }
        }
        .info-top{
          font-size: 28px;
          color: #999;
        }
        .info-text{
          font-size: 28px;
          color: #333333;
          margin-top:20px;
          height:120px;
          transition:0.5s;
          &.msg{
            height: auto;
            max-height:120px;
          }
          &.open{
            height: 80px;
            overflow: hidden;
          }
        }
        .go{
          display: block;
          text-align: right;
          height:40px;
          line-height:40px;
          font-size: 26px;
          color: #999;
          margin-top: 10px;
          background: #fff;
          z-index:2;
          i{
            font-size: 26px;
            transform: scale(0.8);
            color: #dd7116;
            z-index:2;
          }
        }

      }
    }
  }
</style>
