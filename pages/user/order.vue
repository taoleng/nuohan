<template>
  <div class="order-list user-center-wrapper">
    <c-head></c-head>
    <div class="inner-block">
      <div class="base-info">
        <template v-if="orederPJ">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">{{ $t('lang.user.order.title')[0] }}</mt-tab-item>
            <mt-tab-item id="2">{{ $t('lang.user.order.title')[1] }}</mt-tab-item>
            <mt-tab-item id="3">{{ $t('lang.user.order.title')[2] }}</mt-tab-item>
            <mt-tab-item id="4">{{ $t('lang.user.order.title')[3] }}</mt-tab-item>
            <mt-tab-item id="5">{{ $t('lang.user.order.title')[4] }}</mt-tab-item>
          </mt-navbar>
          <div class="mint-tab-container-wrap">
            <order-item :list="list" @orderFlag="orderFlag" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"></order-item>
          </div>
          <!--mt-tab-container v-model="selected" :swipeable="false">
            <mt-tab-container-item id="1">
              <order-item :list="list" @orderFlag="orderFlag"></order-item>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <order-item :list="list" @orderFlag="orderFlag"></order-item>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <order-item :list="list" @orderFlag="orderFlag"></order-item>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
              <order-item :list="list" @orderFlag="orderFlag"></order-item>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
              <order-item :list="list" @orderFlag="orderFlag"></order-item>
            </mt-tab-container-item>
          </mt-tab-container-->
        </template>
        <template v-else>
          <div class="orderPJ" >
            <div class="orderPJ-main">
              <div class="orderPJ-top">
                <h3>{{ $t('lang.user.order.evaluateOrder') }}</h3>
                <p>{{ $t('lang.book.order.activity.number') }}：{{ orederPJDetail.id }}</p>
                <p>{{ $t('lang.user.order.data') }}：{{ orederPJDetail.time }}</p>
              </div>
              <div class="orderPJ-mid">
                <h4><span>{{ typeFormat(orederPJDetail.type) }}</span></h4>
                <h4 class="category">{{ $t('lang.user.order.category') }}：<span>{{ orederPJDetail.category }}</span></h4>
                <p class="mid-pf">{{ $t('lang.user.order.evaluate3') }}<span>{{ rangeValue/10 }}<em>{{ $t('lang.user.order.minute') }}（{{ textPj }}）</em></span></p>
                <div class="orderPJ-procress">
                  <mt-range v-model="rangeValue"></mt-range>
                </div>
                <p>{{ $t('lang.user.order.evaluate3') }}</p>
                <div class="orderPJ-textarea">
                  <textarea v-model="textareVaule" :maxlength="maxlength" :placeholder="$t('lang.user.order.talks')" @input="last"></textarea>
                  <p>{{ $t('lang.user.order.importability') }}{{ lastlength }}{{ $t('lang.user.order.font') }}</p>
                </div>
                <div class="orderPJ-uploadImg">
                  <multiple-upload @on-load="loadImg"></multiple-upload>
                </div>
              </div>
            </div>
            <div class="orderPJ-btm">
              <div class="common-submit-btn" @click="orderEval">{{ $t('lang.btn.submit') }}</div>
            </div>
          </div>
        </template>

        <div v-if="!list.length" class="noneOrder">{{ $t('lang.user.order.noOrder') }}</div>
      </div>
    </div>


    <!--c-pop :cShow="cShow" @cPopClose="cPopClose" :cTitleIconShow="true" :cTitle="$t('lang.user.order.evaluateed')">
      <div class="text">非常感谢您的评价，<br>您的信任是我们前进的动力！</div>
      <div class="pop-btn" @click="cBtn">查看订单详情</div>
    </c-pop-->

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import cHead from '../../components/user/cHead'
  import orderItem from '../../components/user/orderItem'
  import {toast} from '../../assets/js/tool'
  import multipleUpload from '../../components/appt/multipleUpload'
  import cPop from '../../components/common/c-pop'

  export default {
    components: {
      cHead,orderItem,cPop,multipleUpload
    },
    data() {
      return {
        selected: "1",
        list: [],
        page:1,
        pagesize:5,
        maxlength:140,
        lastlength:140,
        textareVaule : "",
        orederPJ:true,
        pic:"",
        fileList:[],
        rangeValue:75,
        // orderPJ:{
        //   id:"",//订单id
        //   score:75,//订单评价分数
        //   content:"",//订单评价内容
        //   pic:""//图片id
        // },
        orederPJDetail:{//订单评价详情
          id : "",//订单编号
          time : "",//创建订单时间
          state:"",//订单状态
          type:"",//订单类型
          category:""
        },
        loadFlag:false,
        loading:true,
        item:{},//订单

        cShow:false
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed:{
      textPj(){
        let fen = this.rangeValue;
        let text = ""
        if(fen >=90){
          text = this.$t('lang.user.order.greatSatisfaction');
        }else if(fen >60 && fen <=90){
          text = this.$t('lang.user.order.satisfaction');
        }else if(fen >30 && fen <=60){
          text = this.$t('lang.user.order.yiban');
        }else if(fen >10 && fen <=30){
          text = this.$t('lang.user.order.yawp');
        }else if(fen <= 10){
          text = this.$t('lang.user.order.unhappy');
        }
        return text;
      }
    },
    watch: {
      selected(val) {
        this.page = 1 ;
        this.list = [] ;
        this.loading=false;
        this.loadFlag=false;
        this.getOrderList(val-1);
      }
    },
    created(){
      let rou = this.$route.query;
      if(rou.pj){
        this.orederPJ = false;
        this.getOrderDetail({order_id :rou.id}).then(res =>{
          if(res.state === 'error'){
            return false;
          }
/*          let item = res.data;
          let category_str = '';
          switch (item.type) {
            case 7:
              category_str = item.title;
              break;
            case 6:
              category_str = item.first_title + '——' +  item.second_title + '——' +  item.title;
              break;
            case 5:
            case 4:
            case 3:
              category_str = item.category + '——' +  item.title;
              break;
            case 2:
              category_str = item.title; //   <p>{{ typearr[item.data.size] }}（{{ item.data.people }}）{{ $t('lang.common.person') }}</p>
              break;
            case 1:
              category_str = item.title; //  <p>{{ huiyiarr[item.data.type] }}</p>     <p>{{ item.data.station }}{{ $t('lang.common.station') }}</p>
            default:
              break;
          }
          console.log(item,category_str);*/
          let titles = [];

          res.data.first_title && titles.push(res.data.first_title);
          res.data.second_title && titles.push(res.data.second_title);
          res.data.title && titles.push(res.data.title);

          let category = titles.join('——');

          if(!category && res.data.type_title){
            category = res.data.type_title.join('——');
          }

          if(!category && res.data.title){
            category = res.data.title;
          }

          this.orederPJDetail = {
            id : res.data.order_id,//订单编号
            time : res.data.create_time,//创建订单时间
            state:res.data.state,//订单状态
            type:res.data.type,//订单类型
            category: category,
          }
        })
      }
    },
    mounted() {
      this.getOrderList();
    },
    methods: {
      ...mapActions([
        'orderList',
        'cancelOrder',
        'getOrderDetail',
        'evaluationUpload',
        'orderEvaluation'
      ]),
      typeFormat(val) {
        return this.$t('lang.common.orderArr')[val];
      },
      getOrderList(type) {
        this.orderList({
          pagesize: this.pagesize,
          page: this.page || 1,
          type: type || 0
        }).then(res => {
          if (res.status === 'error') {
            return false;
          }
          if(res.data.list.length > 0){
            this.list=this.list.concat(res.data.list || []);
            this.loadFlag = true;
            this.loading = false
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
          this.getOrderList(this.selected-1)
        }
      },
      last(){
        this.lastlength = this.maxlength - this.textareVaule.length
      },
      orderFlag(item){
        this.orederPJ = item.flag;
        this.orederPJDetail = {
          id : item.id,
          time : item.time,
          state:item.state,
          type : item.type,
          category:item.category
        }

        this.item = item.item;
      },
      cPopClose(bool){
        this.cShow = bool ;
      },
      cBtn(){//评价完成之后查看详情
        // alert(11)
      },
      loadImg(uploadList) {
        this.fileList = uploadList || [];
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
        ]
        this.$router.push({
          path: '/book/order/' + arr[item.type],
          query: {
            id: item.order_id,
            state: 'details',
            isPersonal: 'true'
          }
        })
      },
      submit(param){
        this.orderEvaluation(param).then(res =>{
          if(res.state === 'error'){
            return false;
          }
          if(this.$route.query.pj){ //如果用户是从订单详情过来
            this.$router.history.go(-1);
            return false;
          }
          this.orederPJ = true ;
          this.item.state = 5;
          setTimeout(()=>{
            document.documentElement.scrollTop = localStorage.getItem("goOrderPosition");
          },30)
        })
      },
      orderEval(){//订单评价提交订单
        let param = {
          id : this.orederPJDetail.id,
          content :this.textareVaule.trim(),
          score : this.rangeValue / 10 ? this.rangeValue / 10 : "0",
          pic : this.pic
        }
        if(!param.content.length){
          toast(this.$t('lang.common.nopl'));
          return false;
        }
        if(this.fileList.length > 0){
          let uploadId = [];
          (this.fileList || []).forEach(item => {
            let data = new FormData();
            data.append('file', item, 'file_' + Date.parse(new Date()) + '.jpg');
            this.evaluationUpload(data).then(res => {
              if (res.status === 'error') {
                return false;
              }
              if (res.data.id) {
                uploadId.push(res.data.id);
                if (uploadId.length === this.fileList.length) {
                  param.pic = uploadId.join(',');
                  this.submit(param)
                }
              }
            });
          });
        }else{
          this.submit(param)
        }
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../assets/less/common";


  .orderPJ-main{
    padding: 0 30px 34px;
    background: #fff;
    border: 1px solid #ccc;
    .orderPJ-top{
      border-bottom: 1px solid #cccccc;
      padding-bottom: 30px;
      h3{
        font-size: 40px;
        color: #333333;
        font-weight: 500;
        padding: 36px 0 24px;
      }
      p{
        font-size: 28px;
        color: #999999;
      }
    }
    .orderPJ-mid {
      padding-top: 30px;
      position: relative;
      h4 {
        font-size: 34px;
        color: #333333;
        padding-bottom: 20px;
        font-weight: 500;
      }
      h4.category {
        color: #999999;
        span {
          color: #333333;
        }
      }
      p {
        font-size: 24px;
        color: #999999;
        &.mid-type {
          span {
            color: #333333;
          }
        }
        &.mid-pf {
          span {
            font-size: 70px;
            color: #dd7116;
          }
          em {
            font-size: 24px;
            font-style: normal;
          }
        }
      }
    }

    .orderPJ-procress{
      margin-bottom: 20px;
      .mt-range-progress{
        background:linear-gradient(to right,#f4ccae 0%,#f4c7a9 20%,#ee7c58 40%,#eb5730 60%,#f0491d 80%,#fc3501 100%);
        background:-webkit-linear-gradient(to right,#f4ccae 0%,#f4c7a9 20%,#ee7c58 40%,#eb5730 60%,#f0491d 80%,#fc3501 100%);
      }
      .mt-range-progress{
        height:10px !important;
        border-radius: 10px;
      }
    }
    .orderPJ-uploadImg{
      margin-top: 20px;
    }
    .orderPj-upload{
      width: 96px;
      height: 96px;
      background: url(../../assets/img/orderPJ-upload.png) no-repeat;
      background-size:100% 100%;
    }
    .orderPJ-textarea{
      margin-top: 18px;
      position: relative;
      textarea{
        font-size: 24px;
        color: #333;
        height: 360px;
        border-radius:10px;
        padding: 20px;
        box-sizing:border-box;
        width: 100%;
        background: #f7f7f7;
        text-indent:1em;
        line-height:44px;
        border-color: #e4e4e4;
        outline: none;
        word-break: break-all;
        resize: none;
      }
      p{
        position: absolute;
        bottom: 30px;
        right:30px;
      }
    }
  }

  .noneOrder{
    text-align: center;
    margin-top: 50px;
  }
  .order-list.user-center-wrapper {
    .base-info {
      background: transparent;
      border: none;
    }
    .mint-navbar {
      border: @grayBorder;
      margin-bottom: 30px;
    }
    .seprate {
      background: #000;
    }
    .mint-navbar {
      .mint-tab-item {
        color: #999;
        margin: 0 20px -1px;
        padding: 20px 0;
        .mint-tab-item-label {
          display: inline-block;
        }
      }
    }
    .mint-tab-container-wrap {
      .order-items {
        padding: 24px 24px 50px;
        background: #fff;
        border: @grayBorder;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-num {
          color: #999;
          border-bottom: @grayBorder;
          padding-bottom: 20px;
          .cancel {
            float: right;
            font-size: 26px;
            line-height: 1.8;
          }
        }
        .info-wrapper {
          overflow: hidden;
          margin: 38px 0;
          .img-wrapper {
            float: left;
            width: 160px;
            height: 182px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .info {
            color: #999;
            margin-left: 190px;
            .text{
              height:46px;
              font-size: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 26px;
              overflow: hidden;
              margin-top:10px;
            }
            p {
              margin-bottom: 4px;
              &.title {
                font-size: 30px;
                font-weight: bold;
                span {
                  color: #333;
                }
              }
              &.time{
                font-size: 26px;
              }
              &.state {
                color: #333;
                font-weight: bold;
                font-size: 32px;
                line-height: 36px;
                margin-top: 10px;
                .price {
                  float: right;
                  font-size: 36px;
                  color: @themColor;
                }
              }
            }
          }
        }
        .btn-box {
          height: 88px;
          a {
            display: inline-block;
            width: 45%;
            height: 88px;
            line-height: 94px;
            text-align: center;
            border: 1px solid #dcdcdc;
            &.theme {
              color: #fff;
              border-color: @themColor;
              background: @themColor;
              float: right;
              margin-top: 0;
            }
            &.left{
              float: left;
            }
          }
        }
      }
    }
  }
</style>
