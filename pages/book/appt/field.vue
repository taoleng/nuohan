<template>
  <div class="field-content appt-common" :class="{'room': type === 'room', 'office': type === 'office'}">
    <template v-if="type ==='office'">
      <img src="../../../assets/img/appt-office.jpg" class="img">
    </template>
    <template v-else-if="type ==='room'">
      <img src="../../../assets/img/appt-room.jpg" class="img">
    </template>
    <div class="inner-block">
      <div class="title field-title">{{ title }}</div>
      <div class="field-main">
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-dingwei"></i>
            <span class="line"></span>
            <span v-if="type === 'office'">{{ $t('lang.book.appt.office.item1') }}</span>
            <span v-else>{{ $t('lang.book.appt.office.item1') }}</span>
          </div>
          <div class="city-wrapper">
            <div class="box" @click="choseAddress">
              <span :class="{'on': addressValue}">{{ addressValue || $t('lang.book.appt.office.placecoun') }}</span>
              <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
            </div>
            <div class="box" @click="choseCity">
              <span :class="{'on': cityValue}">{{ cityValue || $t('lang.book.appt.office.placecity') }}</span>
              <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
            </div>
            <div class="box" @click="choseList">
              <span v-if="type === 'office'" :class="{'on': listValue}">{{ listValue || $t('lang.book.appt.office.placeoffic') }}</span>
              <span v-else :class="{'on': listValue}">{{ listValue || $t('lang.book.appt.office.placemeeting') }}</span>
              <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
            </div>
          </div>
        </div>
        <div class="check-box" v-if="type === 'office'">
          <div class="label">
            <i class="iconfont icon-qiapianxingshi"></i>
            <span class="line"></span>
            <!--您想租什么样的房子-->
            <span>{{ $t('lang.book.appt.office.item2') }}</span>
          </div>
          <div class="check-item-box">
            <div class="item itemfd" v-for="item in leaseTypeList" :key="item.id" :class="{'on': leaseType === item.id}"
                 @click="leaseType = item.id">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="check-box" v-else>
          <div class="label">
            <i class="iconfont icon-qiapianxingshi"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.office.placemeetingsize') }}</span>
          </div>
          <div class="check-item-box">
            <div class="item item-box-size" v-for="item in sizeTypeList" :key="item.id" :class="{'on': sizeId === item.id}"
                 @click="sizePrice = item.price,sizeId = item.id">
              <span>{{ computedSize(item.size) }}<br>({{ item.name }})</span>
            </div>
          </div>
        </div>
        <div class="num-box" v-if="type === 'office'">
          <div class="check-box station">
            <div class="label">
              <i class="iconfont icon-gongwei"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.office.item3') }}</span>
            </div>
            <num @on-change="onStationNumChange"></num>
          </div>
          <div class="check-box">
            <div class="label">
              <i class="iconfont icon-shijian"></i>
              <span class="line"></span>
              <span>{{ $t('lang.book.appt.office.item4') }}</span>
            </div>
            <num :default="timeNum" @on-change="onTimeChange"></num>
          </div>
        </div>
        <date-select v-if="type !== 'office'" @on-ok="getPrice" ref="dateSelect"></date-select>
        <price :price="price" v-model="isTy" @on-click="submit"></price>
      </div>
    </div>

    <mt-actionsheet :actions="address" v-model="showAddress"></mt-actionsheet>

    <mt-actionsheet :actions="city" v-model="showCity"></mt-actionsheet>

    <mt-actionsheet :actions="list" v-model="showList"></mt-actionsheet>
  </div>
</template>

