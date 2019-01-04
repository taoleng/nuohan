<template>
  <div class="header">
    <nuxt-link to="/">
      <div class="logo">
        <img src="~/assets/img/logo.png" alt="logo">
      </div>
    </nuxt-link>
    <div class="return" v-if="!(/^index/.test($route.name))">
      <span></span>
      <i class="iconfont icon-chehuisekuai1" @click="goBack"></i>
    </div>
    <div class="menu-btn theme-color" @click.stop="toggleMenu">
      <span class="line1"></span>
      <span class="line2"></span>
      <span class="line3"></span>
    </div>
    <transition name="fade">
      <div class="menu_main" v-if="menuShow">
        <div class="close iconfont icon-quxiao" @click.stop="toggleMenu"></div>
        <div v-if="!(hasLogin && token)" class="login">
          <nuxt-link to="/user/register"><span>{{ $t('lang.header.register') }}</span></nuxt-link>
          <nuxt-link to="/user/login"><span>{{ $t('lang.header.login') }}</span></nuxt-link>{{ $t('lang.header.out') }}ink>
        </div>
        <div v-else class="login-user">
          <img :src="userInfo.avatar" :alt="userInfo.nickname">
          <p>{{ userInfo.nickname }}</p>
        </div>
        <ul class="menu">
          <li :class="{'on':/^index/.test($route.name)}"><a href="/"><span>{{ $t('lang.header.index') }}</span></a></li>
          <li :class="{'on':/^news/.test($route.name)}"><a href="/news"><span>{{ $t('lang.header.news') }}</span></a></li>
          <li :class="{'on':/^book/.test($route.name)}"><a href="/book"><span>{{ $t('lang.header.reserve') }}</span></a></li>
          <li :class="{'on':/^contact/.test($route.name)}"><a href="/contact"><span>{{ $t('lang.header.contact') }}</span></a></li>
          <li :class="{'on':/^clients/.test($route.name)}"><a href="/clients"><span>{{ $t('lang.header.clients') }}</span></a></li>
          <li :class="{'on':/^user/.test($route.name)}"><a href="/user"><span>{{ $t('lang.header.user') }}</span></a></li>
          <!--<li :class="{'on':/^index/.test($route.name)}"><nuxt-link to="/"><span>{{ $t('lang.header.index') }}</span></nuxt-link></li>
          <li :class="{'on':/^news/.test($route.name)}"><nuxt-link to="/news"><span>{{ $t('lang.header.news') }}</span></nuxt-link></li>
          <li :class="{'on':/^book/.test($route.name)}"><nuxt-link to="/book"><span>{{ $t('lang.header.reserve') }}</span></nuxt-link></li>
          <li :class="{'on':/^contact/.test($route.name)}"><nuxt-link to="/contact"><span>{{ $t('lang.header.contact') }}</span></nuxt-link></li>
          <li :class="{'on':/^clients/.test($route.name)}"><nuxt-link to="/clients"><span>{{ $t('lang.header.clients') }}</span></nuxt-link></li>
          <li :class="{'on':/^user/.test($route.name)}"><nuxt-link to="/user"><span>{{ $t('lang.header.user') }}</span></nuxt-link></li>-->
        </ul>
        <div class="changec">
          <a
            :style="{
              color: $i18n.locale === 'cn' ? '#dd7116' : ''
            }"
            @click="lang('cn')"
            href="javascript:;"
          >中文</a>
          &nbsp;/&nbsp;
          <a
            :style="{
              color: $i18n.locale === 'en' ? '#dd7116' : ''
            }"
            @click="lang('en')"
            href="javascript:;"
          >English</a>
        </div>
        <a v-if="hasLogin && token" @click="logoutHandler" class="unlogin" href="javascript:;" ><span>{{ $t('lang.header.out') }}</span></a>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {empty_obj} from '../../assets/js/tool'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['menuShow', 'themeColor', 'hasLogin', 'userInfo','token'])
    },
    watch:{
      '$route'(to){
        window.scrollTo(0,0);
        if(this.menuShow){
          this.IS_MENU_SHOW(false);
        }
      }
    },
    mounted() {
      if(window){
        window.onscroll = ()=>{
          if(this.menuShow){
            this.IS_MENU_SHOW(false);
          }
        }
      }
    },
    middleware:'loginJudge',
    updated(){
      window.scroll(0, 0);
    },
    methods: {
      ...mapMutations(['SET_LANG', 'IS_MENU_SHOW', 'SET_LOGIN_STATE', 'REMOVE_TOKEN']),
      ...mapActions(['logout','getUserInfo']),
      toggleMenu() {
        this.IS_MENU_SHOW(!this.menuShow);
      },
      goBack() {
        this.$router.go(-1);
      },
      logoutHandler() {
        this.IS_MENU_SHOW(false);
        this.logout().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.SET_LOGIN_STATE(false);
          this.REMOVE_TOKEN();
          this.$router.push('/user/login');
        })
      },
      lang(str) {
        this.$i18n.locale = str;
        this.SET_LANG(str);
        location.reload(true);
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .logo {
      display: inline-block;
      vertical-align: middle;
      width: 160px;
      height: 120px;
      text-align: center;
      img {
        width: 90px;
        margin-top: 35px;
      }
    }
    &.common-head{
      position: absolute;
    }
    .close{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      font-size: 60px;
      font-weight: bold;
      color: #dd7116;
    }
    .return {
      position: relative;
      left: -20px;
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      span {
        display: inline-block;
        vertical-align: middle;
        width: 2px;
        height: 26px;
        background: @themColor;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        color: @themColor;
        font-size: 50px;
        margin-left: 30px;
      }
    }
    .menu-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;//38
      padding: 40px;
      &.theme-color {
        span {
          background: @themColor;
        }
      }
      span {
        display: block;
        float: right;
        height: 5px;//4px
        background: #fff;
        margin-bottom: 10px;
        transition: .5s;
        &.line1 {
          width: 60*1px;
        }
        &.line2 {
          width: 60*.53px;
        }
        &.line3 {
          width: 60*.82px;
          margin-bottom: 0;
        }
      }
    }
    .changec{
      font-size: 26px;
      color: #cccccc;
      text-align: center;
      margin-top: 20px;
      height: 100px;
      line-height: 100px;
      a{
        color: #cccccc;
      }
    }
    .menu_main{
      position: fixed;
      top: 0;
      right: 0;
      width: 500px;
      height: 100vh;
      background: url("../../assets/img/header_bg.jpg") #000 top center no-repeat;
      background-size:100% 100%;
    }
    .unlogin{
      display: block;
      width: 200px;
      height: 75px;
      line-height: 75px;
      font-size: 28px;
      border-radius:6px;
      border: 1px solid #fff;
      color: #fff;
      text-align:center;
      margin:40px auto;
    }
    .login{
      width:100%;
      font-size: 0;
      text-align: center;
      margin-top:140px;
      height: 116px;
      a{
        display: inline-block;
        width: 175px;
        height: 75px;
        line-height: 75px;
        font-size: 28px;
        border-radius:6px;
        margin: 0 20px;
        &:nth-child(1){
          color: #fff;
          border: 1px solid #fff;
        }
        &:nth-child(2){
          background: #dd7116;
          color: #fff;
        }
      }
    }
    .login-user{
      font-size: 0;
      text-align: center;
      margin-top:140px;
      padding: 0 20px;
      img{
        width: 116px;
        height: 116px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #fff;
      }
      p{
        display: inline-block;
        vertical-align: middle;
        font-size: 28px;
        color: #ffffff;
        margin-left: 30px;
        width:160px;
        overflow: hidden;
        max-height:116px;
        line-height: 58px;
        text-align: left;
      }
    }
    .menu {
      width: 500px;
      margin-top:20px;
      .open{
        a{
          display:block;
          width: 100%;
          height: 66px;
          line-height: 66px;
          color: #999999;
          font-size: 28px;
        }
      }
      li {
        line-height:100px;
        font-size: 36px;
        text-align: center;
        &:last-child {
          border: none;
        }
        &.on{
          a{
            color: #dd7116;
          }
        }
        a {
          display: inline-block;
          width: 100%;
          color: #cccccc;
          i {
            position: relative;
            top: 4px;
            margin-left: 10px;
          }
        }
        span.link{
          display: inline-block;
          width: 100%;
          color: #cccccc;
        }
      }
    }
  }
</style>
