<template>
  <div class="appointment-service appt-common">
    <img class="banner-img" src="~/assets/img/appt-service.jpg" alt="">
    <div class="content">
      <div class="inner-block">
        <div class="title">{{ $t('lang.book.appt.servicetext') }}</div>
        <div class="check-box">
          <div class="label" style="margin-bottom:5px;">
            <i class="iconfont icon-qiapianxingshi"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.service.item1') }}</span>
          </div>
          <div class="box" @click="choseCategory">
            <span :class="{'on': categoryValue}">{{ categoryValue || $t('lang.book.appt.service.item1_placeholder') }}</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-leixing"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.service.item2') }}</span>
          </div>
          <div class="box" @click="choseSecond">
            <span :class="{'on': secondValue}">{{ secondValue || $t('lang.book.appt.service.item2_placeholder') }}</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <div class="check-box">
          <div class="label">
            <i class="iconfont icon-gongzuozheng"></i>
            <span class="line"></span>
            <span>{{ $t('lang.book.appt.service.item3') }}</span>
          </div>
          <div class="box" @click="choseList">
            <span :class="{'on': listValue}">{{ listValue || $t('lang.book.appt.service.item3place') }}</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <template v-if="listValue && material.length > 0">
          <div class="steps">
            <p class="step-label">{{ $t('lang.book.appt.service.offerneed') }}</p>
            <div class="in-step" v-for="(item, index) in material" :key="index">
              <div>
                <p>{{ item.title }}</p>
                <p>{{ item.intro }}</p>
              </div>
              <a class="examples" href="javascript:;" @click="showExample(item.exp_img)">{{ $t('lang.book.appt.service.lieh') }}</a>
            </div>
          </div>
          <div class="tips">
            <p>{{ $t('lang.book.appt.service.itemneed') }} <span>{{ needTimes }}</span> {{ $t('lang.book.appt.service.itemneed2') }}</p>
            <p>{{ $t('lang.book.appt.service.yuji') }}：<span>{{ completedDate }}</span></p>
          </div>
          <price :price="price" @on-click="submit"></price>
        </template>
      </div>
    </div>
    <mt-actionsheet :actions="category" v-model="showCategory"></mt-actionsheet>
    <mt-actionsheet :actions="secondList" v-model="showSecond"></mt-actionsheet>
    <mt-actionsheet :actions="list" v-model="showList"></mt-actionsheet>

    <div class="view-img" v-if="bigImg" :style="'background-image: url(' + bigImg + ')'">
      <span @click="bigImg = ''">{{ $t('lang.btn.off2') }}</span>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState,mapMutations} from 'vuex'
  import price from '../../../components/appt/price'
  import {addDate} from '../../../assets/js/tool'
  import md5 from 'md5';
  export default {
    components: {
      price
    },
    data() {
      return {
        category: [],
        showCategory: false,
        categoryValue: '',

        secondList: [],
        showSecond: false,
        secondValue: '',

        list: [],
        showList: false,
        listId: '',
        listValue: '',

        material: [],
        needTimes: '',
        completedDate: '',

        price: 0,
        bigImg: ''
      }
    },
    computed: {
      ...mapState(['webToken']),
    },
    head(){
      return {
        title:this.$t('lang.title.bookServices')
      }
    },
    watch: {
      categoryValue() {
        this.secondValue = '';
        this.listValue = '';
      },
      secondValue() {
        this.listValue = '';
      }
    },
    mounted() {
      this.getCategory();
      if (!this.webToken) {
        this.SET_WEB_TOKEN(md5(Math.random()));
      }
    },
    methods: {
      ...mapActions([
        'serviceCategory', 'serviceSecond', 'serviceList', 'serviceOrderDown',
      ]),
      ...mapMutations([
        'SET_WEB_TOKEN'
      ]),
      choseCategory() {
        if (this.category.length <= 0) {
          return false
        }
        this.showCategory = true;
      },
      choseSecond() {
        if (this.secondList.length <= 0) {
          return false
        }
        this.showSecond = true;
      },
      choseList() {
        if (this.list.length <= 0) {
          return false
        }
        this.showList = true;
      },
      getCategory() {
        this.serviceCategory().then(res => {
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
                this.getSecond(val.id);
              }
            })
          })
        })
      },
      getSecond(id) {
        if (!id) {
          return false
        }
        this.serviceSecond({id: id}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.secondList = [];
          (res.data || []).forEach(item => {
            this.secondList.push({
              id: item.id,
              name: item.title,
              method: val => {
                this.secondValue = val.name;
                this.getList(val.id);
              }
            })
          })
        })
      },
      getList(id) {
        if (!id) {
          return false
        }
        this.serviceList({id: id}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.list = [];
          (res.data || []).forEach(item => {
            this.list.push({
              id: item.id,
              name: item.title,
              price: item.price,
              information: item.information,
              needTimes: item.needtimes,
              method: val => {
                this.listValue = val.name;
                this.listId = val.id;
                this.price = Number(val.price);
                this.material = val.information;
                this.needTimes = val.needTimes;
                this.completedDate = addDate(this.needTimes);
              }
            })
          })
        })
      },
      submit() {
        this.serviceOrderDown({id: this.listId}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.$router.push('/book/order/service?id=' + res.data.order_id);
        })
      },
      showExample(url) {
        if (!url) {
          return false;
        }
        this.bigImg = url;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../../assets/less/common";

  .appointment-service {
    background: #202020 url("../../../assets/img/common-bg.jpg") top center no-repeat;
    background-size: cover;
    .banner-img {
      width: 100%;
    }
    .content {
      color: #fff;
      .title {
        margin: -140px 0 110px;
        font-size: 60px;
      }
      .steps {
        .step-label {
          margin: 70px 0 40px;
        }
        .in-step {
          margin-bottom: 42px;
          overflow: hidden;
          > div {
            float: left;
          }
          .examples {
            float: right;
            display: block;
            width: 90px;
            height: 48px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            background: @themColor;
          }
        }
      }
      .tips {
        color: #d9d9d9;
        margin: 60px 0 0 10px;
        span {
          color: @themColor;
        }
      }
    }
  }
</style>
