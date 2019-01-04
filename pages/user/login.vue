<template>
  <div class="login login-wrapper">
    <div class="inner-block">
      <user-title></user-title>
      <div class="form-item" v-if="type === 'email'">
        <div class="sub">{{ $t('lang.user.login.login') }}</div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-wode"></i>
          </div>
          <input v-model="email" :placeholder="$t('lang.placeholder.importemail')" type="text">
        </div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-mima"></i>
          </div>
          <input v-model="password" :placeholder="$t('lang.placeholder.password')" type="password">
        </div>
        <div class="link">
          <span @click="type = 'mobile'">{{ $t('lang.user.login.phonelogin') }}</span>
          <nuxt-link class="forget-btn" to="/user/forget">{{ $t('lang.user.login.forgetpass') }}</nuxt-link>
        </div>
      </div>
      <div class="form-item" v-else>
        <div class="sub">{{ $t('lang.user.login.yanzhenglogin') }}</div>
        <div class="form-input">
          <div class="ic">
            <span class="area-code">0086</span>
          </div>
          <input v-model="mobile" :placeholder="$t('lang.placeholder.phone')" class="mobile" type="text">
        </div>
        <get-code v-model="code" :step="codeStep" @on-send="sendCode" @on-change="onCodeChange"></get-code>
        <div class="link">
          <span @click="type = 'email'">{{ $t('lang.user.login.passwordlogin') }}</span>
          <nuxt-link class="forget-btn" to="/user/forget">{{ $t('lang.user.login.forgetpass') }}</nuxt-link>
        </div>
      </div>
      <div class="btn theme" @click="login">{{ $t('lang.btn.login') }}</div>
      <nuxt-link to="/user/register" class="btn">{{ $t('lang.btn.register') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import getCode from '../../components/user/getCode'
  import userTitle from '../../components/user/userTitle'
  import {isPhone, isEmail, toast} from '../../assets/js/tool'

  export default {
    components: {
      getCode, userTitle
    },
    data() {
      return {
        type: 'email',
        email: '',
        password: '',
        mobile: '',
        code: '',
        codeStep: 1,
        fromPath: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fromPath = from.fullPath;
      })
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    methods: {
      ...mapMutations(['SET_TOKEN', 'SET_LOGIN_STATE','SET_USER_INFO']),
      ...mapActions(['toLogin', 'sendLoginCode','getUserInfo']),
      onCodeChange(val) {
        this.code = val;
      },
      login() {
        let params = {};
        if (this.type === 'mobile') {
          if (!this.mobile) {
            toast(this.$t('lang.placeholder.phone'));
            return false;
          }
          if (!isPhone(this.mobile)) {
            toast(this.$t('lang.placeholder.iphoneError'));
            return false;
          }
          if (this.code.length !== 6) {
            toast(this.$t('lang.common.email6'));
            return false;
          }
          params = {
            type: 2,
            mobile: this.mobile,
            code: this.code
          }
        } else {
          if (!this.email) {
            toast(this.$t('lang.placeholder.importemail'));
            return false;
          }
          if (!this.password) {
            toast(this.$t('lang.placeholder.importpass'));
            return false;
          }
          params = {
            type: 1,
            username: this.email,
            password: this.password
          }
        }
        this.toLogin(params).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.SET_LOGIN_STATE(true);
          this.SET_TOKEN(res.data);

          this.getUserInfo().then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            let userInfo = res.data;
            this.SET_USER_INFO(userInfo);

            if (!this.fromPath) {
              this.$router.push('/user');
            } else {
              if (this.fromPath.indexOf('/user') >= 0) {
                this.$router.push('/user');
              } else {
                this.$router.push(this.fromPath);
              }
            }
          })
        });
      },
      sendCode() {
        if (!this.mobile) {
          toast(this.$t('lang.placeholder.phone'));
          return false;
        }
        if (!isPhone(this.mobile)) {
          toast(this.$t('lang.placeholder.iphoneError'));
          return false;
        }
        this.sendLoginCode({mobile: this.mobile}).then(res => {
          if (res.status === 'error') {
            this.codeStep = 1;
            return false;
          }
          toast(res.msg);
          this.codeStep = 2;
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .login {
    .forget-btn {
      float: right;
      color: #fff;
    }
  }
  .form-input{
    width: 100%;
    display: flex;
    height: 100px;
    background: rgba(13, 13, 13, 0.4);
    margin-bottom: 20px;
    border-radius:10px;
    .ic{
      width: 120px;
      text-align: center;
      height: 100px;
      line-height: 100px;
      i{
        font-size:50px;
      }
    }
    input{
      flex: 1;
      height: 100px;
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
      font-size:30px;
    }
  }
</style>
