<template>
  <div class="forget login-wrapper">
    <div class="inner-block">
      <user-title></user-title>
      <div class="form-item">
        <div class="sub">{{ $t('lang.user.forget.findpassword') }}</div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-wode"></i>
          </div>
          <input :placeholder="$t('lang.placeholder.email')" v-model="email" type="text">
        </div>
        <get-code @on-change="onInputChange" :step="codeStep" @on-send="sendCode"></get-code>
      </div>
      <div class="btn theme" @click="reset">{{ $t('lang.user.forget.setPass') }}</div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import getCode from '../../components/user/getCode'
  import userTitle from '../../components/user/userTitle'
  import {isEmail, toast} from '../../assets/js/tool'

  export default {
    components: {
      getCode, userTitle
    },
    data() {
      return {
        email: '',
        code: '',
        codeStep: 1
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    methods: {
      ...mapActions(['findpwd', 'sendCodeInForget']),
      onInputChange(val) {
        this.code = val;
      },
      reset() {
        if (!this.email) {
          toast(this.$t('lang.placeholder.email'));
          return false;
        }
        if (!isEmail(this.email)) {
          toast(this.$t('lang.placeholder.emailError'));
          return false;
        }
        if (this.code.length !== 6) {
          toast(this.$t('lang.common.email6'));
          return false;
        }
        this.findpwd({email: this.email, code: this.code}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.$router.push('/user/reset?t=' + res.data);
        });
      },
      sendCode() {
        if (!this.email) {
          toast(this.$t('lang.placeholder.email'));
          return false;
        }
        if (!isEmail(this.email)) {
          toast(this.$t('lang.placeholder.emailError'));
          return false;
        }
        this.codeStep = 1;
        this.sendCodeInForget({email: this.email}).then(res => {
          if (res.status === 'error') {
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
  .forget {
    .btn {
      margin-top: 120px;
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
