<template>
  <div class="appointment-activity">
    <div class="bar">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">{{ $t('lang.book.activity.all') }}</mt-tab-item>
        <mt-tab-item id="2">{{ $t('lang.book.activity.new') }}</mt-tab-item>
      </mt-navbar>
      <nuxt-link class="link" to="/book/appt/activity">+ {{ $t('lang.book.activity.sponsoractivi') }}</nuxt-link>
    </div>
    <div class="inner-block">
      <item :list="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"></item>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import item from '../../../components/activity/item'
  export default {
    components:{
      item
    },
    data() {
      return {
        selected: '1',
        list: [],
        page:1,
        pagesize:5,
        loadFlag:false,
        loading:true,
        type:['','new']
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivity')
      }
    },
    watch:{
      selected(val) {
        this.list = [] ;
        this.page = 1 ;
        this.loading=false;
        this.loadFlag=false;
        this.getList(this.type[val-1]);
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      ...mapActions(['activityList', 'activityOrderDown']),
      getList(type) {
        this.activityList({
          pagesize:this.pagesize,
          page:this.page,
          type: type || "",
        }).then(res => {
          if (res.status === 'error') {
            return false;
          }
          if(res.data.list.length > 0){
            this.list=this.list.concat(res.data.list || []);
            this.loadFlag = true;
            this.loading = false;
          }else{
            this.loadFlag = false;
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
          this.getList(this.type[this.selected-1])
        }
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";

  .appointment-activity {
    .default-margin;
    .bar {
      position: relative;
      border-bottom: 1PX solid #dcdcdc;
      .link {
        position: absolute;
        top: 20px;
        right: 50px;
        color: @themColor;
      }
      .mint-navbar {
        display: block;
        text-align: left;
        .inner-block;
        .mint-tab-item {
          display: inline-block;
          margin-right: 80px;
          padding: 30px 0;
          &.is-selected {
            border-width: 3px;
          }
          &:last-child {
            margin: 0;
          }
          .mint-tab-item-label {
            font-size: @baseFont;
          }
        }
      }
    }
    .block-wrap{
      margin: 50px 0;
      .block {
        color: #999999;
        border-radius: 10px;
        background: #f9f9f9;
        overflow: hidden;
        margin-bottom: 60px;
        &.end{
          .inner{
            .date{
              background: #999999;
            }
          }
          .block-img{
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background: rgba(0,0,0,0.75);
            }
            &::before{
              content: '活动已经结束';
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
              font-size: 34px;
              color: #fff;
              z-index: 2;
            }
          }
        }
        .block-img{
          position: relative;
          img {
            width: 100%;
          }
        }
        .inner {
          margin: 0 25px 52px;
        }
        .main {
          margin: 40px 0;
          display: flex;
          .date {
            width: 140px;
            height: 140px;
            color: #fff;
            background: @themColor;
            margin-right: 48px;
            span{
              display: block;
              text-align: center;
              color: #ffffff;
              &.day{
                font-size: 50px;
                height: 50px;
                line-height: 50px;
                padding-top: 26px;
              }
              &.mon{
                font-size: 26px;
                height: 26px;
                line-height: 26px;
                padding-top: 10px;
              }
            }
          }
          .info {
            flex: 1;
            p {
              &.title {
                font-size: 34px;
                font-weight: bold;
                color: #333;
                word-wrap: break-word;
                word-break: break-all;
                display:-webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:1;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .fee {
                color: @themColor;
              }
              .place {
                color: #333;
              }
            }
          }
        }
        .text{
             word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
        }
      }
    }
  }
</style>
