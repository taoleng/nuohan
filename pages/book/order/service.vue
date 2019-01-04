<template>
  <div class="service-confirm order-detail">
    <div class="inner-block">
      <div class="order-item">
        <i class="iconfont icon-dingdan"></i>
        <p>{{ $t('lang.book.order.activity.number') }}</p>
        <div class="data">{{ orderData.order_id }}</div>
      </div>
      <template v-if="$route.query.state === 'details'">
        <div class="order-item">
          <i class="iconfont icon-dingdan1"></i>
          <p>{{ $t('lang.book.order.activity.state') }}</p>
          <div class="data">{{ orderData.payState }}</div>
        </div>
        <div class="order-item">
          <i class="iconfont icon-shouliren"></i>
          <p>{{ $t('lang.book.order.activity.receiver') }}</p>
          <template v-if="!orderData.manage">
            <div class="data">{{ $t('lang.book.order.activity.unsbd') }}</div>
          </template>
          <template v-else>
            <div class="data">{{ orderData.manage.truename }} {{ orderData.manage.mobile }}</div>
          </template>
        </div>
      </template>
      <div class="order-item">
        <i class="iconfont icon-shenpigaizhang"></i>
        <div class="select-box">
          <p>{{ $t('lang.book.appt.service.item1') }}</p>
          <div>
            <span>
              {{ orderData.first_title }}
            </span>
          </div>
        </div>
        <div class="select-box">
          <p>{{ $t('lang.book.appt.service.item2') }}</p>
          <div>
            <span>
              {{ orderData.second_title }}
            </span>
          </div>
        </div>
        <div class="select-box">
          <p>{{ $t('lang.book.appt.service.item3') }}</p>
          <div>
            <span>
              {{ orderData.title }}
            </span>
          </div>
        </div>
      </div>
      <!--div class="order-item">
        <i class="iconfont icon-leixing"></i>
        <div class="btn-box">
          <p>请选择您需要办理的业务</p>
          <div class="on">工作就业</div>
          <div>创业投资</div>
          <div>商务活动</div>
          <div>旅游</div>
          <div>探亲访友</div>
          <div>团聚移民</div>
        </div>
      </div-->
      <div class="order-item">
        <i class="iconfont icon-cailiaoshenbao"></i>
        <p class="title" v-if="!($route.query.state === 'details')">{{ $t('lang.book.appt.service.offer') }}</p>
        <p class="title" v-else>{{ $t('lang.book.appt.service.offerneed') }}</p>
        <div class="order-item-in" v-for="(item, index) in orderData.information" :key="index">
          <p>{{ item.title }}：{{ item.intro }}</p>
          <div class="sl">
            <div @click="showExample(item.exp_img)">{{ $t('lang.book.appt.service.lieh') }}</div>
          </div>
        </div>
        <template v-if="$route.query.state === 'details'">
          <p class="title">{{ $t('lang.book.appt.service.offerneed') }}</p>
          <!--图片上传的位置-->
          <ul class="upmaterial-list">
            <li
              v-for="(item, index) in imglist"
              :style="{ 'background-image': 'url(' + (item.url ? item.url : ' ') + ')' }"
              :key="index"
              @click="lookbigimg(item.url)">
              <template v-if="/.pdf$/.test(item.url)">
                <img src="../../../assets/img/pdf.png">
              </template>
              <i class="iconfont icon-quxiao" @click.stop="removeImg(item.id)"></i>
            </li>
            <avatar-upload :state="orderData.state" @on-change="filechange"></avatar-upload>
          </ul>
          <p class="upload-text">{{ $t('lang.book.appt.service.itemneed') }}<span>{{ orderData.needtimes }}</span>{{ $t('lang.book.appt.service.itemneed2') }}</p>
          <p class="upload-text">{{ $t('lang.book.appt.service.yuji') }}<span>2019.10.01</span></p>
        </template>
      </div>
      <div class="result">
        <template v-if="$route.query.state === 'details'">
          <!--订单流程-->
          <business :value="orderData.payState"></business>
          <!--订单消息-->
          <business-msg :message="orderData.message"></business-msg>
        </template>
        <div class="item">
          <span>{{ $t('lang.book.order.activity.price') }}</span>
          <span class="pay-num">￥{{ orderData.total_price }}</span>
        </div>
        <template v-if="!($route.query.state === 'details')">
          <div class="item">
            <pay-type :vipcar="true" v-model="patternPay"></pay-type>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <patt :value="orderData.payType"></patt>
          </div>
        </template>
        <clause
          v-model="isTy"
          v-if="!(orderData.numstate >= 5)"
        ></clause>
        <ul class="order-comon-btn">
          <template v-if="orderData.numstate == 4">
            <li class="cancel-btn" @click="goToPj">
              <span>{{ $t('lang.user.order.evaluate') }}</span>
            </li>
          </template>
          <template v-else-if="orderData.numstate <= 3">
            <li class="cancel-btn" @click="offOrder">
              <span>{{ $t('lang.btn.cancelOrder') }}</span>
            </li>
          </template>
          <template v-if="!($route.query.state === 'details')">
            <li class="pay-btn" @click="goOfflineTalks">
              <i></i>
              <span>{{ $t('lang.btn.subOrder') }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="view-img" v-if="bigImg" :style="'background-image: url(' + bigImg + ')'">
      <span @click="bigImg = ''">{{ $t('lang.btn.off2') }}</span>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import payType from '~/components/order/pay-type';
  import business from '~/components/order/business';
  import patt from '~/components/order/patt';
  import businessMsg from '~/components/order/business-msg';
  import clause from '~/components/common/clause';
  import {toast} from '~/assets/js/tool';
  import avatarUpload from '~/components/common/avatarUpload';

  export default {
    components: {
      payType,
      clause,
      business,
      businessMsg,
      patt,
      avatarUpload
    },
    data() {
      return {
        // 支付方式
        patternPay: '',
        isTy: false,
        uploadFlag: false,
        bigImg: '',
        imglist: [],
        imgListId: [],
        orderState:0,
      }
    },
    head(){
      return {
        title:this.$t('lang.title.order')
      }
    },
    computed: {
      ...mapState(['orderData', 'userInfo','hasLogin','token']),
    },
    watch: {
      patternPay(val) {
        // console.log(val)
      },
      'orderData.informationList'(val) {
        val.forEach((v) => {
          this.imgListId.push(v.id);
        })
        this.imglist = val;
      }
    },
    created(){
      this.orderState = this.orderData.state ;
    },
    methods: {
      ...mapMutations(['payPc', 'orderCancelCommon']),
      ...mapActions(['serviceUpload', 'orderSubmit']),
      loadImg(uploadList) {
        this.fileList = uploadList || [];
      },
      goToPj(){
        this.$router.push({
          path:'/user/order',
          query:{
            id : this.$route.query.id,
            pj:true
          }
        })
      },
      showExample(url) {
        if (!url) {
          return false;
        }
        this.bigImg = url;
      },
      filechange(file) {
        // 审核通过不能修改与上传
        if (this.orderData.numstate >= 2) {
          toast(this.$t('lang.common.orderpass'));
          return;
        }
        let param = new FormData();
        let type = file.type.split("/")[1] == "png" ? "png" : "jpg";
        param.append('file', file,"img."+type);
        this.serviceUploadApi(param);
      },
      serviceUploadApi(param) {
        this.serviceUpload(param).then((res) => {
          if (res.status === 'error') {
            return false;
          }
          let data = res.data;
          this.imgListId.push(data.id)
          this.imgListId = this.uniq(this.imgListId);
          this.imglist.push(data)
          this.uplistId();
        })
      },
      removeImg(id) {
        // 审核通过不能修改与上传
        if (this.orderData.numstate >= 2) {
          toast(this.$t('lang.common.orderpass'))
          return;
        }
        this.imgListId = this.uniq(this.imgListId);
        var index = this.imgListId.indexOf(id);
        this.imglist.forEach((v, k) => {
          if (v.id === id) {
            this.imglist.splice(k, 1);
          }
        })
        if (index === -1) {
          return;
        }
        // 前端删除
        // 后端删除
        this.imgListId.splice(index, 1);
        this.uplistId();
      },
      lookbigimg(url) {
        if (url.indexOf('.pdf') !== -1) {
          // PDF新开页面看
          window.open(url);
          return;
        }
        this.bigImg = url;
      },
      uplistId() {
        // 将ID传给后端
        var idStr = this.imgListId.join(',');
        this.orderSubmitApi({
          order_id: this.orderData.order_id,
          information: idStr
        })
      },
      orderSubmitApi(obj) {
        this.orderSubmit(obj).then((res) => {
          if (res.status === 'error') {
            return false;
          }
        })
      },
      // 去重
      uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      },
      goOfflineTalks() {
        // 没登陆 下单去登陆
        if (!(this.hasLogin && this.token)) {
          this.$router.push({
            path: '/user/login'
          })
          return;
        }
        var type;
        // 判断支付方式
        if (!this.patternPay) {
          toast(this.$t('lang.common.selectpay'))
          return;
        }
        if (this.patternPay === 'zhifubao') {
          type = 1;
        }else if (this.patternPay === 'weixin') {
          type = 2;
        }else if (this.patternPay === 'paypal') {
          type = 3;
        }else if (this.patternPay === 'vipCar') {
          type = 4;
        }else if (this.patternPay === 'youhuima') {
          type = 5;
        }
        this.payPc({
          _this: this,
          type: type,
          order_id: this.$route.query.id,
          payedType: 'service'
        })
      },
      offOrder() {
        if (this.$route.query.state === 'details') {
          // 弹出取消原因 弹窗
          this.$emit('show-model', true);
        } else {
          this.orderCancelCommon({
            order_id: this.orderData.order_id,
            str: 'service',
            _this: this
          });
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../../assets/less/common";
  .service-confirm {
    .upmaterial-list {
      display: block;
      overflow: hidden;
      margin-bottom: 20px;
      li {
        width: 210px;
        height: 270px;
        float: left;
        margin-right: 20px;
        margin-bottom:20px;
        background: #999999 center center no-repeat;
        background-size: 100%;
        position: relative;
        img{
          max-height: 100%;
          max-width: 100%;
        }
        i {
          position: absolute;
          right: 5px;
          top: 5px;
          line-height: 1;
          color: #333333 !important;
          font-weight: 700;
        }
      }
    }
    .upload-text {
      font-size: 28px;
      color: #333;
      span {
        color: #dd7116;
      }
    }
    .order-item {
      p {
        margin-bottom: 10px;
      }
      .title {
        margin-bottom: 20px;
      }
    }
    .order-item-in {
      position: relative;
      margin-bottom: 20px;
      p{
        margin-right: 140px;
      }
      .sl {
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
        text-align: center;
        font-size: 0;
        div {
          vertical-align: top;
          display: inline-block;
          font-size: 24px;
          width: 100px;
          height: 50px;
          line-height: 50px;
          background: #dd7116;
          margin-right: 16px;
        }
      }
    }
  }
</style>
