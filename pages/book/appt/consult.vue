<template>
  <div class="consult-content appt-common">
    <div class="appt-content" style="padding-top: 0;">
      <template v-if="type ==='talks'">
        <img src="../../../assets/img/appt-buss.jpg" class="img">
      </template>
      <template v-else-if="type ==='meeting'">
        <img src="../../../assets/img/appt-online.jpg" class="img">
      </template>
      <template v-else-if="type ==='question'">
        <img src="../../../assets/img/appt-question.jpg" class="img">
      </template>
      <div class="inner-block">
        <div class="title">{{ title }}</div>
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-qiapianxingshi"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.meeting.item1') }}</span>
          </div>
          <div class="box" @click="choseCategory">
            <span :class="{'on': categoryValue}">{{ categoryValue || $t('lang.book.appt.meeting.item1place') }}</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-muluxiangmu"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.meeting.item2') }}</span>
          </div>
          <div class="box" @click="choseList">
            <span :class="{'on': listValue}">{{ listValue || $t('lang.book.appt.meeting.item2place') }}</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-shuoming"></i>
            <span class="line"></span>
            <span >{{ $t('lang.book.appt.meeting.shuoming') }}</span>
            <template v-if="type === 'question'">
              <span class="right" @click="cShow = true">{{ $t('lang.book.appt.question.suggest') }} <i class="iconfont icon-shuoming"></i></span>
            </template>
          </div>
          <mt-field :placeholder="$t('lang.book.appt.meeting.shuoming')" type="textarea" rows="4"
                    v-model="question"></mt-field>
        </div>
        <template v-if="$route.query.t !== 'question'">
          <date-select @on-ok="getPrice" ref="dateSelect"></date-select>
        </template>
        <template v-if="type === 'talks'">
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-dingwei"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.talks.item1') }}</span>
            </div>
            <div class="box" @click="chosePlace">
              <span :class="{'on': placeValue}">{{ placeValue || $t('lang.book.appt.talks.item1place') }}</span>
              <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
            </div>
          </div>
        </template>
        <template v-else-if="type === 'meeting'">
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-goutong"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.meeting.linkup') }}</span>
            </div>
            <div class="check-item-box">
              <div class="item" :class="{'on': contactType === 'weixin'}" @click="contactType = 'weixin'">
                <i class="iconfont icon-weixin"></i>
                <span>{{ $t('lang.book.appt.meeting.weixin') }}</span>
              </div>
              <div class="item" :class="{'on': contactType === 'skype'}" @click="contactType = 'skype'">
                <i class="iconfont icon-skype"></i>
                <span>Skype</span>
              </div>
            </div>
          </div>
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-wo"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.meeting.linkup') }}</span>
            </div>
            <mt-field :placeholder="$t('lang.book.appt.meeting.relation')" v-model="account"></mt-field>
          </div>
        </template>
        <template v-else-if="type === 'question'">
          <div class="check-box">
            <div class="label">
              <span style="margin-bottom: 10px;">{{ $t('lang.book.appt.question.resource1') }}<br>{{ $t('lang.book.appt.question.resource2') }}</span>
            </div>
            <div class="img-box">
              <multiple-upload @on-load="loadImg"></multiple-upload>
            </div>
          </div>
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-yuyan"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.question.item2') }}</span>
            </div>
            <div class="check-item-box">
              <div class="item" :class="{'on': langType === 'cn'}" @click="langType = 'cn'">
                <span>中文</span>
              </div>
              <div class="item" :class="{'on': langType === 'en'}" @click="langType = 'en'">
                <span>English</span>
              </div>
            </div>
          </div>
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-youxiang"></i>
              <span class="line"></span>
              <span> {{ $t('lang.book.appt.question.email') }}</span>
            </div>
            <mt-field :placeholder="$t('lang.book.appt.question.email')" v-model="email"></mt-field>
          </div>
        </template>
        <price
          :price="price"
          @on-click="submit"
          v-model="isTy"
        ></price>
      </div>
    </div>
    <mt-actionsheet :actions="category" v-model="showCategory"></mt-actionsheet>

    <mt-actionsheet :actions="list" v-model="showList"></mt-actionsheet>

    <mt-actionsheet :actions="place" v-model="showPlace"></mt-actionsheet>
    <c-pop :cShow="cShow" :cTitle="$t('lang.book.appt.question.suggest')" :cTitleIconShow="true" cTitleIcon="icon-xianzhi" @cPopClose="cPopClose">
      <div class="text" :v-html="$t('lang.book.appt.consult.tip')"></div>
      <div class="pop-btn" @click="cBtn">{{ $t('lang.btn.off2') }}</div>
    </c-pop>
  </div>
