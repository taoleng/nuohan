<template>
  <div class="reset login-wrapper">
    <div class="inner-block">
      <user-title></user-title>
      <div class="form-item">
        <div class="sub">{{ $t('lang.user.pw.register') }}</div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-mima"></i>
          </div>
          <input :placeholder="$t('lang.placeholder.importpass')" v-model="password" type="password">
        </div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-mima"></i>
          </div>
          <input :placeholder="$t('lang.placeholder.twoimportpass')" v-model="rePassword" type="password">
        </div>
        <!--mt-field placeholder="请输入您的账号密码" v-model="password" type="password">
          <i class="iconfont icon-mima"></i>
        </mt-field>
        <mt-field placeholder="请确认您的账号密码" v-model="rePassword" type="password">
          <i class="iconfont icon-mima"></i>
        </mt-field-->
      </div>
      <div class="btn theme" @click="submit">{{ $t('lang.btn.promptlyRegister') }}</div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import userTitle from '../../components/user/userTitle'
  import {toast} from '../../assets/js/tool'

  export default {
    components: {
      userTitle
    },
    data() {
      return {
        password: '',
        rePassword: '',
        id: '',
        errorText: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    mounted() {
      this.checkId();
    },
    methods: {
      ...mapActions(['checkRegId', 'completeRegister']),
      checkId() {
        this.id = this.$route.query.id;
        this.checkRegId({id: this.id}).then(res => {
          if (res.status === 'error') {
            this.errorText = res.msg;
          }
        })
      },
      submit() {
        if (this.errorText) {
          toast(this.errorText);
          return false;
        }
        if (this.password.length < 6) {
          toast(this.$t('lang.common.pass6'));
          return false;
        }
        if (this.rePassword !== this.password) {
          toast(this.$t('lang.common.passTwo'));
          return false;
        }
        this.completeRegister({id: this.id, password: this.password}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          toast(res.msg);
          this.$router.push('/user/complete');
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .reset {
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