<script>
  import {mapActions,mapState,mapMutations} from 'vuex'
  import price from '../../../components/appt/price'
  import num from '../../../components/appt/num'
  import dateSelect from '../../../components/appt/dateSelect'
  import {toast} from '../../../assets/js/tool'
  import md5 from 'md5';
  export default {
    components: {
      price, num, dateSelect
    },
    data() {
      return {
        isTy: false,
        type: '',

        address: [],
        showAddress: false,
        addressValue: '',

        city: [],
        showCity: false,
        cityValue: '',

        list: [],
        showList: false,
        listValue: '',
        listId: '',

        leaseTypeList: [],
        leaseType: '',
        stationNum: 0,
        timeNum: 0,

        sizeTypeList: [],
        sizePrice: '',
        sizeId:"",

        startTime: '',
        endTime: '',
        timeDiff: '',

        unitPrice: 0,
        discount:[]
      }
    },
    computed: {
      ...mapState(['webToken']),
      title() {
        if (this.type === 'office') {
          return this.$t('lang.title.bookSpaceOffice');
        } else {
          return this.$t('lang.title.bookSpaceRoom');
        }
      },
      price() {
        if (this.type === 'office') {
          let p = Number(this.unitPrice) * Number(this.timeNum || 1);
          for (var i=0;i<this.discount.length;i++){
            if ( this.discount[i].month <= this.timeNum ) {
              p = p * this.discount[i].discount;
              break;
            }
          }
          return p;
        } else {
          return Number(this.sizePrice) * Number(this.timeDiff);
        }
      }
    },
    head () {
      return {
        title: this.title
      }
    },
    watch: {
      addressValue() {
        this.cityValue = '';
        this.listValue = '';
        this.init();
      },
      cityValue() {
        this.listValue = '';
        this.init();
      },
      listValue() {
        // this.init();
      }
    },
    created(){
      this.type = this.$route.query.t;
      this.officeDiscount().then(res=>{
        if(res.status === 'error'){
          return false
        }
        this.discount = res.data;
        this.discount = this.discount.sort((a,b)=>b.month-a.month);
      })
    },
    mounted() {
      this.getAddress();
      if (!this.webToken) {
        this.SET_WEB_TOKEN(md5(Math.random()));
      }
    },
    methods: {
      ...mapActions([
        'officeAddress', 'officeList', 'officeOrderDown','officeDiscount',
        'meetingroomAddress', 'meetingroomList', 'meetingroomOrderDown',
      ]),
      ...mapMutations(['SET_WEB_TOKEN']),
      init() {
        this.leaseType = '';
        this.sizePrice = '';
        this.sizeId = '';
        this.stationNum = 0;
        // this.timeNum = 0;
        if(this.type === 'room'){
          this.$refs.dateSelect.init();
        }
        this.startTime = '';
      },
      getAddress() {
        let fn="";
        if(this.type === 'room'){
          fn ="meeting" +this.type + 'Address';
        }else{
          fn = this.type + 'Address';
        }
        if (!this[fn]) {
          return false;
        }
        this[fn]().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.address = [];
          (res.data || []).forEach((item, index) => {
            this.address.push({
              id: index,
              name: item.country,
              method: val => {
                this.addressValue = val.name;
                this.getCity(val.id, res.data);
              }
            })
          })
        })
      },
      getCity(index, data) {
        if (!data[index] && data[index].city) {
          return false;
        }
        this.city = [];
        (data[index].city || []).forEach(item => {
          this.city.push({
            name: item,
            method: val => {
              this.cityValue = val.name;
              this.getList();
            }
          })
        })
      },
      getList() {
        let fn="";
        if(this.type === 'room'){
          fn ="meeting" +this.type + 'List';
        }else{
          fn = this.type + 'List';
        }
        if (!this[fn]) {
          return false;
        }
        this[fn]({
          country: this.addressValue,
          city: this.cityValue
        }).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.list = [];
          (res.data || []).forEach((item, index) => {
            if (this.type === 'office') {
              this.list.push({
                index: index,
                id: item.id,
                name: item.title,
                price: item.price,
                method: val => {
                  this.listId = val.id;
                  this.listValue = val.name;
                  this.unitPrice = val.price;
                  this.getLeaseTypeList(val.index, res.data);
                }
              })
            } else {
              this.list.push({
                index: index,
                id: item.id,
                name: item.title,
                method: val => {
                  this.listId = val.id;
                  this.listValue = val.name;
                  this.getSizeTypeList(val.index, res.data);
                }
              })
            }
          })
        })
      },
      getLeaseTypeList(index, data) {
        if (!data[index] && data[index].city) {
          return false;
        }
        this.leaseTypeList = [];
        (data[index].type || []).forEach(item => {
          this.leaseTypeList.push({
            id: item,
            name: this.computedType(item)
          })
        })
      },
      getSizeTypeList(index, data) {
        if (!data[index] && data[index].city) {
          return false;
        }
        this.sizeTypeList = [];
        (data[index].size || []).forEach(item => {
          this.sizeTypeList.push({
            id: item.id,
            name: item.people,
            price: item.price,
            size:item.size
          })
        })
      },
      computedType(item) {
        if (item === '1') {
          return this.$t('lang.book.appt.office.type1');
        } else if (item === '2') {
          return this.$t('lang.book.appt.office.type2');
        } else {
          return this.$t('lang.book.appt.office.type3');
        }
      },
      computedSize(item) {
        if (item === 1) {
          return this.$t('lang.common.typearr')[1];
        } else if (item === 2) {
          return this.$t('lang.common.typearr')[2];
        } else {
          return this.$t('lang.common.typearr')[3];
        }
      },
      choseAddress() {
        if (this.address.length <= 0) {
          return false;
        }
        this.showAddress = true;
      },
      choseCity() {
        if (this.city.length <= 0) {
          return false;
        }
        this.showCity = true;
      },
      choseList() {
        if (this.list.length <= 0) {
          return false;
        }
        this.showList = true;
      },
      onStationNumChange(val) {
        this.stationNum = val;
      },
      onTimeChange(val) {
        this.timeNum = val;
      },
      submit() {
        if(!this.addressValue){
          toast(this.$t('lang.book.appt.office.placecoun'))
          return false;
        }
        if(!this.cityValue){
          toast(this.$t('lang.book.appt.office.placecity'))
          return false;
        }
        if(!this.isTy){
          toast(this.$t('lang.model.model1.clause'))
          return false;
        }

        let fn="";
        if(this.type === 'room'){
          fn ="meeting" +this.type + 'OrderDown';
        }else{
          fn = this.type + 'OrderDown';
        }
        if (!this[fn]) {
          return false;
        }
        let params = {};
        if (this.type === 'office') {
          if(!this.listValue){
            toast(this.$t('lang.book.appt.office.placeoffic'))
            return false;
          }
          if(!this.leaseType){
            toast(this.$t('lang.book.appt.office.placeofficH'))
            return false;
          }
          params = {
            id: this.listId,
            type: this.leaseType,
            station: this.stationNum,
            times: this.timeNum || 1
          };
        } else {
          if(!(this.startTime && this.endTime)){
            toast(this.$t('lang.book.appt.office.placeofficT'))
            return false;
          }
          params = {
            size_id: this.sizeId,
            start: this.startTime,
            end: this.endTime
          }
        }
        this[fn](params).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.$router.push('/book/order/'+this.$route.query.t+'?id=' + res.data.order_id);
        })
      },
      getPrice(obj) {
        this.startTime = obj.start;
        this.endTime = obj.end;
        this.timeDiff = obj.diff;
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";

  .field-content {
    padding-bottom: 0!important;
    .img{
      width: 100%;
    }
    .inner-block{
      margin: -160px 0 0;
    }
    .field-title {
      font-size: 60px;
      color: #fff;
      margin: 0 40px 70px!important;
    }
    .label{
      margin-bottom: 10px;
    }
    .field-main{
      padding: 50px 50px;
      /*background: #282828;*/
      min-height: 70vh;
      background:url("../../../assets/img/common-bg.jpg") top center no-repeat;
      background-size: cover;
    }
    color: #fff;
    background:#282828;
    .title {
      margin: 0px 0 50px;
    }
    .city-wrapper {
      .box {
        width: 100%;
        font-size: @baseFont;
        box-sizing: border-box;
        text-align: center;
        height:80px;
        margin-bottom: 50px;
        line-height: 80px;
        &:last-child {
          margin: 0;
        }
        .drop{
          height:80px;
          line-height: 85px;
        }
      }
    }
    .num-box {
      .check-box {
        display: inline-block;
        &.station {
          margin-right: 50px;
        }
      }
    }
    .check-item-box{
      .item.itemfd{
        width: 30%;
        margin-right: 3%;
        height:70px;
        line-height: 70px;
      }
    }
  }
</style>
