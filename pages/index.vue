<template>
  <section class="home">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <!--:style="'background:url('+data.first.bg+') no-repeat top center;'"-->
        <div class="page1 swiper-slide" :style="'background:url('+data.first.bg+') no-repeat top center;'">
          <div class="aaaa">123</div>
          <div class="main-info" v-if="data.first">
            <p class="point">{{ data.first.title }}</p>
            <p class="sub">{{ data.first.subtitle }}</p>
            <a class="view-more pay-btn" :href="data.first.links"><i></i><span>{{ $t('lang.btn.lookmore') }}</span></a>
          </div>
        </div>
        <div class="page2 swiper-slide" :style="'background:url('+data.second.bg+') no-repeat top center;'">
          <div class="main-info" v-if="data.second">
            <p class="title">{{ data.second.subtitle }}</p>
            <p class="big-title">{{ data.second.title }}</p>
            <img :src="data.second.img" :alt="data.second.subtitle">
            <div class="info">{{ data.second.intro }}</div>
            <a class="view-more pay-btn" :href="data.second.links"><i></i><span>{{ $t('lang.btn.lookmore') }}</span></a>
          </div>
        </div>
        <div class="page3 swiper-slide" :style="'background:url('+data.third.bg+') no-repeat top center;'">
          <div class="main-info" v-if="data.third">
            <p class="title">{{ data.third.title }}</p>
            <div class="sub-title">
              <img src="~/assets/img/title3.png" :alt="data.third.title">
              <span>{{ data.third.subtitle }}</span>
            </div>
            <div class="feature">
              <div class="items" :class="{'on':selectA[0].flag}" @click="select(0)">
                <div class="bg">
                  <i class="iconfont icon-gongsixinxi-"></i>
                  <span class="line"></span>
                  <p class="title">{{ data.third.middle.title }}</p>
                </div>
                <p class="intro">{{ data.third.middle.intro }}</p>
                <a class="view-more pay-btn" :href="data.third.middle.links"><i></i><span>{{ $t('lang.btn.lookmore') }}</span></a>
              </div>
              <div class="items" :class="{'on':selectA[1].flag}" @click="select(1)">
                <div class="bg">
                  <i class="iconfont icon-zhuti_tiaosepan"></i>
                  <span class="line"></span>
                  <p class="title">{{ data.third.right.title }}</p>
                </div>
                <p class="intro">{{ data.third.right.intro }}</p>
                <a class="view-more pay-btn" :href="data.third.right.links"><i></i><span>{{ $t('lang.btn.lookmore') }}</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="page4 swiper-slide">
          <div class="main-info" v-if="data.fourth">
            <p class="title">{{ $t('lang.home.look') }}</p>
            <div class="select-wrapper">
              <div class="select-box" @click="showCountryList">
                <span>{{ country }}</span>
                <i class="iconfont icon-tubiaozhizuo-"></i>
              </div>
              <div class="select-box" @click="showCityList">
                <span>{{ city }} </span>
                <i class="iconfont icon-tubiaozhizuo-"></i>
              </div>
            </div>
            <div class="img-wrapper" v-if="data.fourth">
              <div class="img-box" v-for="(item, index) in cityImg" :key="index" @click="light(item)">
                <div class="img" :style="'background:url('+item.img+') no-repeat center center;'"></div>
                <div v-if="city !== item.city" class="bg"></div>
                <div class="text">
                  <p class="country">{{ item.country }}</p>
                  <p class="city">{{ item.city }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page5 swiper-slide">
          <div v-if="data.fifth">
            <p class="slogan">{{ data.fifth.slogan }}</p>
            <div class="icon-wrap">
              <div class="icon_main" v-for="(item, index) in data.fifth.list" :key="index" v-if="item.title">
                <i :class="'icon icon'+index"></i>
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
          <c-foot></c-foot>
        </div>
      </div>
      <div class="swiper-pagination" v-show="paginationShow" :class="'pagination' + pageIndex"></div>
    </div>
    <mt-actionsheet :actions="actions1" v-model="showCountry"></mt-actionsheet>
    <mt-actionsheet :actions="actions2" v-model="showCity"></mt-actionsheet>
  </section>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import cFoot from '../components/common/cFoot'

  export default {
    components: {
      cFoot
    },
    data() {
      return {
        data: {},
        actions1: [],
        actions2: [],
        showCountry: false,
        showCity: false,
        country: '',
        city: '',
        paginationShow: true,
        pageIndex: 0,
        selectA : [
          {flag:false},
          {flag:true}
        ],
        self : this
      }
    },
    head(){
      return {
        title:this.$t('lang.title.home')
      }
    },
    async asyncData({store}) {
      let res = await store.dispatch('home');
      return {
        data: res.data || {}
      }
    },
    computed: {
      ...mapState(['homePageIndex']),
      swiperOption() {
        let _this = this;
        return {
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          on: {
            slideChange() {
              _this.pageChange(this.activeIndex);
            }
          }
        }
      },
      cityImg() {
        let result = [];
        (this.data.fourth || []).forEach(item => {
          if (item.country === this.country) {
            result.push(item);
          }
        });
        return result.slice(0, 4);
      }
    },
    mounted() {
      this.cityInfoHandler();
      console.log(this)
    },
    layout: 'home',
    methods: {
      ...mapMutations(['IS_MENU_SHOW', 'IS_THEME_COLOR', 'SET_HOME_PAGE_INDEX']),
      ...mapActions(['home']),
      select(num){
        this.selectA.map( item => { item.flag = true})
        this.selectA[num].flag = false;
      },
      cityInfoHandler() {
        let cityList = this.data.fourth || [];
        let flag = false;
        (cityList || []).forEach((item, index) => {
          flag = false;
          if (index >= 0) {
            this.actions1.forEach(sub => {
              if (sub.name === item.country) {
                flag = true;
              }
            })
          }
          if (!flag) {
            this.actions1.push({
              name: item.country,
              method: val => {
                this.country = val.name;
                this.getCityList(this.country);
              }
            });
          }
        });
        this.country = this.actions1[0].name;
        this.getCityList(this.country);
      },
      getCityList(country) {
        let cityList = this.data.fourth || [];
        this.actions2 = [];
        (cityList || []).forEach(item => {
          if (item.country === country) {
            this.actions2.push({
              name: item.city,
              method: val => {
                this.city = val.name;
              }
            });
          }
        });
        this.city = this.actions2[0].name;
      },
      pageChange(index) {
        if (index === 1 || index === 3) {
          this.IS_THEME_COLOR(true);
        } else {
          this.IS_THEME_COLOR(false);
        }
        this.pageIndex = index;
        this.paginationShow = index !== 4;
      },
      showCountryList() {
        if (this.actions1.length <= 0) {
          return false;
        }
        this.showCountry = true;
      },
      showCityList() {
        if (this.actions2.length <= 0) {
          return false;
        }
        this.showCity = true;
      },
      light(item){
        this.city = item.city;
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import "../assets/less/common";
  .aaaa{
    width: 750px;
  }
  .home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .swiper-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .swiper-pagination-bullet {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        margin-bottom: 48px;
        opacity: 1;
      }
      .swiper-pagination-bullet:last-child {
        display: none!important;
        margin-bottom: 0;
      }
      .swiper-pagination-bullet-active {
        background: #dd7116!important;
      }
      .swiper-pagination {
        position: fixed;
        right:40px;
        left: auto;
        top:606px;
        bottom: auto;
        z-index: 2;
        span {
          background: rgba(221, 113, 22, .35);
        }
        &.pagination0 {
          top:606px;
          right:40px;
          left: auto;
          bottom: auto;
        }
        &.pagination1 {
          left: auto;
          right: 72px;
          bottom: 40%;
        }
        &.pagination2 {
          left: auto;
          right: 72px;
        }
        &.pagination3 {
          left: auto;
          right: 72px;
          top: 14%;
          bottom: auto;
        }
      }
    }
    .swiper-slide {
      position: relative;
      width: 100%;
      height: 100vh!important;
      overflow: hidden;
      .des {
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .line {
          width: 76px;
          height: 2px;
          background: #fff;
          margin-left: 10px;
        }
      }
      .view-more {
        display: block;
        width: 240px;
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #fff;
        background: @themColor;
        margin: 250px auto 0;

        span,i {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .page1 {
      /*background: url("../assets/img/post1.jpg") top center no-repeat;*/
      background-size: cover!important;
      position: relative;
      color: #fff;
      .des {
        text-align: center;
        .des-title{
          font-size: 72px;
        }
      }
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        background: rgba(0,0,0,0.5);
      }
      .main-info {
        width: 580px;
        position: absolute;
        top: 214px;
        left: 50%;
        margin-left: -290px;
        z-index: 2;
        /*margin: 214px auto 0;*/
      }
      .point {
        font-size: 72px;
        margin-bottom: 10px;
        text-align: center;
      }
      .sub {
        text-align: center;
        font-size: @baseFont;
        line-height: 1.8;
        opacity: .8;
      }
      .share-btn {
        position: absolute;
        left: 50%;
        bottom: 10%;
        width: 100%;
        text-align: center;
        transform: translateX(-50%);
      }
      .view-more{
        margin-top:210px;
      }
    }
    .page2 {
      /*background: url("../assets/img/post2.jpg") top center no-repeat;*/
      background-size: cover!important;
      .main-info {
        width: 600px;
        margin:20% 0 0 56px;
        .des {
          .line {
            background: #333;
          }
        }
        .title {
          font-size: 36px;
          margin-top: 20px;
        }
        .big-title {
          font-size: 100px;
          font-weight: bold;
          color: @themColor;
          margin: -10px 0 20px;
          word-wrap: break-word;
        }
        img {
          width: 100%;
        }
        .info {
          font-size: 28px;
          line-height: 1.6;
          max-height:270px;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
          text-overflow:ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp:4;
          color: @themColor;
          margin-top: 50px;
        }
        .view-more {
          margin: 8% 0 0;
        }
      }
    }
    .page3 {
      /*background: url("../assets/img/post3.jpg") top center no-repeat;*/
      background-size: cover!important;
      position: relative;
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        background: rgba(0,0,0,0.5);
        z-index:1;
      }
      .main-info {
        color: #fff;
        /*margin:20% 56px 0;*/
        position: absolute;
        top: 14%;
        margin:0 56px;
        z-index: 2;
        .title {
          margin-top: 6px;
          .lines(3);
        }
        .sub-title {
          margin-top:20px;
          img {
            display: inline-block;
            vertical-align: middle;
            width: 103px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 70px;
            font-weight: bold;
          }
        }
        .feature {
          font-size: 0;
          margin-top:50px;
          white-space: nowrap;
          .items {
            white-space: normal;
            display: inline-table;
            vertical-align: top;
            position: relative;
            width: 320px;
            height: 222px;
            font-size: @baseFont;
            color: #fff;
            box-shadow: 0 0 17px 0 #000;
            border: 1px solid #747374;
            padding-bottom: 40px;
            &.on{
              border: 1px solid transparent;
              box-shadow:none;
              .bg{
                background: transparent;
              }
              .intro{
                display:none
              }
              .view-more{
                display: none;
              }
            }
            .bg {
              box-sizing:content-box;
              padding: 36px 42px 38px;
              height:260px;
              background: rgba(255, 255, 255, .1);
            }
            .iconfont {
              font-size: 80px;
              margin-left: -10px;
            }
            .line {
              display: block;
              width: 2px;
              height: 20px;
              background: #fff;
              margin: 10px 0 10px;
            }
            p.title{
              line-height: 1.6;
              width: 190px;
            }
            .intro{
              padding:30px 28px 0;
              line-height: 1.6;
              color: #ddd;
              display: -webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:3;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 144px;
            }
          }
        }
        .view-more {
          margin: 30px auto 0;
        }
      }
    }
    .page4 {
      background: #fff;
      .main-info {
        margin:20% 0 0 56px;
        overflow: hidden;
        .des {
          .line {
            background: #333;
          }
        }
        .title {
          width: 580px;
          font-size: 36px;
          margin-top: 30px;
        }
        .select-wrapper {
          margin:30px 0;
          .select-box {
            display: inline-table;
            position: relative;
            width: 206px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            border: 1px solid #333;
            margin-right: 10px;
            span {
              position: relative;
              left: -14px;
            }
            .iconfont {
              position: absolute;
              top: 2px;
              right: 16px;
              font-size: @baseFont;
              color: #999;
            }
          }
        }
        .img-wrapper {
          width: 646px;
          font-size: 0;
          display: flex;
          justify-content: space-between;
          flex-wrap:wrap;
          .img-box {
            position: relative;
            width: 312px;
            height: 370px;
            overflow: hidden;
            margin-bottom: 30px;
            /*img{*/
              /*width: 100%;*/
              /*display: inline-block;*/
              /*vertical-align: middle;*/
            /*}*/
            .img {
              width: 100%;
              height: 100%;
              background-size: cover!important;
            }
            .bg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(221, 113, 22, .76);
            }
            .text {
              position: absolute;
              top: 30px;
              left: 30px;
              font-size: 32px;
              color: #fff;
              .country {
                font-size: 26px;
              }
            }
          }
        }
      }
    }
    .page5 {
      background: #000 url("../assets/img/post5.jpg") top center no-repeat;
      background-size: cover;
      text-align: center;
      color: #fff;
      .footer{
        position: absolute;
      }
      p.slogan {
        width:300px;
        font-size:30px;
        line-height:50px;
        color: #ffffff;
        margin:20% auto 0;
        .lines(3);
        text-align: center;
      }
      .icon-wrap{
        width: 700px;
        margin:12% auto 0;
        font-size: 0;
        text-align: center;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
      }
      .icon_main{
        width: 220px;
        vertical-align: top;
        font-size: 36px;
        color: #fff;
        margin-bottom: 50px;
        p{
          margin-top: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        i.icon{
          display: block;
          margin: 0 auto;
          width: 38px;
          height: 36px;
          background:url("../assets/img/home_icon.png") no-repeat;
          background-size: 270px auto;
          &.icon0{
            background-position: 0 0;
          }
          &.icon1{
            background-position: -46px 0;
          }
          &.icon2{
            background-position: -94px 0;
          }
          &.icon3{
            background-position: -140px 0;
          }
          &.icon4{
            background-position: -182px 0;
          }
          &.icon5{
            background-position: -232px 0;
          }
        }
      }
    }
  }
</style>
