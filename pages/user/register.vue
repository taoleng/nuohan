<template>
  <div class="register login-wrapper">
    <div class="inner-block">
      <user-title></user-title>
      <div class="form-item">
        <div v-if="type === '1'" class="sub">{{ $t('lang.user.register.user') }}</div>
        <div v-else class="sub">{{ $t('lang.user.register.qiuser') }}</div>
        <div class="form-input">
          <div class="ic">
            <i class="iconfont icon-wode"></i>
          </div>
          <input :placeholder="$t('lang.placeholder.email')" v-model="email" type="text">
        </div>
        <div class="link">
          {{ $t('lang.common.agreement') }}
          <a v-for="(item,index) in title" :key="index" :href="'../protocol?type='+(index+1)">《{{ item.title }}》</a>
        </div>
      </div>
      <div class="btn theme" @click="submit">{{ $t('lang.btn.register') }}</div>
      <!--<div v-if="type === '1'" class="btn" @click="type = '2'">企业邮箱注册</div>-->
      <!--<div v-else class="btn" @click="type = '1'">个人用户注册</div>-->
      <nuxt-link to="/user/login">{{ $t('lang.user.register.usered') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import userTitle from '../../components/user/userTitle'
  import {isEmail, toast, messageBox} from '../../assets/js/tool'

  export default {
    components: {
      userTitle
    },
    data() {
      return {
        // 1个人注册，2企业注册
        type: '1',
        email: '',
        title:[]
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    created(){
      this.register_protocols().then(res => {
        if(res.status === 'error'){
          return false
        }
        this.title = res.data;
      })
    },
    methods: {
      ...mapActions(['toRegister','register_protocols']),
      submit() {
        if (!this.email) {
          toast(this.$t('lang.placeholder.email'));
          return false;
        }
        if (!isEmail(this.email)) {
          toast(this.$t('lang.placeholder.emailError'));
          return false;
        }
        this.toRegister({email: this.email, type: this.type}).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.email = '';
          messageBox(this.$t('lang.user.register.registerurl'));
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .register {
    a {
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
