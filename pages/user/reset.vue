<template>
  <div class="reset login-wrapper">
    <div class="inner-block">
      <user-title></user-title>
      <div class="form-item">
        <div class="sub">{{ $t('lang.user.reset.setPass') }}</div>
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
      </div>
      <div class="btn theme" @click="submit">{{ $t('lang.btn.submit') }}</div>
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
        token: this.$route.query.t
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    middleware: 'reset',
    methods: {
      ...mapActions(['setPassword']),
      submit() {
        if (this.password.length < 6) {
          toast(this.$t('lang.common.pass6'));
          return false;
        }
        if (this.rePassword !== this.password) {
          toast(this.$t('lang.common.passMsgerr'));
          return false;
        }
        this.setPassword({
          password: this.password,
          token: this.token
        }).then(res => {
          if (res.status === 'error') {
            this.$router.push('/user/forget');
            return false;
          }
          toast(this.$t('lang.common.passwordSuccess'));
          setTimeout(()=>this.$router.push('/user/login'),1000)
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