</template>

<script>
  import {mapActions,mapState,mapMutations} from 'vuex'
  import multipleUpload from '../../../components/appt/multipleUpload'
  import price from '../../../components/appt/price'
  import {isEmail, toast} from '../../../assets/js/tool'
  import dateSelect from '../../../components/appt/dateSelect'
  import md5 from 'md5';
  import cPop from '../../../components/common/c-pop'
  export default {
    components: {
      multipleUpload, price, dateSelect,cPop
    },
    data() {
      return {
        isTy: false,
        type: '',
        showCategory: false,
        category: [],
        categoryValue: '',

        showList: false,
        list: [],
        listValue: '',
        listId: '',

        showPlace: false,
        place: [],
        placeValue: '',
        placeId: '',

        question: '',

        startTime: '',
        endTime: '',

        contactType: '',
        account: '',

        unitPrice: 0,
        price: 0,

        fileList: [],
        langType: '',
        email: '',

        cShow:false,
      }
    },
    computed: {
      ...mapState(['webToken']),
      title() {
        if (this.type === 'talks') {
          return this.$t('lang.title.bookConTalks');
        } else if (this.type === 'meeting') {
          return this.$t('lang.title.bookConMeet');
        } else {
          return this.$t('lang.title.bookConQuestion');
        }
      }
    },
    head () {
      return {
        title: this.title
      }
    },
    watch: {
      categoryValue() {
        this.listValue = '';
        this.init();
      },
      listValue() {
        this.init();
      }
    },
    created(){
      this.type = this.$route.query.t;
    },
    mounted() {
      this.getCategory();
      if (!this.webToken) {
        this.SET_WEB_TOKEN(md5(Math.random()));
      }
    },
    methods: {
      ...mapActions([
        'talksCategory', 'talksList', 'talksOrderDown',
        'meetingCategory', 'meetingList', 'meetingOrderDown',
        'questionCategory', 'questionList', 'questionOrderDown',
        'questionImgUpload',
      ]),
      ...mapMutations(['SET_WEB_TOKEN']),
      init() {
        this.question = '';
        this.placeValue = '';
        this.contactType = '';
        this.account = '';
        this.fileList = [];
        this.langType = '';
        this.email = '';
        if(this.type !=='question'){
          this.$refs.dateSelect.init();
        }
        this.startTime = '';
      },
      getCategory() {
        let fn = this.type + 'Category';
        if (!this[fn]) {
          return false;
        }
        this[fn]().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.category = [];
          (res.data || []).forEach(item => {
            this.category.push({
              id: item.id,
              name: item.title,
              method: val => {
                this.categoryValue = val.name;
                this.getList(val.id);
              }
            })
          })
        });
      },
      getList(id) {
        if (!id) {
          return false
        }
        let fn = this.type + 'List';
        if (!this[fn]) {
          return false;
        }
        this[fn]({id: id}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.list = [];
          (res.data || []).forEach(item => {
            this.list.push({
              id: item.id,
              name: item.title,
              place: item.place,
              price: item.price,
              method: val => {
                this.listId = val.id;
                this.listValue = val.name;
                this.unitPrice = val.price;
                if (this.type === 'talks') {
                  this.getPlaceList(val.place);
                } else if (this.type === 'question') {
                  this.price = Number(val.price);
                }
              }
            })
          })
        })
      },
      getPlaceList(placeList) {
        this.place = [];
        (placeList || []).forEach(item => {
          this.place.push({
            id: item.id,
            name: item.title,
            map: item.map_link,
            method: val => {
              this.placeId = val.id;
              this.placeValue = val.name;
            }
          })
        })
      },
      choseCategory() {
        if (this.category.length <= 0) {
          return false
        }
        this.showCategory = true;
      },
      choseList() {
        if(!this.categoryValue){
          toast(this.$t('lang.book.appt.meeting.item1place'))
          return false
        }
        if (this.list.length <= 0) {
          return false
        }
        this.showList = true;
      },
      chosePlace() {
        if(!this.listValue){
          toast(this.$t('lang.book.appt.meeting.item2place'))
          return false
        }
        if (this.place.length <= 0) {
          return false
        }
        this.showPlace = true;
      },
      getPrice(obj) {
        this.startTime = obj.start;
        this.endTime = obj.end;
        this.price = Number(obj.diff) * Number(this.unitPrice);
      },
      submit() {
        if(!this.categoryValue){
          toast(this.$t('lang.book.appt.meeting.item1place'))
          return false
        }
        if(!this.listValue){
          toast(this.$t('lang.book.appt.meeting.item2place'))
          return false
        }
        if(!this.question){
          toast(this.$t('lang.book.appt.consult.description'))
          return false
        }
        if (!this.isTy) {
          toast(this.$t('lang.model.model1.clause'));
          return false;
        }
        let params = {};
        if (this.type === 'talks') {
          if(!this.placeValue){
            toast(this.$t('lang.book.order.talks.side'))
            return false
          }
          if(!(this.startTime && this.endTime)){
            toast(this.$t('lang.book.appt.office.placeofficT'))
            return false
          }
          params = {
            id: this.listId,
            question: this.question,
            start: this.startTime,
            end: this.endTime,
            place_id: this.placeId
          };
          this.submitOrder(params);
        } else if (this.type === 'meeting') {
          if(!(this.startTime && this.endTime)){
            toast(this.$t('lang.book.appt.office.placeofficT'))
            return false
          }
          if (!this.contactType) {
            toast(this.$t('lang.placeholder.goutong'));
            return false;
          }
          if (!this.account) {
            toast(this.$t('lang.placeholder.accountS'));
            return false;
          }
          params = {
            id: this.listId,
            question: this.question,
            start: this.startTime,
            end: this.endTime,
            type: this.contactType,
            account: this.account
          };
          this.submitOrder(params);
        } else if (this.type === 'question'){
          if (!this.langType) {
            toast(this.$t('lang.placeholder.yuyan'));
            return false;
          }
          if (!isEmail(this.email)) {
            toast(this.$t('lang.placeholder.emailError'));
            return false;
          }
          params = {
            id: this.listId,
            question: this.question,
            lang: this.langType,
            email: this.email,
            imgs: "",
          };
          if(this.fileList.length > 0){
            let uploadId = [];
            (this.fileList || []).forEach(item => {
              let data = new FormData();
              data.append('file', item, 'file_' + Date.parse(new Date()) + '.jpg');
              this.questionImgUpload(data).then(res => {
                if (res.status === 'error') {
                  return false;
                }
                if (res.data.id) {
                  uploadId.push(res.data.id);
                  if (uploadId.length === this.fileList.length) {
                    params.imgs = uploadId.join(',');
                    this.submitOrder(params);
                  }
                }
              });
            });
          }else {
            this.submitOrder(params);
          }

        }
      },
      submitOrder(params) {
        let fn = this.type + 'OrderDown';
        if (!this[fn]) {
          return false;
        }
        this[fn](params).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.$router.push('/book/order/' + this.type + '?id=' + res.data.order_id);
        })
      },
      loadImg(uploadList) {
        this.fileList = uploadList || [];
      },
      cPopClose(bool){
        this.cShow = bool ;
      },
      cBtn(){//评价完成之后查看详情
        this.cShow = false ;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../../assets/less/common";
  .consult-content {
    background:#202020 url("../../../assets/img/common-bg.jpg");
    background-size:cover;
    .img{
      width: 100%;
    }
    .inner-block{
      margin-top: -160px;
    }
    .title {
      font-size: 60px;
      color: #fff;
      margin-bottom: 110px;
    }
    .check-item-box{
      .item{
        color: #fff;
      }
    }
    .right{
      float: right;
      i{
        margin-top: -4px;
      }
    }
  }

</style>
